-- Solo Tutor Database Schema Migration
-- This migration creates the database schema for the Solo AI Tutor feature including:
-- - Enabling pgvector extension for embedding storage
-- - Creating solo_ai_chats table for conversation threads
-- - Creating solo_ai_messages table for individual messages with embeddings
-- - Setting up Row Level Security (RLS) policies
-- - Creating vector similarity search function for RAG

-- Enable pgvector extension for vector embeddings storage and similarity search
CREATE EXTENSION IF NOT EXISTS vector;

-- Create solo_ai_chats table for conversation threads
CREATE TABLE IF NOT EXISTS public.solo_ai_chats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT, -- Optional user-defined title for the chat thread
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance on solo_ai_chats
CREATE INDEX IF NOT EXISTS solo_ai_chats_user_id_idx ON public.solo_ai_chats(user_id);
CREATE INDEX IF NOT EXISTS solo_ai_chats_created_at_idx ON public.solo_ai_chats(created_at);
CREATE INDEX IF NOT EXISTS solo_ai_chats_updated_at_idx ON public.solo_ai_chats(updated_at);

-- Enable RLS on solo_ai_chats table
ALTER TABLE public.solo_ai_chats ENABLE ROW LEVEL SECURITY;

-- Create solo_ai_messages table for individual messages with embeddings
CREATE TABLE IF NOT EXISTS public.solo_ai_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chat_id UUID NOT NULL REFERENCES public.solo_ai_chats(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')), -- 'user' for student messages, 'assistant' for AI responses
  content TEXT NOT NULL, -- The message content text
  image_url TEXT, -- Optional image URL for multimodal messages
  embedding vector(1536), -- Text embedding vector for RAG (matches text-embedding-3-small dimension)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints for data integrity
  CONSTRAINT solo_ai_messages_content_not_empty CHECK (length(trim(content)) > 0)
);

-- Create indexes for performance on solo_ai_messages
CREATE INDEX IF NOT EXISTS solo_ai_messages_chat_id_idx ON public.solo_ai_messages(chat_id);
CREATE INDEX IF NOT EXISTS solo_ai_messages_role_idx ON public.solo_ai_messages(role);
CREATE INDEX IF NOT EXISTS solo_ai_messages_created_at_idx ON public.solo_ai_messages(created_at);

-- Create vector similarity search index for RAG functionality
CREATE INDEX IF NOT EXISTS solo_ai_messages_embedding_idx ON public.solo_ai_messages 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Enable RLS on solo_ai_messages table
ALTER TABLE public.solo_ai_messages ENABLE ROW LEVEL SECURITY;

-- Add updated_at trigger for solo_ai_chats (reuse existing function)
CREATE TRIGGER solo_ai_chats_updated_at
  BEFORE UPDATE ON public.solo_ai_chats
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create vector similarity search function for RAG
CREATE OR REPLACE FUNCTION public.search_similar_messages(
  query_embedding vector(1536),
  similarity_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5,
  target_user_id uuid DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  chat_id uuid,
  role text,
  content text,
  image_url text,
  similarity float,
  created_at timestamp with time zone
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sam.id,
    sam.chat_id,
    sam.role,
    sam.content,
    sam.image_url,
    -- Calculate cosine similarity (1 - cosine distance)
    1 - (sam.embedding <=> query_embedding) as similarity,
    sam.created_at
  FROM public.solo_ai_messages sam
  INNER JOIN public.solo_ai_chats sac ON sam.chat_id = sac.id
  WHERE 
    -- Only include messages where similarity exceeds threshold
    1 - (sam.embedding <=> query_embedding) > similarity_threshold
    -- Filter by user if specified
    AND (target_user_id IS NULL OR sac.user_id = target_user_id)
    -- Only include messages that have embeddings
    AND sam.embedding IS NOT NULL
  ORDER BY sam.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Grant execution permissions for the search function
GRANT EXECUTE ON FUNCTION public.search_similar_messages(vector, float, int, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.search_similar_messages(vector, float, int, uuid) TO service_role;

-- RLS policies for solo_ai_chats table

-- Users can view their own chat threads only
CREATE POLICY "Users can view own solo chats" ON public.solo_ai_chats
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Users can create their own chat threads
CREATE POLICY "Users can create own solo chats" ON public.solo_ai_chats
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update their own chat threads (e.g., change title)
CREATE POLICY "Users can update own solo chats" ON public.solo_ai_chats
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own chat threads
CREATE POLICY "Users can delete own solo chats" ON public.solo_ai_chats
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- RLS policies for solo_ai_messages table

-- Users can view messages from their own chats only
CREATE POLICY "Users can view own solo messages" ON public.solo_ai_messages
FOR SELECT 
TO authenticated
USING (
  chat_id IN (
    SELECT id FROM public.solo_ai_chats WHERE user_id = auth.uid()
  )
);

-- Users can create messages in their own chats
CREATE POLICY "Users can create solo messages in own chats" ON public.solo_ai_messages
FOR INSERT 
TO authenticated
WITH CHECK (
  chat_id IN (
    SELECT id FROM public.solo_ai_chats WHERE user_id = auth.uid()
  )
);

-- Users can update messages in their own chats (for editing functionality)
CREATE POLICY "Users can update solo messages in own chats" ON public.solo_ai_messages
FOR UPDATE 
TO authenticated
USING (
  chat_id IN (
    SELECT id FROM public.solo_ai_chats WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  chat_id IN (
    SELECT id FROM public.solo_ai_chats WHERE user_id = auth.uid()
  )
);

-- Users can delete messages from their own chats
CREATE POLICY "Users can delete solo messages in own chats" ON public.solo_ai_messages
FOR DELETE 
TO authenticated
USING (
  chat_id IN (
    SELECT id FROM public.solo_ai_chats WHERE user_id = auth.uid()
  )
);

-- Grant permissions for authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON public.solo_ai_chats TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.solo_ai_messages TO authenticated; 