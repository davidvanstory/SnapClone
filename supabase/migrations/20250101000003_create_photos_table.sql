-- Photos table migration
-- This migration creates the photos table for storing photo metadata

-- Create photos table
CREATE TABLE IF NOT EXISTS public.photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL UNIQUE,
  file_size BIGINT NOT NULL DEFAULT 0,
  mime_type TEXT NOT NULL DEFAULT 'image/jpeg',
  width INTEGER,
  height INTEGER,
  taken_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  storage_bucket TEXT NOT NULL DEFAULT 'photos',
  public_url TEXT,
  
  -- Indexes for performance
  CONSTRAINT photos_file_path_unique UNIQUE(file_path),
  CONSTRAINT photos_file_size_positive CHECK (file_size >= 0)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS photos_user_id_idx ON public.photos(user_id);
CREATE INDEX IF NOT EXISTS photos_uploaded_at_idx ON public.photos(uploaded_at);
CREATE INDEX IF NOT EXISTS photos_taken_at_idx ON public.photos(taken_at);
CREATE INDEX IF NOT EXISTS photos_storage_bucket_idx ON public.photos(storage_bucket);

-- Enable RLS
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for photos table

-- Allow users to view all photos (since this is a social sharing app)
CREATE POLICY "Photos are viewable by everyone" ON public.photos
FOR SELECT 
TO public
USING (true);

-- Allow authenticated users to upload photos
CREATE POLICY "Users can upload photos" ON public.photos
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Allow users to update their own photos
CREATE POLICY "Users can update own photos" ON public.photos
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own photos
CREATE POLICY "Users can delete own photos" ON public.photos
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Grant permissions
GRANT SELECT ON public.photos TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.photos TO authenticated; 