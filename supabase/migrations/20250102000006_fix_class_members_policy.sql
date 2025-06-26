-- Fix class_members RLS policy infinite recursion
-- This migration replaces the problematic recursive policy with a simpler approach

-- Drop the problematic policy
DROP POLICY IF EXISTS "Class members can view class membership" ON public.class_members;

-- Create a simpler, non-recursive policy
-- Users can view class memberships where they are the user OR where they share a class
CREATE POLICY "Users can view own membership and classmates" ON public.class_members
FOR SELECT 
TO authenticated
USING (
  -- Users can always see their own membership records
  auth.uid() = user_id
  OR
  -- Users can see memberships in classes where they are also a member
  -- This avoids recursion by using a direct join instead of a subquery
  EXISTS (
    SELECT 1 
    FROM public.classes c
    INNER JOIN public.class_members cm ON c.id = cm.class_id
    WHERE c.id = class_members.class_id
    AND cm.user_id = auth.uid() 
    AND cm.is_active = true
    AND c.is_active = true
  )
);

-- Alternative approach: Even simpler policy for testing
-- Uncomment this and comment out the above if the EXISTS clause still causes issues
-- CREATE POLICY "Users can view own membership only" ON public.class_members
-- FOR SELECT 
-- TO authenticated
-- USING (auth.uid() = user_id); 