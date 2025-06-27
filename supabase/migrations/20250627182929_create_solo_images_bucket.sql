-- Create solo-images bucket for Solo Tutor feature
-- This bucket stores images uploaded by users for AI analysis

-- Create the solo-images bucket
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'solo-images', 
  'solo-images', 
  true, 
  10485760, -- 10MB limit for AI processing
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

-- Set up storage policies for solo-images bucket
-- Users can upload solo images to their own folder
create policy "Users can upload solo images" on storage.objects
for insert with check (
  bucket_id = 'solo-images' 
  and auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can view solo images (public bucket)
create policy "Users can view solo images" on storage.objects
for select using (bucket_id = 'solo-images');

-- Users can delete their own solo images
create policy "Users can delete their own solo images" on storage.objects
for delete using (
  bucket_id = 'solo-images' 
  and auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can update their own solo images
create policy "Users can update their own solo images" on storage.objects
for update using (
  bucket_id = 'solo-images' 
  and auth.uid()::text = (storage.foldername(name))[1]
);
