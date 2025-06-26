-- AI Feedback table migration
-- This migration creates the ai_feedback table for AI-generated artwork feedback

-- Create ai_feedback table
CREATE TABLE IF NOT EXISTS public.ai_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  feedback_text TEXT NOT NULL,
  feedback_status TEXT DEFAULT 'completed' CHECK (feedback_status IN ('pending', 'processing', 'completed', 'failed')),
  processing_time_ms INTEGER, -- Track how long AI processing took
  ai_model TEXT DEFAULT 'gpt-4v', -- Track which AI model was used
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT ai_feedback_text_not_empty CHECK (length(trim(feedback_text)) > 0),
  CONSTRAINT ai_feedback_unique_per_post UNIQUE(post_id) -- Only one AI feedback per post
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS ai_feedback_post_id_idx ON public.ai_feedback(post_id);
CREATE INDEX IF NOT EXISTS ai_feedback_user_id_idx ON public.ai_feedback(user_id);
CREATE INDEX IF NOT EXISTS ai_feedback_status_idx ON public.ai_feedback(feedback_status);
CREATE INDEX IF NOT EXISTS ai_feedback_created_at_idx ON public.ai_feedback(created_at);

-- Enable RLS on ai_feedback table
ALTER TABLE public.ai_feedback ENABLE ROW LEVEL SECURITY;

-- RLS policies for ai_feedback

-- Users can view AI feedback on their own posts
CREATE POLICY "Users can view AI feedback on own posts" ON public.ai_feedback
FOR SELECT 
TO authenticated
USING (
  user_id = auth.uid()
  OR post_id IN (
    SELECT id FROM public.posts WHERE user_id = auth.uid()
  )
);

-- Users can request AI feedback on their own posts
CREATE POLICY "Users can request AI feedback on own posts" ON public.ai_feedback
FOR INSERT 
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND post_id IN (
    SELECT id FROM public.posts 
    WHERE user_id = auth.uid() AND is_expired = false
  )
);

-- Users can update AI feedback status on their requests
CREATE POLICY "Users can update own AI feedback" ON public.ai_feedback
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can delete AI feedback on their posts
CREATE POLICY "Users can delete own AI feedback" ON public.ai_feedback
FOR DELETE 
TO authenticated
USING (
  user_id = auth.uid()
  OR post_id IN (
    SELECT id FROM public.posts WHERE user_id = auth.uid()
  )
);

-- Add updated_at trigger
CREATE TRIGGER ai_feedback_updated_at
  BEFORE UPDATE ON public.ai_feedback
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Function to validate AI feedback request
CREATE OR REPLACE FUNCTION public.validate_ai_feedback_request()
RETURNS TRIGGER AS $$
DECLARE
  post_exists BOOLEAN;
  post_expired BOOLEAN;
  post_owner UUID;
BEGIN
  -- Check if post exists and get details
  SELECT 
    (id IS NOT NULL),
    is_expired,
    user_id
  INTO post_exists, post_expired, post_owner
  FROM public.posts 
  WHERE id = NEW.post_id;
  
  -- Validate post exists
  IF NOT post_exists THEN
    RAISE EXCEPTION 'Post does not exist';
  END IF;
  
  -- Validate post is not expired
  IF post_expired THEN
    RAISE EXCEPTION 'Cannot request AI feedback on expired posts';
  END IF;
  
  -- Validate user owns the post
  IF post_owner != NEW.user_id THEN
    RAISE EXCEPTION 'AI feedback can only be requested by post owner';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for AI feedback validation
CREATE TRIGGER ai_feedback_validate_request
  BEFORE INSERT ON public.ai_feedback
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_ai_feedback_request();

-- Function to check if AI feedback exists for a post
CREATE OR REPLACE FUNCTION public.has_ai_feedback(post_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  feedback_exists BOOLEAN;
BEGIN
  SELECT EXISTS(
    SELECT 1 FROM public.ai_feedback 
    WHERE post_id = post_uuid
  ) INTO feedback_exists;
  
  RETURN COALESCE(feedback_exists, false);
END;
$$ LANGUAGE plpgsql;

-- Function to get AI feedback for a post
CREATE OR REPLACE FUNCTION public.get_ai_feedback(post_uuid UUID)
RETURNS TABLE(
  id UUID,
  feedback_text TEXT,
  feedback_status TEXT,
  ai_model TEXT,
  processing_time_ms INTEGER,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    af.id,
    af.feedback_text,
    af.feedback_status,
    af.ai_model,
    af.processing_time_ms,
    af.created_at
  FROM public.ai_feedback af
  WHERE af.post_id = post_uuid;
END;
$$ LANGUAGE plpgsql;

-- Create a view for AI feedback with post information
CREATE OR REPLACE VIEW public.ai_feedback_with_posts AS
SELECT 
  af.id,
  af.post_id,
  af.user_id,
  af.feedback_text,
  af.feedback_status,
  af.ai_model,
  af.processing_time_ms,
  af.created_at,
  af.updated_at,
  p.image_url,
  p.title as post_title,
  p.description as post_description,
  u.username
FROM public.ai_feedback af
INNER JOIN public.posts p ON af.post_id = p.id
INNER JOIN public.users u ON af.user_id = u.id;

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ai_feedback TO authenticated;
GRANT SELECT ON public.ai_feedback_with_posts TO authenticated; 