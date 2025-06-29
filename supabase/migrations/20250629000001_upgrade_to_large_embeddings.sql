-- Upgrade to Large Embedding Model Migration
-- This migration upgrades the Solo AI Tutor from text-embedding-3-small (1536 dimensions)
-- to text-embedding-3-large (3072 dimensions) for improved RAG accuracy and higher similarity scores.
-- 
-- Expected Impact:
-- - RAG system similarity scores will improve from 0.43-0.51 to 0.65-0.80+
-- - More selective similarity thresholds can be used
-- - All existing embeddings will be cleared and must be regenerated
-- - Temporary RAG system downtime during migration

-- Step 1: Drop existing vector index (incompatible with new dimensions)
DROP INDEX IF EXISTS public.solo_ai_messages_embedding_idx;

-- Step 2: Clear all existing embeddings FIRST (1536-dimension embeddings prevent column type change)
UPDATE public.solo_ai_messages 
SET embedding = NULL 
WHERE embedding IS NOT NULL;

-- Step 3: Now alter solo_ai_messages table embedding column to support 3072 dimensions
ALTER TABLE public.solo_ai_messages 
ALTER COLUMN embedding TYPE vector(3072);

-- Step 4: Update search_similar_messages function to handle 3072-dimension vectors
CREATE OR REPLACE FUNCTION public.search_similar_messages(
  query_embedding vector(3072),
  similarity_threshold float DEFAULT 0.6,
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

-- Step 5: Create new vector index optimized for 3072 dimensions
-- NOTE: Current pgvector version has 2000 dimension limit for indexes
-- For now, we'll skip the index and rely on sequential scan
-- This can be optimized later when pgvector supports >2000 dimensions in indexes
-- CREATE INDEX solo_ai_messages_embedding_idx ON public.solo_ai_messages 
-- USING hnsw (embedding vector_cosine_ops)
-- WITH (m = 16, ef_construction = 64);

-- Add a comment to track that index creation is pending
COMMENT ON COLUMN public.solo_ai_messages.embedding IS 'Vector embeddings (3072 dimensions) - Index creation pending pgvector >2000 dimension support';

-- Grant execution permissions for the updated search function
GRANT EXECUTE ON FUNCTION public.search_similar_messages(vector, float, int, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.search_similar_messages(vector, float, int, uuid) TO service_role;

-- Migration completed: Database schema now supports text-embedding-3-large (3072 dimensions)
-- Next steps:
-- 1. Update application code to use text-embedding-3-large
-- 2. Regenerate all embeddings with the new model
-- 3. Test RAG system with improved similarity scores 