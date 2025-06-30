#!/usr/bin/env node

/**
 * Cleanup User Data from June 29th
 * 
 * This script deletes all data created on June 29th, 2025 by user 7e20cbba-83c2-4297-90a6-0ac94aabb814
 * from all relevant tables and storage buckets.
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL_LOCAL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY_LOCAL;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables');
  console.error('   - EXPO_PUBLIC_SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function cleanupUserDataJune29() {
  const targetUserId = '7e20cbba-83c2-4297-90a6-0ac94aabb814';
  const targetDate = '2025-06-29'; // June 29th, 2025
  
  console.log('🧹 Cleanup User Data from June 29th');
  console.log('====================================');
  console.log(`👤 Target User: ${targetUserId}`);
  console.log(`📅 Target Date: ${targetDate}`);
  console.log('');

  try {
    // Track what we delete for reporting
    const deletionSummary = {
      solo_messages: 0,
      solo_chats: 0,
      ai_feedback: 0,
      comments: 0,
      post_views: 0,
      posts: 0,
      photos: 0,
      class_members: 0,
      storage_images: 0,
      storage_solo_images: 0
    };

    console.log('🔍 Starting cleanup process...\n');

    // 1. Delete solo AI messages from June 29th
    console.log('📝 Checking solo AI messages...');
    const { data: soloMessages, error: soloMessagesError } = await supabase
      .from('solo_ai_messages')
      .select('id, chat_id, content, created_at')
      .gte('created_at', `${targetDate}T00:00:00.000Z`)
      .lt('created_at', `${targetDate}T23:59:59.999Z`)
      .order('created_at', { ascending: true });

    if (soloMessagesError) {
      console.error('❌ Error fetching solo messages:', soloMessagesError);
    } else if (soloMessages && soloMessages.length > 0) {
      // Check which messages belong to our user's chats
      const { data: userChats } = await supabase
        .from('solo_ai_chats')
        .select('id')
        .eq('user_id', targetUserId);

      const userChatIds = userChats?.map(chat => chat.id) || [];
      const messagesToDelete = soloMessages.filter(msg => userChatIds.includes(msg.chat_id));

      if (messagesToDelete.length > 0) {
        console.log(`   Found ${messagesToDelete.length} messages to delete`);
        messagesToDelete.forEach((msg, idx) => {
          const preview = msg.content.substring(0, 50) + (msg.content.length > 50 ? '...' : '');
          console.log(`   ${idx + 1}. ${msg.created_at} | "${preview}"`);
        });

        const { error: deleteMessagesError } = await supabase
          .from('solo_ai_messages')
          .delete()
          .in('id', messagesToDelete.map(m => m.id));

        if (deleteMessagesError) {
          console.error('❌ Error deleting messages:', deleteMessagesError);
        } else {
          deletionSummary.solo_messages = messagesToDelete.length;
          console.log(`   ✅ Deleted ${messagesToDelete.length} solo AI messages\n`);
        }
      } else {
        console.log('   ✅ No solo AI messages found\n');
      }
    } else {
      console.log('   ✅ No solo AI messages found\n');
    }

    // 2. Delete solo AI chats created on June 29th
    console.log('💬 Checking solo AI chats...');
    const { data: soloChats, error: soloChatsError } = await supabase
      .from('solo_ai_chats')
      .select('id, title, created_at')
      .eq('user_id', targetUserId)
      .gte('created_at', `${targetDate}T00:00:00.000Z`)
      .lt('created_at', `${targetDate}T23:59:59.999Z`);

    if (soloChatsError) {
      console.error('❌ Error fetching solo chats:', soloChatsError);
    } else if (soloChats && soloChats.length > 0) {
      console.log(`   Found ${soloChats.length} chats to delete`);
      soloChats.forEach((chat, idx) => {
        console.log(`   ${idx + 1}. ${chat.created_at} | "${chat.title}"`);
      });

      const { error: deleteChatsError } = await supabase
        .from('solo_ai_chats')
        .delete()
        .in('id', soloChats.map(c => c.id));

      if (deleteChatsError) {
        console.error('❌ Error deleting chats:', deleteChatsError);
      } else {
        deletionSummary.solo_chats = soloChats.length;
        console.log(`   ✅ Deleted ${soloChats.length} solo AI chats\n`);
      }
    } else {
      console.log('   ✅ No solo AI chats found\n');
    }

    // 3. Delete AI feedback
    console.log('🤖 Checking AI feedback...');
    const { data: aiFeedback, error: aiFeedbackError } = await supabase
      .from('ai_feedback')
      .select('id, post_id, created_at')
      .eq('user_id', targetUserId)
      .gte('created_at', `${targetDate}T00:00:00.000Z`)
      .lt('created_at', `${targetDate}T23:59:59.999Z`);

    if (aiFeedbackError) {
      console.error('❌ Error fetching AI feedback:', aiFeedbackError);
    } else if (aiFeedback && aiFeedback.length > 0) {
      console.log(`   Found ${aiFeedback.length} AI feedback entries to delete`);
      
      const { error: deleteFeedbackError } = await supabase
        .from('ai_feedback')
        .delete()
        .in('id', aiFeedback.map(f => f.id));

      if (deleteFeedbackError) {
        console.error('❌ Error deleting AI feedback:', deleteFeedbackError);
      } else {
        deletionSummary.ai_feedback = aiFeedback.length;
        console.log(`   ✅ Deleted ${aiFeedback.length} AI feedback entries\n`);
      }
    } else {
      console.log('   ✅ No AI feedback found\n');
    }

    // 4. Delete comments
    console.log('💬 Checking comments...');
    const { data: comments, error: commentsError } = await supabase
      .from('comments')
      .select('id, content, post_id, created_at')
      .eq('user_id', targetUserId)
      .gte('created_at', `${targetDate}T00:00:00.000Z`)
      .lt('created_at', `${targetDate}T23:59:59.999Z`);

    if (commentsError) {
      console.error('❌ Error fetching comments:', commentsError);
    } else if (comments && comments.length > 0) {
      console.log(`   Found ${comments.length} comments to delete`);
      comments.forEach((comment, idx) => {
        const preview = comment.content.substring(0, 50) + (comment.content.length > 50 ? '...' : '');
        console.log(`   ${idx + 1}. ${comment.created_at} | "${preview}"`);
      });

      const { error: deleteCommentsError } = await supabase
        .from('comments')
        .delete()
        .in('id', comments.map(c => c.id));

      if (deleteCommentsError) {
        console.error('❌ Error deleting comments:', deleteCommentsError);
      } else {
        deletionSummary.comments = comments.length;
        console.log(`   ✅ Deleted ${comments.length} comments\n`);
      }
    } else {
      console.log('   ✅ No comments found\n');
    }

    // 5. Delete post views
    console.log('👁️ Checking post views...');
    const { data: postViews, error: postViewsError } = await supabase
      .from('post_views')
      .select('id, post_id, viewed_at')
      .eq('user_id', targetUserId)
      .gte('viewed_at', `${targetDate}T00:00:00.000Z`)
      .lt('viewed_at', `${targetDate}T23:59:59.999Z`);

    if (postViewsError) {
      console.error('❌ Error fetching post views:', postViewsError);
    } else if (postViews && postViews.length > 0) {
      console.log(`   Found ${postViews.length} post views to delete`);

      const { error: deleteViewsError } = await supabase
        .from('post_views')
        .delete()
        .in('id', postViews.map(v => v.id));

      if (deleteViewsError) {
        console.error('❌ Error deleting post views:', deleteViewsError);
      } else {
        deletionSummary.post_views = postViews.length;
        console.log(`   ✅ Deleted ${postViews.length} post views\n`);
      }
    } else {
      console.log('   ✅ No post views found\n');
    }

    // 6. Delete posts (this will cascade delete related comments, views, feedback)
    console.log('📸 Checking posts...');
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('id, image_url, image_path, title, created_at')
      .eq('user_id', targetUserId)
      .gte('created_at', `${targetDate}T00:00:00.000Z`)
      .lt('created_at', `${targetDate}T23:59:59.999Z`);

    if (postsError) {
      console.error('❌ Error fetching posts:', postsError);
    } else if (posts && posts.length > 0) {
      console.log(`   Found ${posts.length} posts to delete`);
      posts.forEach((post, idx) => {
        const title = post.title || 'Untitled';
        const preview = title.substring(0, 50) + (title.length > 50 ? '...' : '');
        console.log(`   ${idx + 1}. ${post.created_at} | "${preview}"`);
      });

      // Before deleting posts, collect image URLs to delete from storage
      const imageUrls = posts.map(p => p.image_url).filter(url => url);

      const { error: deletePostsError } = await supabase
        .from('posts')
        .delete()
        .in('id', posts.map(p => p.id));

      if (deletePostsError) {
        console.error('❌ Error deleting posts:', deletePostsError);
      } else {
        deletionSummary.posts = posts.length;
        console.log(`   ✅ Deleted ${posts.length} posts\n`);

        // Delete associated images from storage
        if (imageUrls.length > 0) {
          console.log('🖼️ Deleting associated images from storage...');
          for (const url of imageUrls) {
            try {
              // Extract file path from URL
              const match = url.match(/images\/(.+)$/);
              if (match && match[1]) {
                const { error } = await supabase.storage
                  .from('images')
                  .remove([match[1]]);
                
                if (!error) {
                  deletionSummary.storage_images++;
                }
              }
            } catch (e) {
              console.error(`   ⚠️ Error deleting image: ${e.message}`);
            }
          }
          console.log(`   ✅ Deleted ${deletionSummary.storage_images} images from storage\n`);
        }
      }
    } else {
      console.log('   ✅ No posts found\n');
    }

    // 7. Delete photos
    console.log('📷 Checking photos...');
    const { data: photos, error: photosError } = await supabase
      .from('photos')
      .select('id, file_path, uploaded_at')
      .eq('user_id', targetUserId)
      .gte('uploaded_at', `${targetDate}T00:00:00.000Z`)
      .lt('uploaded_at', `${targetDate}T23:59:59.999Z`);

    if (photosError) {
      console.error('❌ Error fetching photos:', photosError);
    } else if (photos && photos.length > 0) {
      console.log(`   Found ${photos.length} photos to delete`);

      // Collect storage paths before deletion
      const storagePaths = photos.map(p => p.file_path).filter(path => path);

      const { error: deletePhotosError } = await supabase
        .from('photos')
        .delete()
        .in('id', photos.map(p => p.id));

      if (deletePhotosError) {
        console.error('❌ Error deleting photos:', deletePhotosError);
      } else {
        deletionSummary.photos = photos.length;
        console.log(`   ✅ Deleted ${photos.length} photos\n`);

        // Delete from storage
        if (storagePaths.length > 0) {
          const { error } = await supabase.storage
            .from('images')
            .remove(storagePaths);
          
          if (error) {
            console.error('   ⚠️ Error deleting photo files:', error);
          }
        }
      }
    } else {
      console.log('   ✅ No photos found\n');
    }

    // 8. Delete class memberships created on June 29th
    console.log('👥 Checking class memberships...');
    const { data: classMemberships, error: classMembershipsError } = await supabase
      .from('class_members')
      .select('id, class_id, joined_at')
      .eq('user_id', targetUserId)
      .gte('joined_at', `${targetDate}T00:00:00.000Z`)
      .lt('joined_at', `${targetDate}T23:59:59.999Z`);

    if (classMembershipsError) {
      console.error('❌ Error fetching class memberships:', classMembershipsError);
    } else if (classMemberships && classMemberships.length > 0) {
      console.log(`   Found ${classMemberships.length} class memberships to delete`);

      const { error: deleteMembershipsError } = await supabase
        .from('class_members')
        .delete()
        .in('id', classMemberships.map(m => m.id));

      if (deleteMembershipsError) {
        console.error('❌ Error deleting class memberships:', deleteMembershipsError);
      } else {
        deletionSummary.class_members = classMemberships.length;
        console.log(`   ✅ Deleted ${classMemberships.length} class memberships\n`);
      }
    } else {
      console.log('   ✅ No class memberships found\n');
    }

    // 9. Check and clean up solo_images bucket
    console.log('🖼️ Checking solo_images storage bucket...');
    try {
      const { data: soloImagesList, error: listError } = await supabase.storage
        .from('solo_images')
        .list(targetUserId, {
          limit: 1000,
          offset: 0
        });

      if (listError) {
        console.error('   ⚠️ Error listing solo images:', listError);
      } else if (soloImagesList && soloImagesList.length > 0) {
        // Filter images created on June 29th
        const imagesToDelete = soloImagesList.filter(file => {
          if (file.created_at) {
            const fileDate = new Date(file.created_at).toISOString().split('T')[0];
            return fileDate === targetDate;
          }
          return false;
        });

        if (imagesToDelete.length > 0) {
          console.log(`   Found ${imagesToDelete.length} solo images to delete`);
          
          const pathsToDelete = imagesToDelete.map(img => `${targetUserId}/${img.name}`);
          const { error: deleteError } = await supabase.storage
            .from('solo_images')
            .remove(pathsToDelete);

          if (deleteError) {
            console.error('   ❌ Error deleting solo images:', deleteError);
          } else {
            deletionSummary.storage_solo_images = imagesToDelete.length;
            console.log(`   ✅ Deleted ${imagesToDelete.length} solo images\n`);
          }
        } else {
          console.log('   ✅ No solo images from June 29th found\n');
        }
      } else {
        console.log('   ✅ No solo images found\n');
      }
    } catch (e) {
      console.error('   ⚠️ Error checking solo images:', e.message);
    }

    // Summary
    console.log('📊 Cleanup Summary');
    console.log('==================');
    console.log(`✅ Solo AI Messages: ${deletionSummary.solo_messages}`);
    console.log(`✅ Solo AI Chats: ${deletionSummary.solo_chats}`);
    console.log(`✅ AI Feedback: ${deletionSummary.ai_feedback}`);
    console.log(`✅ Comments: ${deletionSummary.comments}`);
    console.log(`✅ Post Views: ${deletionSummary.post_views}`);
    console.log(`✅ Posts: ${deletionSummary.posts}`);
    console.log(`✅ Photos: ${deletionSummary.photos}`);
    console.log(`✅ Class Memberships: ${deletionSummary.class_members}`);
    console.log(`✅ Storage Images: ${deletionSummary.storage_images}`);
    console.log(`✅ Solo Storage Images: ${deletionSummary.storage_solo_images}`);
    console.log('');
    
    const totalDeleted = Object.values(deletionSummary).reduce((sum, count) => sum + count, 0);
    console.log(`🎯 Total items deleted: ${totalDeleted}`);
    console.log('');
    console.log('✅ Cleanup complete! All data from June 29th has been removed.');

  } catch (error) {
    console.error('❌ Unexpected error during cleanup:', error);
    process.exit(1);
  }
}

// Run the cleanup
cleanupUserDataJune29()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }); 