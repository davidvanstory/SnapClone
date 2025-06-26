-- Comments table migration
-- This migration creates the comments table for peer interactions on posts

-- Create comments table with character limits
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (length(content) >= 1 AND length(content) <= 150),
  is_edited BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT comments_content_not_empty CHECK (length(trim(content)) > 0)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS comments_post_id_idx ON public.comments(post_id);
CREATE INDEX IF NOT EXISTS comments_user_id_idx ON public.comments(user_id);
CREATE INDEX IF NOT EXISTS comments_created_at_idx ON public.comments(created_at);

-- Compound index for post comments ordered by time
CREATE INDEX IF NOT EXISTS comments_post_time_idx ON public.comments(post_id, created_at);

-- Enable RLS on comments table
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- RLS policies for comments

-- Class members can view comments on posts in their classes
CREATE POLICY "Class members can view comments" ON public.comments
FOR SELECT 
TO authenticated
USING (
  post_id IN (
    SELECT p.id 
    FROM public.posts p
    INNER JOIN public.class_members cm ON p.class_id = cm.class_id
    WHERE cm.user_id = auth.uid() AND cm.is_active = true
  )
);

-- Class members can create comments on posts in their classes
CREATE POLICY "Class members can create comments" ON public.comments
FOR INSERT 
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND post_id IN (
    SELECT p.id 
    FROM public.posts p
    INNER JOIN public.class_members cm ON p.class_id = cm.class_id
    WHERE cm.user_id = auth.uid() AND cm.is_active = true
    AND p.is_expired = false -- Can't comment on expired posts
  )
);

-- Users can update their own comments (with edit tracking)
CREATE POLICY "Users can update own comments" ON public.comments
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own comments
CREATE POLICY "Users can delete own comments" ON public.comments
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Add updated_at trigger
CREATE TRIGGER comments_updated_at
  BEFORE UPDATE ON public.comments
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Function to track comment edits
CREATE OR REPLACE FUNCTION public.track_comment_edit()
RETURNS TRIGGER AS $$
BEGIN
  -- Mark as edited if content changes
  IF OLD.content != NEW.content THEN
    NEW.is_edited = true;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to track edits
CREATE TRIGGER comments_track_edit
  BEFORE UPDATE ON public.comments
  FOR EACH ROW
  EXECUTE FUNCTION public.track_comment_edit();

-- Function to get comment count for a post
CREATE OR REPLACE FUNCTION public.get_post_comment_count(post_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  comment_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO comment_count
  FROM public.comments 
  WHERE post_id = post_uuid;
  
  RETURN COALESCE(comment_count, 0);
END;
$$ LANGUAGE plpgsql;

-- Function to validate comment content (for encouraging, supportive comments)
CREATE OR REPLACE FUNCTION public.validate_comment_content()
RETURNS TRIGGER AS $$
BEGIN
  -- Basic content validation
  IF length(trim(NEW.content)) = 0 THEN
    RAISE EXCEPTION 'Comment cannot be empty';
  END IF;
  
  -- Character limit check (also enforced by constraint)
  IF length(NEW.content) > 150 THEN
    RAISE EXCEPTION 'Comment cannot exceed 150 characters';
  END IF;
  
  -- Could add more sophisticated content filtering here
  -- For now, just basic validation
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for content validation
CREATE TRIGGER comments_validate_content
  BEFORE INSERT OR UPDATE ON public.comments
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_comment_content();

-- Create a view for comments with user information (for easier queries)
CREATE OR REPLACE VIEW public.comments_with_users AS
SELECT 
  c.id,
  c.post_id,
  c.user_id,
  c.content,
  c.is_edited,
  c.created_at,
  c.updated_at,
  u.username,
  u.avatar_url
FROM public.comments c
INNER JOIN public.users u ON c.user_id = u.id;

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.comments TO authenticated;
GRANT SELECT ON public.comments_with_users TO authenticated; 