-- Drop recursive admin policy that's still causing infinite recursion
-- This migration removes the "Class admins can manage memberships" policy

-- Drop the problematic recursive policy for admin management
DROP POLICY IF EXISTS "Class admins can manage memberships" ON public.class_members;

-- Note: We're removing this policy entirely for now to fix the recursion issue.
-- Basic functionality (users viewing their own memberships and joining classes) 
-- will still work with the existing "Users can view own membership only" policy.
-- Advanced admin features can be re-added later with a non-recursive approach if needed.

-- This leaves us with these policies on class_members:
-- 1. "Users can view own membership only" (FOR SELECT) - Safe, no recursion
-- 2. "Users can join classes" (FOR INSERT) - Safe
-- 3. "Users can update own membership" (FOR UPDATE) - Safe 