-- Simple, non-recursive class_members policy fix
-- This migration replaces all complex policies with a basic "own records only" approach

-- Drop the still-problematic policy
DROP POLICY IF EXISTS "Users can view own membership and classmates" ON public.class_members;

-- Create the simplest possible policy: users can only see their own membership records
CREATE POLICY "Users can view own membership only" ON public.class_members
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- This is sufficient for the class joining workflow:
-- 1. When user tries to join a class, they check their own memberships
-- 2. When creating new membership, they insert their own record
-- 3. No need to see other users' memberships for basic functionality 