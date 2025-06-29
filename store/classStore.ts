/**
 * Class Store using Zustand
 * 
 * This store manages global class and feed state including:
 * - Current active class context
 * - Class membership management
 * - Feed posts and interactions
 * - Real-time updates and notifications
 */

import { create } from 'zustand';
import { getUserClasses, joinClass, leaveClass } from '../lib/classService';
import type { Class, ClassMember, Comment, Post } from '../lib/supabase';
import { supabase } from '../lib/supabase';

// Extended post interface with user information
export interface PostWithUser extends Post {
  user?: {
    id: string;
    username?: string;
    avatar_url?: string;
  };
  comments_count?: number;
  has_ai_feedback?: boolean;
  user_has_viewed?: boolean;
}

// Extended comment interface with user information
export interface CommentWithUser extends Comment {
  user?: {
    id: string;
    username?: string;
    avatar_url?: string;
  };
}

// Class state interface
export interface ClassState {
  // Current state
  currentClass: (Class & { membership: ClassMember }) | null;
  userClasses: Array<Class & { membership: ClassMember }>;
  classPosts: PostWithUser[];
  postComments: { [postId: string]: CommentWithUser[] };
  isLoading: boolean;
  isLoadingPosts: boolean;
  isLoadingComments: { [postId: string]: boolean };
  
  // Feed state
  feedRefreshKey: number;
  lastPostUpdate: Date | null;
  
  // Actions
  loadUserClasses: (userId: string) => Promise<void>;
  setCurrentClass: (classData: (Class & { membership: ClassMember }) | null) => void;
  joinClassWithCode: (joinCode: string, userId: string) => Promise<{ success: boolean; error?: string; isExistingMember?: boolean }>;
  leaveCurrentClass: (userId: string) => Promise<{ success: boolean; error?: string }>;
  
  // Feed actions
  loadClassPosts: (classId: string, userId: string) => Promise<void>;
  loadPostComments: (postId: string) => Promise<void>;
  refreshFeed: () => void;
  markPostAsViewed: (postId: string, userId: string) => Promise<void>;
  createPost: (postData: Partial<Post>) => Promise<{ success: boolean; postId?: string; error?: string }>;
  createComment: (postId: string, userId: string, content: string) => Promise<{ success: boolean; error?: string }>;
  
  // Internal state setters
  setLoading: (loading: boolean) => void;
  setLoadingPosts: (loading: boolean) => void;
  setLoadingComments: (postId: string, loading: boolean) => void;
  clearClassData: () => void;
}

export const useClassStore = create<ClassState>((set, get) => ({
  // Initial state
  currentClass: null,
  userClasses: [],
  classPosts: [],
  postComments: {},
  isLoading: false,
  isLoadingPosts: false,
  isLoadingComments: {},
  feedRefreshKey: 0,
  lastPostUpdate: null,

  // Load user's class memberships
  loadUserClasses: async (userId: string) => {
    console.log('📚 Class Store - Loading user classes:', userId);
    console.log('🔧 DEBUG - loadUserClasses START:', {
      currentUserClassesCount: get().userClasses.length,
      currentClassIds: get().userClasses.map(c => c.id),
      timestamp: Date.now()
    });
    set({ isLoading: true });

    try {
      const classes = await getUserClasses(userId);
      console.log('✅ Class Store - Loaded', classes.length, 'classes');
      
      set({ 
        userClasses: classes,
        isLoading: false 
      });

      console.log('🔧 DEBUG - loadUserClasses END:', {
        newUserClassesCount: classes.length,
        newClassIds: classes.map(c => c.id),
        newClassNames: classes.map(c => c.name),
        timestamp: Date.now()
      });

      // Don't auto-select any class - let user choose from ClassListScreen

    } catch (error) {
      console.error('❌ Class Store - Error loading user classes:', error);
      set({ isLoading: false });
    }
  },

  // Set current active class
  setCurrentClass: (classData) => {
    console.log('🎯 Class Store - Setting current class:', classData?.name || 'None');
    set({ 
      currentClass: classData,
      classPosts: [], // Clear posts when switching classes
      postComments: {},
      feedRefreshKey: get().feedRefreshKey + 1
    });
  },

  // Join a class with join code
  joinClassWithCode: async (joinCode: string, userId: string) => {
    console.log('🚀 Class Store - Joining class with code:', joinCode);
    set({ isLoading: true });

    try {
      const result = await joinClass(joinCode, userId);
      
      if (result.success && result.class && result.membership) {
        console.log('🎉 Class Store - Successfully joined class:', result.class.name);
        
        // Check if user is already a member of this class
        const { userClasses } = get();
        const existingClass = userClasses.find(c => c.id === result.class!.id);
        
        if (existingClass || result.isExistingMember) {
          console.log('ℹ️ Class Store - User already member of class, not adding duplicate');
          set({ isLoading: false });
          return { 
            success: true, 
            isExistingMember: result.isExistingMember
          };
        }
        
        // Add to user classes (only if not already a member)
        const newClass = { ...result.class, membership: result.membership };
        const updatedClasses = [...userClasses, newClass];
        
        set({ 
          userClasses: updatedClasses,
          // Don't auto-select - let user choose from class list
          isLoading: false 
        });

        console.log('🔧 DEBUG - State after joinClassWithCode:', { 
          userClassesCount: updatedClasses.length, 
          classIds: updatedClasses.map(c => c.id),
          classNames: updatedClasses.map(c => c.name),
          timestamp: Date.now(),
          newClassAdded: result.class.name
        });

        return { success: true, isExistingMember: false };
      } else {
        console.log('❌ Class Store - Failed to join class:', result.error);
        set({ isLoading: false });
        return { success: false, error: result.error, isExistingMember: false };
      }

    } catch (error) {
      console.error('❌ Class Store - Unexpected error joining class:', error);
      set({ isLoading: false });
      return { 
        success: false, 
        error: 'An unexpected error occurred while joining the class',
        isExistingMember: false
      };
    }
  },

  // Leave current class
  leaveCurrentClass: async (userId: string) => {
    const { currentClass } = get();
    if (!currentClass) {
      return { success: false, error: 'No class selected' };
    }

    console.log('👋 Class Store - Leaving class:', currentClass.name);
    set({ isLoading: true });

    try {
      const result = await leaveClass(currentClass.id, userId);
      
      if (result.success) {
        console.log('✅ Class Store - Successfully left class');
        
        // Remove from user classes
        const { userClasses } = get();
        const updatedClasses = userClasses.filter(c => c.id !== currentClass.id);
        
        set({ 
          userClasses: updatedClasses,
          currentClass: updatedClasses.length > 0 ? updatedClasses[0] : null,
          classPosts: [],
          postComments: {},
          isLoading: false 
        });

        return { success: true };
      } else {
        console.log('❌ Class Store - Failed to leave class:', result.error);
        set({ isLoading: false });
        return { success: false, error: result.error };
      }

    } catch (error) {
      console.error('❌ Class Store - Unexpected error leaving class:', error);
      set({ isLoading: false });
      return { 
        success: false, 
        error: 'An unexpected error occurred while leaving the class' 
      };
    }
  },

  // Load posts for current class
  loadClassPosts: async (classId: string, userId: string) => {
    console.log('📰 Class Store - Loading posts for class:', classId);
    set({ isLoadingPosts: true });

    try {
      // Fetch posts first (without user join to avoid foreign key error)
      // Order by created_at ascending so newest posts appear at bottom (chat-style)
      const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .eq('class_id', classId)
        .eq('is_expired', false)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('❌ Class Store - Error loading posts:', error);
        set({ isLoadingPosts: false });
        return;
      }

      // Get unique user IDs from posts
      const userIds = [...new Set(posts?.map(post => post.user_id) || [])];
      
      // Fetch user data separately
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('id, username, avatar_url')
        .in('id', userIds);

      if (usersError) {
        console.error('❌ Class Store - Error loading users:', usersError);
      }

      // Create user lookup map
      const userMap = new Map(users?.map(user => [user.id, user]) || []);

      // Check if user has viewed each post and get additional metadata
      const postsWithMetadata = await Promise.all(
        (posts || []).map(async (post) => {
          // Check if user has viewed this post
          const { data: viewData } = await supabase
            .from('post_views')
            .select('id')
            .eq('post_id', post.id)
            .eq('user_id', userId)
            .single();

          // Get comment count
          const { count: commentsCount } = await supabase
            .from('comments')
            .select('id', { count: 'exact' })
            .eq('post_id', post.id);

          // Check if post has AI feedback
          const { data: aiFeedback } = await supabase
            .from('ai_feedback')
            .select('id')
            .eq('post_id', post.id)
            .single();

          return {
            ...post,
            user: userMap.get(post.user_id) || null,
            comments_count: commentsCount || 0,
            has_ai_feedback: !!aiFeedback,
            user_has_viewed: !!viewData
          } as PostWithUser;
        })
      );

      console.log('✅ Class Store - Loaded', postsWithMetadata.length, 'posts');
      console.log('🔧 DEBUG - Posts loaded successfully:', {
        classId,
        postsCount: postsWithMetadata.length,
        postTitles: postsWithMetadata.map(p => p.image_url?.substring(0, 50) + '...'),
        timestamp: Date.now()
      });
      set({ 
        classPosts: postsWithMetadata,
        isLoadingPosts: false,
        lastPostUpdate: new Date()
      });

    } catch (error) {
      console.error('❌ Class Store - Unexpected error loading posts:', error);
      set({ isLoadingPosts: false });
    }
  },

  // Load comments for a specific post
  loadPostComments: async (postId: string) => {
    console.log('💬 Class Store - Loading comments for post:', postId);
    set({ isLoadingComments: { ...get().isLoadingComments, [postId]: true } });

    try {
      // Fetch comments first (without user join to avoid foreign key error)
      const { data: comments, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('❌ Class Store - Error loading comments:', error);
        set({ 
          isLoadingComments: { 
            ...get().isLoadingComments, 
            [postId]: false 
          } 
        });
        return;
      }

      // Get unique user IDs from comments
      const userIds = [...new Set(comments?.map(comment => comment.user_id) || [])];
      
      // Fetch user data separately
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('id, username, avatar_url')
        .in('id', userIds);

      if (usersError) {
        console.error('❌ Class Store - Error loading comment users:', usersError);
      }

      // Create user lookup map
      const userMap = new Map(users?.map(user => [user.id, user]) || []);

      const commentsWithUsers = (comments || []).map(comment => ({
        ...comment,
        user: userMap.get(comment.user_id) || null
      })) as CommentWithUser[];

      console.log('✅ Class Store - Loaded', commentsWithUsers.length, 'comments');
      set({ 
        postComments: { 
          ...get().postComments, 
          [postId]: commentsWithUsers 
        },
        isLoadingComments: { 
          ...get().isLoadingComments, 
          [postId]: false 
        }
      });

    } catch (error) {
      console.error('❌ Class Store - Unexpected error loading comments:', error);
      set({ 
        isLoadingComments: { 
          ...get().isLoadingComments, 
          [postId]: false 
        } 
      });
    }
  },

  // Refresh feed
  refreshFeed: () => {
    console.log('🔄 Class Store - Refreshing feed');
    set({ feedRefreshKey: get().feedRefreshKey + 1 });
  },

  // Mark post as viewed
  markPostAsViewed: async (postId: string, userId: string) => {
    console.log('👁️ Class Store - Marking post as viewed:', postId);

    try {
      // Record the view
      await supabase
        .from('post_views')
        .insert({
          post_id: postId,
          user_id: userId
        });

      // Increment view count using the database function
      await supabase.rpc('increment_post_view', {
        post_id: postId,
        viewer_id: userId
      });

      // Update local state
      const { classPosts } = get();
      const updatedPosts = classPosts.map(post => 
        post.id === postId 
          ? { ...post, user_has_viewed: true, view_count: post.view_count + 1 }
          : post
      );

      set({ classPosts: updatedPosts });

    } catch (error) {
      // Ignore errors (user might have already viewed this post)
      console.log('ℹ️ Class Store - Post view not recorded (already viewed?)');
    }
  },

  // Create a new post in the current class
  createPost: async (postData: Partial<Post>) => {
    console.log('📝 Class Store - Creating new post');
    const { currentClass } = get();
    
    if (!currentClass) {
      console.error('❌ Class Store - No current class selected');
      return { success: false, error: 'No class selected' };
    }

    try {
      const { data: newPost, error } = await supabase
        .from('posts')
        .insert({
          ...postData,
          class_id: currentClass.id,
          view_count: 0,
          is_expired: false
        })
        .select()
        .single();

      if (error) {
        console.error('❌ Class Store - Error creating post:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ Class Store - Post created successfully:', newPost.id);
      
      // Refresh the feed to include the new post
      await get().loadClassPosts(currentClass.id, postData.user_id!);
      
      return { success: true, postId: newPost.id };
    } catch (error) {
      console.error('❌ Class Store - Unexpected error creating post:', error);
      return { success: false, error: 'Failed to create post' };
    }
  },

  // Create a new comment on a post
  createComment: async (postId: string, userId: string, content: string) => {
    console.log('💬 Class Store - Creating comment on post:', postId);
    
    try {
      const { data: newComment, error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          user_id: userId,
          content: content.trim(),
        })
        .select()
        .single();

      if (error) {
        console.error('❌ Class Store - Error creating comment:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ Class Store - Comment created successfully:', newComment.id);
      
      // Update local post to increment comment count
      const { classPosts } = get();
      const updatedPosts = classPosts.map(post => 
        post.id === postId 
          ? { ...post, comments_count: (post.comments_count || 0) + 1 }
          : post
      );
      set({ classPosts: updatedPosts });
      
      // Reload comments for this post
      await get().loadPostComments(postId);
      
      return { success: true };
    } catch (error) {
      console.error('❌ Class Store - Unexpected error creating comment:', error);
      return { success: false, error: 'Failed to create comment' };
    }
  },

  // State setters
  setLoading: (isLoading) => set({ isLoading }),
  setLoadingPosts: (isLoadingPosts) => set({ isLoadingPosts }),
  setLoadingComments: (postId, loading) => set({ 
    isLoadingComments: { 
      ...get().isLoadingComments, 
      [postId]: loading 
    } 
  }),

  // Clear all class data (for logout)
  clearClassData: () => {
    console.log('🧹 Class Store - Clearing all class data');
    set({
      currentClass: null,
      userClasses: [],
      classPosts: [],
      postComments: {},
      isLoading: false,
      isLoadingPosts: false,
      isLoadingComments: {},
      feedRefreshKey: 0,
      lastPostUpdate: null
    });
  }
})); 