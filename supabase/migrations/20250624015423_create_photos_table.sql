-- migration: create photos table for storing photo metadata and file references
-- purpose: enable photo storage functionality for snapclone app
-- affected tables: photos (new table)
-- special considerations: includes file metadata, storage references, and basic indexing

-- create photos table to store photo metadata and file information
create table public.photos (
    -- primary key with uuid for distributed systems
    id uuid default gen_random_uuid() primary key,
    
    -- optional user association (for future user system)
    user_id uuid references auth.users(id) on delete cascade,
    
    -- file information
    file_name text not null,
    file_path text not null unique, -- unique constraint prevents duplicate file paths
    file_size bigint not null check (file_size > 0), -- file size in bytes
    mime_type text not null check (mime_type ~ '^image/'), -- ensure only image types
    
    -- image dimensions (optional metadata)
    width integer check (width > 0),
    height integer check (height > 0),
    
    -- timestamps for photo lifecycle
    taken_at timestamp with time zone not null default now(),
    uploaded_at timestamp with time zone not null default now(),
    
    -- supabase storage information
    storage_bucket text not null default 'photos',
    public_url text, -- cached public url for quick access
    
    -- audit fields
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
);

-- create indexes for common query patterns
create index idx_photos_user_id on public.photos(user_id) where user_id is not null;
create index idx_photos_taken_at on public.photos(taken_at desc);
create index idx_photos_uploaded_at on public.photos(uploaded_at desc);
create index idx_photos_file_path on public.photos(file_path);

-- create updated_at trigger to automatically update the timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger photos_updated_at
    before update on public.photos
    for each row
    execute function public.handle_updated_at();

-- enable row level security
alter table public.photos enable row level security;

-- create rls policies for public access (no authentication required for now)
-- policy for selecting photos - allow everyone to view photos
create policy "photos_select_policy_anon" on public.photos
    for select
    to anon
    using (true);

create policy "photos_select_policy_authenticated" on public.photos
    for select
    to authenticated
    using (true);

-- policy for inserting photos - allow everyone to upload photos
create policy "photos_insert_policy_anon" on public.photos
    for insert
    to anon
    with check (true);

create policy "photos_insert_policy_authenticated" on public.photos
    for insert
    to authenticated
    with check (true);

-- policy for updating photos - allow everyone to update photos
create policy "photos_update_policy_anon" on public.photos
    for update
    to anon
    using (true)
    with check (true);

create policy "photos_update_policy_authenticated" on public.photos
    for update
    to authenticated
    using (true)
    with check (true);

-- policy for deleting photos - allow everyone to delete photos
create policy "photos_delete_policy_anon" on public.photos
    for delete
    to anon
    using (true);

create policy "photos_delete_policy_authenticated" on public.photos
    for delete
    to authenticated
    using (true);

-- create storage bucket for photos if it doesn't exist
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
    'photos',
    'photos',
    true, -- public bucket for easy access
    10485760, -- 10mb file size limit
    array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
)
on conflict (id) do nothing;

-- create storage policies for the photos bucket
-- policy for selecting files - allow everyone to view
create policy "photos_storage_select_anon" on storage.objects
    for select
    to anon
    using (bucket_id = 'photos');

create policy "photos_storage_select_authenticated" on storage.objects
    for select
    to authenticated
    using (bucket_id = 'photos');

-- policy for inserting files - allow everyone to upload
create policy "photos_storage_insert_anon" on storage.objects
    for insert
    to anon
    with check (bucket_id = 'photos');

create policy "photos_storage_insert_authenticated" on storage.objects
    for insert
    to authenticated
    with check (bucket_id = 'photos');

-- policy for updating files - allow everyone to update
create policy "photos_storage_update_anon" on storage.objects
    for update
    to anon
    using (bucket_id = 'photos')
    with check (bucket_id = 'photos');

create policy "photos_storage_update_authenticated" on storage.objects
    for update
    to authenticated
    using (bucket_id = 'photos')
    with check (bucket_id = 'photos');

-- policy for deleting files - allow everyone to delete
create policy "photos_storage_delete_anon" on storage.objects
    for delete
    to anon
    using (bucket_id = 'photos');

create policy "photos_storage_delete_authenticated" on storage.objects
    for delete
    to authenticated
    using (bucket_id = 'photos'); 