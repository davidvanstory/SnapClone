-- Storage setup migration
-- This migration creates the photos storage bucket

-- Enable the "storage" extension
create extension if not exists "storage" with schema "storage";

-- Create storage buckets
insert into storage.buckets (id, name, public)
values ('photos', 'photos', true);

-- Create solo-images bucket for Solo Tutor feature
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'solo-images', 
  'solo-images', 
  true, 
  10485760, -- 10MB limit for AI processing
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- Set up storage policies for photos bucket
create policy "Users can upload photos" on storage.objects
for insert with check (bucket_id = 'photos' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can view photos" on storage.objects
for select using (bucket_id = 'photos');

create policy "Users can delete their own photos" on storage.objects
for delete using (bucket_id = 'photos' and auth.uid()::text = (storage.foldername(name))[1]);

-- Set up storage policies for solo-images bucket
create policy "Users can upload solo images" on storage.objects
for insert with check (bucket_id = 'solo-images' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can view solo images" on storage.objects
for select using (bucket_id = 'solo-images');

create policy "Users can delete their own solo images" on storage.objects
for delete using (bucket_id = 'solo-images' and auth.uid()::text = (storage.foldername(name))[1]); 