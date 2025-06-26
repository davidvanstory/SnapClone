-- Comprehensive fix for ALL recursive policies
-- NOTE: This migration is now mostly redundant since we've updated the original
-- migrations to be non-recursive from the start. Keeping for safety and post_views.

-- ==========================================
-- ENSURE POST_VIEWS TABLE HAS PROPER POLICIES
-- ==========================================

-- Drop any existing post_views policies that might cause issues
DROP POLICY IF EXISTS "Class members can view post views" ON public.post_views;

-- Create simple, non-recursive policies for post_views
CREATE POLICY "Users can view own post views" ON public.post_views
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can record post views" ON public.post_views
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- SAFETY DROPS (NO-OPS IF ALREADY FIXED)
-- ==========================================

-- These should now be no-ops since we fixed the original migrations
-- but keeping for safety in case someone runs migrations out of order

-- Drop any problematic policies that might still exist
DROP POLICY IF EXISTS "Class members can view class membership" ON public.class_members;
DROP POLICY IF EXISTS "Class admins can manage memberships" ON public.class_members;
DROP POLICY IF EXISTS "Class members can view class posts" ON public.posts;
DROP POLICY IF EXISTS "Class members can create posts" ON public.posts;
DROP POLICY IF EXISTS "Class members can view comments" ON public.comments;
DROP POLICY IF EXISTS "Class members can create comments" ON public.comments;

-- ==========================================
-- SUMMARY
-- ==========================================

-- This migration now primarily ensures post_views table has proper policies.
-- The original recursive policy issues have been fixed at the source in
-- migrations 001, 002, and 003. 