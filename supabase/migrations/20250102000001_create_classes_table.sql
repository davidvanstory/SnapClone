-- Classes table migration
-- This migration creates the classes table for Draft's class-based social features

-- Create classes table
CREATE TABLE IF NOT EXISTS public.classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  join_code TEXT UNIQUE NOT NULL,
  description TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  max_students INTEGER DEFAULT 30,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints for data integrity
  CONSTRAINT classes_name_not_empty CHECK (length(trim(name)) > 0),
  CONSTRAINT classes_join_code_format CHECK (join_code ~ '^[A-Z0-9]{6}$'),
  CONSTRAINT classes_max_students_positive CHECK (max_students > 0)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS classes_join_code_idx ON public.classes(join_code);
CREATE INDEX IF NOT EXISTS classes_created_by_idx ON public.classes(created_by);
CREATE INDEX IF NOT EXISTS classes_is_active_idx ON public.classes(is_active);
CREATE INDEX IF NOT EXISTS classes_created_at_idx ON public.classes(created_at);

-- Enable RLS on classes table
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for classes table

-- Allow everyone to view active classes (for joining)
CREATE POLICY "Active classes are viewable by everyone" ON public.classes
FOR SELECT 
TO public
USING (is_active = true);

-- Allow authenticated users to create classes
CREATE POLICY "Authenticated users can create classes" ON public.classes
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = created_by);

-- Allow class creators to update their classes
CREATE POLICY "Class creators can update their classes" ON public.classes
FOR UPDATE 
TO authenticated
USING (auth.uid() = created_by)
WITH CHECK (auth.uid() = created_by);

-- Allow class creators to delete their classes
CREATE POLICY "Class creators can delete their classes" ON public.classes
FOR DELETE 
TO authenticated
USING (auth.uid() = created_by);

-- Add updated_at trigger function (reuse existing function)
CREATE TRIGGER classes_updated_at
  BEFORE UPDATE ON public.classes
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Function to generate unique join codes
CREATE OR REPLACE FUNCTION public.generate_join_code()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := '';
  i INTEGER;
  code_exists BOOLEAN;
BEGIN
  LOOP
    result := '';
    -- Generate 6-character code
    FOR i IN 1..6 LOOP
      result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM public.classes WHERE join_code = result) INTO code_exists;
    
    -- Exit loop if unique code found
    IF NOT code_exists THEN
      EXIT;
    END IF;
  END LOOP;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to automatically generate join code on insert
CREATE OR REPLACE FUNCTION public.set_join_code()
RETURNS TRIGGER AS $$
BEGIN
  -- Only generate if join_code is not provided
  IF NEW.join_code IS NULL OR NEW.join_code = '' THEN
    NEW.join_code := public.generate_join_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically generate join codes
CREATE TRIGGER classes_set_join_code
  BEFORE INSERT ON public.classes
  FOR EACH ROW
  EXECUTE FUNCTION public.set_join_code();

-- Create class_members table for user-class relationships
CREATE TABLE IF NOT EXISTS public.class_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  
  -- Ensure unique membership per class
  CONSTRAINT class_members_unique_membership UNIQUE(class_id, user_id)
);

-- Create indexes for class_members
CREATE INDEX IF NOT EXISTS class_members_class_id_idx ON public.class_members(class_id);
CREATE INDEX IF NOT EXISTS class_members_user_id_idx ON public.class_members(user_id);
CREATE INDEX IF NOT EXISTS class_members_role_idx ON public.class_members(role);
CREATE INDEX IF NOT EXISTS class_members_joined_at_idx ON public.class_members(joined_at);

-- Enable RLS on class_members table
ALTER TABLE public.class_members ENABLE ROW LEVEL SECURITY;

-- RLS policies for class_members

-- Users can view their own membership records only (non-recursive)
CREATE POLICY "Users can view own membership only" ON public.class_members
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Users can join classes (insert their own membership)
CREATE POLICY "Users can join classes" ON public.class_members
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update their own membership status
CREATE POLICY "Users can update own membership" ON public.class_members
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Note: Advanced admin features for managing memberships have been removed
-- to prevent RLS recursion issues. Basic functionality (join/leave) still works.

-- Grant permissions
GRANT SELECT ON public.classes TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.classes TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.class_members TO authenticated;

-- Insert demo class for testing
INSERT INTO public.classes (name, join_code, description, created_by) 
VALUES (
  'Monday Drawing Fundamentals',
  'DRAW01',
  'A supportive environment for learning drawing basics and sharing creative work',
  NULL  -- Will be updated when we create demo users
) ON CONFLICT (join_code) DO NOTHING; 