/**
 * Class Service
 * 
 * This service handles all class-related operations including:
 * - Class creation and management
 * - Join code validation and verification
 * - Class membership management
 * - Class discovery and listing
 */

import type { Class, ClassMember } from './supabase';
import { supabase } from './supabase';

/**
 * Class validation result interface
 */
export interface ClassValidationResult {
  isValid: boolean;
  class?: Class;
  error?: string;
}

/**
 * Class join result interface
 */
export interface ClassJoinResult {
  success: boolean;
  membership?: ClassMember;
  class?: Class;
  error?: string;
  isExistingMember?: boolean; // Flag to indicate if user was already a member
}

/**
 * Class creation options
 */
export interface ClassCreationOptions {
  name: string;
  description?: string;
  maxStudents?: number;
  joinCode?: string; // Optional custom join code
}

/**
 * Validate join code format
 */
export function validateJoinCodeFormat(joinCode: string): boolean {
  console.log('🔍 Class Service - Validating join code format:', joinCode);
  
  if (!joinCode) {
    console.log('❌ Class Service - Join code is empty');
    return false;
  }

  // Must be exactly 6 characters, uppercase letters and numbers only
  const joinCodeRegex = /^[A-Z0-9]{6}$/;
  const isValid = joinCodeRegex.test(joinCode.trim().toUpperCase());
  
  console.log('✅ Class Service - Join code format validation:', isValid);
  return isValid;
}

/**
 * Normalize join code (convert to uppercase)
 */
export function normalizeJoinCode(joinCode: string): string {
  return joinCode.trim().toUpperCase();
}

/**
 * Validate and find class by join code
 */
export async function validateClassJoinCode(joinCode: string): Promise<ClassValidationResult> {
  console.log('🔍 Class Service - Validating class join code:', joinCode);

  try {
    // Validate format first
    if (!validateJoinCodeFormat(joinCode)) {
      return {
        isValid: false,
        error: 'Join code must be 6 characters (letters and numbers only)'
      };
    }

    const normalizedCode = normalizeJoinCode(joinCode);
    console.log('📝 Class Service - Normalized join code:', normalizedCode);

    // Look up class by join code
    const { data: classData, error } = await supabase
      .from('classes')
      .select('*')
      .eq('join_code', normalizedCode)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('❌ Class Service - Database error:', error);
      
      if (error.code === 'PGRST116') {
        return {
          isValid: false,
          error: 'Class not found. Please check your join code.'
        };
      }
      
      return {
        isValid: false,
        error: 'Failed to validate join code. Please try again.'
      };
    }

    if (!classData) {
      console.log('❌ Class Service - No class found with join code');
      return {
        isValid: false,
        error: 'Class not found. Please check your join code.'
      };
    }

    console.log('✅ Class Service - Class found:', classData.name);
    return {
      isValid: true,
      class: classData as Class
    };

  } catch (error) {
    console.error('❌ Class Service - Unexpected error during validation:', error);
    return {
      isValid: false,
      error: 'An error occurred while validating the join code'
    };
  }
}

/**
 * Join a class with join code
 */
export async function joinClass(joinCode: string, userId: string): Promise<ClassJoinResult> {
  console.log('🚀 Class Service - User attempting to join class:', { joinCode, userId });

  try {
    // First validate the join code and get class info
    const validation = await validateClassJoinCode(joinCode);
    
    if (!validation.isValid || !validation.class) {
      console.log('❌ Class Service - Join code validation failed');
      return {
        success: false,
        error: validation.error
      };
    }

    const classData = validation.class;
    console.log('✅ Class Service - Join code validated for class:', classData.name);

    // Check if user is already a member
    const { data: existingMembership, error: membershipError } = await supabase
      .from('class_members')
      .select('*')
      .eq('class_id', classData.id)
      .eq('user_id', userId)
      .single();

    if (membershipError && membershipError.code !== 'PGRST116') {
      console.error('❌ Class Service - Error checking existing membership:', membershipError);
      return {
        success: false,
        error: 'Failed to check class membership'
      };
    }

    if (existingMembership) {
      console.log('ℹ️ Class Service - User is already a member');
      
      if (existingMembership.is_active) {
        return {
          success: true,
          membership: existingMembership as ClassMember,
          class: classData,
          error: 'You are already a member of this class',
          isExistingMember: true
        };
      } else {
        // Reactivate membership
        const { data: reactivatedMembership, error: reactivateError } = await supabase
          .from('class_members')
          .update({ is_active: true })
          .eq('id', existingMembership.id)
          .select()
          .single();

        if (reactivateError) {
          console.error('❌ Class Service - Error reactivating membership:', reactivateError);
          return {
            success: false,
            error: 'Failed to rejoin class'
          };
        }

        console.log('✅ Class Service - Membership reactivated');
        return {
          success: true,
          membership: reactivatedMembership as ClassMember,
          class: classData,
          isExistingMember: true
        };
      }
    }

    // Check class capacity
    const { data: memberCount, error: countError } = await supabase
      .from('class_members')
      .select('id', { count: 'exact' })
      .eq('class_id', classData.id)
      .eq('is_active', true);

    if (countError) {
      console.error('❌ Class Service - Error checking member count:', countError);
      return {
        success: false,
        error: 'Failed to check class capacity'
      };
    }

    const currentMemberCount = memberCount?.length || 0;
    console.log('📊 Class Service - Current member count:', currentMemberCount, '/', classData.max_students);

    if (currentMemberCount >= classData.max_students) {
      return {
        success: false,
        error: 'This class is full. Please try a different class.'
      };
    }

    // Create new membership
    const { data: newMembership, error: createError } = await supabase
      .from('class_members')
      .insert({
        class_id: classData.id,
        user_id: userId,
        role: 'student',
        is_active: true
      })
      .select()
      .single();

    if (createError) {
      console.error('❌ Class Service - Error creating membership:', createError);
      return {
        success: false,
        error: 'Failed to join class. Please try again.'
      };
    }

    console.log('🎉 Class Service - Successfully joined class!');
    return {
      success: true,
      membership: newMembership as ClassMember,
      class: classData,
      isExistingMember: false
    };

  } catch (error) {
    console.error('❌ Class Service - Unexpected error during class join:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while joining the class'
    };
  }
}

/**
 * Get user's class memberships
 */
export async function getUserClasses(userId: string): Promise<Array<Class & { membership: ClassMember }>> {
  console.log('📋 Class Service - Fetching user classes:', userId);

  try {
    const { data, error } = await supabase
      .from('class_members')
      .select(`
        id,
        class_id,
        user_id,
        role,
        joined_at,
        is_active,
        classes:class_id (
          id,
          name,
          description,
          join_code,
          created_by,
          is_active,
          max_students,
          created_at,
          updated_at
        )
      `)
      .eq('user_id', userId)
      .eq('is_active', true)
      .eq('classes.is_active', true);

    if (error) {
      console.error('❌ Class Service - Error fetching user classes:', error);
      return [];
    }

    if (!data) {
      console.log('ℹ️ Class Service - No classes found for user');
      return [];
    }

    const userClasses = data
      .filter(item => item.classes) // Filter out any null classes
      .map(item => ({
        ...(item.classes as any),
        membership: {
          id: item.id,
          class_id: item.class_id,
          user_id: item.user_id,
          role: item.role,
          joined_at: item.joined_at,
          is_active: item.is_active
        } as ClassMember
      })) as Array<Class & { membership: ClassMember }>;

    console.log('✅ Class Service - Found', userClasses.length, 'classes for user');
    return userClasses;

  } catch (error) {
    console.error('❌ Class Service - Unexpected error fetching user classes:', error);
    return [];
  }
}

/**
 * Create a new class
 */
export async function createClass(options: ClassCreationOptions, creatorId: string): Promise<{
  success: boolean;
  class?: Class;
  error?: string;
}> {
  console.log('🏗️ Class Service - Creating new class:', options);

  try {
    const { data: newClass, error } = await supabase
      .from('classes')
      .insert({
        name: options.name.trim(),
        description: options.description?.trim(),
        max_students: options.maxStudents || 30,
        join_code: options.joinCode, // Will be auto-generated if not provided
        created_by: creatorId,
        is_active: true
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Class Service - Error creating class:', error);
      
      if (error.code === '23505' && error.message.includes('join_code')) {
        return {
          success: false,
          error: 'Join code already exists. Please try a different one.'
        };
      }
      
      return {
        success: false,
        error: 'Failed to create class. Please try again.'
      };
    }

    console.log('🎉 Class Service - Class created successfully:', newClass.name);
    
    // Auto-join the creator as a teacher
    await supabase
      .from('class_members')
      .insert({
        class_id: newClass.id,
        user_id: creatorId,
        role: 'teacher',
        is_active: true
      });

    return {
      success: true,
      class: newClass as Class
    };

  } catch (error) {
    console.error('❌ Class Service - Unexpected error creating class:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while creating the class'
    };
  }
}

/**
 * Leave a class
 */
export async function leaveClass(classId: string, userId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  console.log('👋 Class Service - User leaving class:', { classId, userId });

  try {
    const { error } = await supabase
      .from('class_members')
      .update({ is_active: false })
      .eq('class_id', classId)
      .eq('user_id', userId);

    if (error) {
      console.error('❌ Class Service - Error leaving class:', error);
      return {
        success: false,
        error: 'Failed to leave class. Please try again.'
      };
    }

    console.log('✅ Class Service - Successfully left class');
    return { success: true };

  } catch (error) {
    console.error('❌ Class Service - Unexpected error leaving class:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while leaving the class'
    };
  }
} 