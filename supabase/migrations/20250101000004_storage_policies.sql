-- Storage policies migration
-- This migration creates the storage policies for the photos bucket

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Photos are publicly viewable" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own photos" ON storage.objects;  
DROP POLICY IF EXISTS "Users can delete own photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload to photos bucket" ON storage.objects;

-- Create storage policies for photos bucket

-- Allow public read access to photos (since bucket is public)
CREATE POLICY "Photos are publicly viewable" ON storage.objects
FOR SELECT 
TO public
USING (bucket_id = 'photos');

-- Allow authenticated users to upload photos (simplified policy)
CREATE POLICY "Authenticated users can upload to photos bucket" ON storage.objects
FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'photos'); 