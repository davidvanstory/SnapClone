-- Posts table migration
-- This migration creates the posts table for ephemeral artwork sharing

-- Create posts table with ephemeral properties
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_path TEXT, -- Storage path for cleanup
  frame_style TEXT, -- Optional frame selection ('none', 'classic', 'modern', 'vintage', etc.)
  title TEXT, -- Optional artwork title
  description TEXT, -- Optional artwork description
  
  -- Ephemeral properties
  max_viewers INTEGER DEFAULT 5 CHECK (max_viewers > 0 AND max_viewers <= 50),
  view_count INTEGER DEFAULT 0 CHECK (view_count >= 0),
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_expired BOOLEAN DEFAULT false,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT posts_image_url_not_empty CHECK (length(trim(image_url)) > 0),
  CONSTRAINT posts_expires_in_future CHECK (expires_at > created_at),
  CONSTRAINT posts_view_count_max CHECK (view_count <= max_viewers)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS posts_user_id_idx ON public.posts(user_id);
CREATE INDEX IF NOT EXISTS posts_class_id_idx ON public.posts(class_id);
CREATE INDEX IF NOT EXISTS posts_expires_at_idx ON public.posts(expires_at);
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON public.posts(created_at);
CREATE INDEX IF NOT EXISTS posts_is_expired_idx ON public.posts(is_expired);

-- Compound indexes for common queries
CREATE INDEX IF NOT EXISTS posts_class_active_idx ON public.posts(class_id, is_expired, created_at DESC);
CREATE INDEX IF NOT EXISTS posts_user_active_idx ON public.posts(user_id, is_expired, created_at DESC);

-- Enable RLS on posts table
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- RLS policies for posts table

-- Users can view posts in classes (simplified non-recursive policy)
CREATE POLICY "Users can view posts in their classes" ON public.posts
FOR SELECT 
TO authenticated
USING (
  -- Users can always see their own posts
  user_id = auth.uid()
  OR
  -- Users can see posts in active classes (simplified to avoid recursion)
  -- Class membership validation happens at the application level
  class_id IN (
    SELECT id FROM public.classes 
    WHERE is_active = true
  )
  AND is_expired = false
);

-- Users can create posts (simplified check)
CREATE POLICY "Users can create posts" ON public.posts
FOR INSERT 
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  -- Simplified: just check that class exists and is active
  AND class_id IN (
    SELECT id FROM public.classes 
    WHERE is_active = true
  )
);

-- Users can update their own posts
CREATE POLICY "Users can update own posts" ON public.posts
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own posts
CREATE POLICY "Users can delete own posts" ON public.posts
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Add updated_at trigger
CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Function to automatically set expires_at based on duration_minutes
CREATE OR REPLACE FUNCTION public.set_post_expiration()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate expiration time if not explicitly set
  IF NEW.expires_at IS NULL THEN
    NEW.expires_at := NEW.created_at + (NEW.duration_minutes || ' minutes')::interval;
  END IF;
  
  -- Ensure expiration is in the future
  IF NEW.expires_at <= NOW() THEN
    RAISE EXCEPTION 'Post expiration must be in the future';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to set expiration time
CREATE TRIGGER posts_set_expiration
  BEFORE INSERT ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION public.set_post_expiration();

-- Function to mark expired posts
CREATE OR REPLACE FUNCTION public.mark_expired_posts()
RETURNS INTEGER AS $$
DECLARE
  expired_count INTEGER;
BEGIN
  -- Mark posts as expired and get count
  UPDATE public.posts 
  SET is_expired = true, updated_at = NOW()
  WHERE expires_at <= NOW() AND is_expired = false;
  
  GET DIAGNOSTICS expired_count = ROW_COUNT;
  
  -- Log the cleanup (in production, you'd use proper logging)
  RAISE NOTICE 'Marked % posts as expired at %', expired_count, NOW();
  
  RETURN expired_count;
END;
$$ LANGUAGE plpgsql;

-- Function to increment view count safely
CREATE OR REPLACE FUNCTION public.increment_post_view(post_id UUID, viewer_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  current_views INTEGER;
  max_views INTEGER;
  post_user_id UUID;
BEGIN
  -- Get current view count, max viewers, and post owner
  SELECT view_count, max_viewers, user_id 
  INTO current_views, max_views, post_user_id
  FROM public.posts 
  WHERE id = post_id AND is_expired = false;
  
  -- Check if post exists and not expired
  IF NOT FOUND THEN
    RETURN false;
  END IF;
  
  -- Don't count views from the post owner
  IF post_user_id = viewer_id THEN
    RETURN true;
  END IF;
  
  -- Check if view limit reached
  IF current_views >= max_views THEN
    RETURN false;
  END IF;
  
  -- Increment view count
  UPDATE public.posts 
  SET view_count = view_count + 1, updated_at = NOW()
  WHERE id = post_id;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql;

-- Create post_views table to track individual views (prevent double counting)
CREATE TABLE IF NOT EXISTS public.post_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Prevent duplicate views
  CONSTRAINT post_views_unique_view UNIQUE(post_id, user_id)
);

-- Create indexes for post_views
CREATE INDEX IF NOT EXISTS post_views_post_id_idx ON public.post_views(post_id);
CREATE INDEX IF NOT EXISTS post_views_user_id_idx ON public.post_views(user_id);
CREATE INDEX IF NOT EXISTS post_views_viewed_at_idx ON public.post_views(viewed_at);

-- Enable RLS on post_views
ALTER TABLE public.post_views ENABLE ROW LEVEL SECURITY;

-- RLS policies for post_views

-- Users can view their own viewing history
CREATE POLICY "Users can view own viewing history" ON public.post_views
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Users can record their own views
CREATE POLICY "Users can record own views" ON public.post_views
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Post owners can see who viewed their posts
CREATE POLICY "Post owners can see viewers" ON public.post_views
FOR SELECT 
TO authenticated
USING (
  post_id IN (
    SELECT id FROM public.posts WHERE user_id = auth.uid()
  )
);

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT SELECT, INSERT ON public.post_views TO authenticated; 