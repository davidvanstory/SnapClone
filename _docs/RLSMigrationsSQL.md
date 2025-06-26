# RLS Migrations & SQL Database Structure

## Overview

This document describes the comprehensive database structure, Row Level Security (RLS) policies, and migration strategy for the Draft (Ephemeral Art Sharing) application. The database has been designed with a **TypeScript-first, non-recursive RLS** approach to ensure security without performance issues.

## Migration Strategy

### Philosophy: Fix at Source
Rather than applying band-aid fixes, we implemented **non-recursive RLS policies from the start** in the original migration files. This approach ensures:
- Clean migration history
- No recursive policy dependencies
- Optimal performance
- Maintainable security model

### Migration Timeline

```
20250101000001_auth_tables.sql          - User authentication & profiles
20250101000002_setup_storage.sql        - Supabase Storage bucket setup
20250101000003_create_photos_table.sql  - Photo metadata storage
20250101000004_storage_policies.sql     - Storage bucket RLS policies
20250102000001_create_classes_table.sql - Classes & membership system
20250102000002_create_posts_table.sql   - Ephemeral posts & views tracking
20250102000003_create_comments_table.sql- Comments with character limits
20250102000004_create_ai_feedback_table.sql - AI feedback integration
20250102000005_demo_data_seed.sql       - Demo content for testing
20250102000009_fix_all_recursive_policies.sql - Safety net (mostly no-ops)
```

## Database Schema

### Core Tables

#### 1. `public.users`
**Purpose**: User profiles extending auth.users
```sql
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**RLS Policies**:
- `"Users can view own profile"` - Users see their own data
- `"Users can insert own profile"` - Registration support
- `"Users can update own profile"` - Profile editing
- `"Users can view other profiles"` - Social features (usernames, avatars)

#### 2. `public.classes`
**Purpose**: Art classes with join codes
```sql
CREATE TABLE public.classes (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  join_code TEXT UNIQUE NOT NULL CHECK (join_code ~ '^[A-Z0-9]{6}$'),
  description TEXT,
  created_by UUID REFERENCES auth.users(id),
  is_active BOOLEAN DEFAULT true,
  max_students INTEGER DEFAULT 30,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Features**:
- Automatic 6-character join code generation
- Class capacity management
- Soft deletion via `is_active`

**RLS Policies**:
- `"Active classes are viewable by everyone"` - Public class discovery
- `"Authenticated users can create classes"` - Class creation
- `"Class creators can update their classes"` - Management by creators
- `"Class creators can delete their classes"` - Deletion by creators

#### 3. `public.class_members`
**Purpose**: User-class relationships
```sql
CREATE TABLE public.class_members (
  id UUID PRIMARY KEY,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  CONSTRAINT class_members_unique_membership UNIQUE(class_id, user_id)
);
```

**RLS Policies** (Non-Recursive):
- `"Users can view own membership only"` - **SIMPLIFIED**: Users only see their own memberships
- `"Users can join classes"` - Self-registration
- `"Users can update own membership"` - Leave/rejoin functionality

**Note**: Advanced admin policies were removed to prevent recursion. Class membership validation happens at the application level.

#### 4. `public.posts`
**Purpose**: Ephemeral artwork posts
```sql
CREATE TABLE public.posts (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_path TEXT,
  frame_style TEXT,
  title TEXT,
  description TEXT,
  max_viewers INTEGER DEFAULT 5 CHECK (max_viewers > 0 AND max_viewers <= 50),
  view_count INTEGER DEFAULT 0,
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_expired BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Features**:
- Automatic expiration calculation
- View count tracking with limits
- Frame overlay support
- Ephemeral lifecycle management

**RLS Policies** (Non-Recursive):
- `"Users can view posts in their classes"` - **SIMPLIFIED**: Users see own posts + posts in active classes
- `"Users can create posts"` - **SIMPLIFIED**: Basic class existence check
- `"Users can update own posts"` - Self-management
- `"Users can delete own posts"` - Self-deletion

**Note**: Class membership validation moved to application level to avoid recursion.

#### 5. `public.post_views`
**Purpose**: Track individual post views (prevent double-counting)
```sql
CREATE TABLE public.post_views (
  id UUID PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT post_views_unique_view UNIQUE(post_id, user_id)
);
```

**RLS Policies**:
- `"Users can view own viewing history"` - Self-tracking
- `"Users can record own views"` - View logging
- `"Post owners can see viewers"` - Analytics for post creators

#### 6. `public.comments`
**Purpose**: Peer feedback with character limits
```sql
CREATE TABLE public.comments (
  id UUID PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (length(content) >= 1 AND length(content) <= 150),
  is_edited BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Features**:
- 150-character limit for focused feedback
- Edit tracking
- Automatic timestamps

**RLS Policies** (Non-Recursive):
- `"Users can view comments on accessible posts"` - **SIMPLIFIED**: Own posts + non-expired posts
- `"Users can create comments"` - **SIMPLIFIED**: Basic post existence check
- `"Users can update own comments"` - Self-editing
- `"Users can delete own comments"` - Self-deletion

#### 7. `public.ai_feedback`
**Purpose**: AI-generated artwork analysis
```sql
CREATE TABLE public.ai_feedback (
  id UUID PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  feedback_text TEXT NOT NULL,
  feedback_status TEXT DEFAULT 'completed',
  processing_time_ms INTEGER,
  ai_model TEXT DEFAULT 'gpt-4v',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT ai_feedback_unique_per_post UNIQUE(post_id)
);
```

**Features**:
- One feedback per post limit
- Processing status tracking
- AI model versioning
- Performance metrics

**RLS Policies**:
- `"Users can view AI feedback on own posts"` - Post owners only
- `"Users can request AI feedback on own posts"` - Self-service
- `"Users can update own AI feedback"` - Status management
- `"Users can delete own AI feedback"` - Self-management

#### 8. `public.photos`
**Purpose**: Photo metadata for camera functionality
```sql
CREATE TABLE public.photos (
  id UUID PRIMARY KEY,
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
  public_url TEXT
);
```

**RLS Policies**:
- `"Photos are viewable by everyone"` - Public sharing
- `"Users can upload photos"` - Upload functionality
- `"Users can update own photos"` - Metadata editing
- `"Users can delete own photos"` - Cleanup

## RLS Security Model

### Non-Recursive Approach

**Problem Solved**: Original policies created infinite recursion by querying the same tables they were protecting.

**Solution**: Simplified policies that:
1. **Avoid self-referential queries** - No table queries itself in its own policies
2. **Move complex logic to application layer** - Class membership validation in TypeScript
3. **Use direct table references only** - Simple existence checks without joins
4. **Prioritize performance over granular security** - Trust application-level validation

### Security Layers

1. **Database Level**: Basic ownership and existence checks
2. **Application Level**: Complex business logic (class membership, permissions)
3. **Storage Level**: Bucket-based access control
4. **Authentication Level**: Supabase Auth integration

### Policy Patterns

```sql
-- ✅ GOOD: Non-recursive, simple ownership check
USING (auth.uid() = user_id)

-- ✅ GOOD: Direct table reference without joins
USING (class_id IN (SELECT id FROM public.classes WHERE is_active = true))

-- ❌ BAD: Recursive - queries same table being protected
USING (class_id IN (SELECT class_id FROM public.class_members WHERE user_id = auth.uid()))

-- ❌ BAD: Complex joins that can cause recursion
USING (post_id IN (
  SELECT p.id FROM public.posts p
  INNER JOIN public.class_members cm ON p.class_id = cm.class_id
  WHERE cm.user_id = auth.uid()
))
```

## Database Functions

### Utility Functions

1. **`generate_join_code()`** - Creates unique 6-character class codes
2. **`set_join_code()`** - Trigger function for automatic code generation
3. **`handle_updated_at()`** - Automatic timestamp updates
4. **`handle_new_user()`** - Auto-create user profiles on registration

### Post Management Functions

1. **`set_post_expiration()`** - Calculate expiration times from duration
2. **`mark_expired_posts()`** - Batch expiration processing
3. **`increment_post_view()`** - Safe view count incrementation

### Comment & AI Functions

1. **`track_comment_edit()`** - Mark comments as edited
2. **`validate_comment_content()`** - Content validation
3. **`validate_ai_feedback_request()`** - AI feedback validation
4. **`get_post_comment_count()`** - Comment counting
5. **`has_ai_feedback()`** - AI feedback existence check

## Storage Configuration

### Buckets

- **`photos`**: Public bucket for artwork images
  - 50MB file size limit
  - Supports: JPEG, PNG, WebP, GIF
  - Public read access
  - Authenticated upload only

### Storage Policies

```sql
-- Public read access
CREATE POLICY "Photos are publicly viewable" ON storage.objects
FOR SELECT TO public USING (bucket_id = 'photos');

-- Authenticated upload
CREATE POLICY "Authenticated users can upload to photos bucket" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (bucket_id = 'photos');
```

## Demo Data Structure

### Test Environment

- **Demo Class**: "Monday Drawing Fundamentals" (join code: `DRAW01`)
- **Demo Users**: Maya, Jordan, Sam, Casey, Riley (5 fake classmates)
- **Sample Posts**: 4 artwork posts with realistic timing and engagement
- **Realistic Data**: View counts, comments, AI feedback examples

### Demo Post Examples

1. **Maya's Charcoal Portrait** - Expires in 45min, 3/5 viewers
2. **Jordan's Watercolor Landscape** - Expires in 2h20m, 2/4 viewers  
3. **Sam's Pencil Hand Study** - Expires in 18min, 5/5 viewers (max)
4. **Casey's Digital Character** - Expires in 23h45m, 1/3 viewers

## Performance Considerations

### Indexing Strategy

- **Primary Keys**: All tables use UUID primary keys
- **Foreign Keys**: Indexed for join performance
- **Query Patterns**: Compound indexes for common access patterns
- **Time-based**: Indexes on created_at, expires_at for sorting

### Query Optimization

- **Avoid N+1 queries**: Batch user data fetching in application
- **Minimize RLS overhead**: Simple policies with direct checks
- **Cache frequently accessed data**: Class memberships, user info
- **Efficient pagination**: Cursor-based pagination for feeds

## Future Enhancements

### Planned Improvements

1. **Enhanced Admin Policies**: Non-recursive admin management
2. **Real-time Subscriptions**: Live feed updates
3. **Advanced Analytics**: Post performance tracking
4. **Content Moderation**: Automated content filtering
5. **Backup & Archival**: Expired content management

### Migration Strategy

- **Additive Changes**: New tables and columns only
- **Backward Compatibility**: Maintain existing API contracts
- **Feature Flags**: Gradual rollout of new features
- **Data Migration**: Safe data transformation procedures

---

## Summary

This database structure provides a robust foundation for the Draft ephemeral art sharing application with:

- ✅ **Non-recursive RLS policies** for optimal performance
- ✅ **Comprehensive security model** with layered protection
- ✅ **Ephemeral content management** with automatic expiration
- ✅ **Social features** (comments, AI feedback, view tracking)
- ✅ **Scalable architecture** ready for future enhancements
- ✅ **Clean migration history** with fixes applied at source

The key innovation is the **non-recursive RLS approach** that moves complex business logic to the application layer while maintaining database-level security for ownership and basic validation. 