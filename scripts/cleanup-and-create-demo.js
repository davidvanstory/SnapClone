/**
 * Cleanup and Create Demo User
 * 
 * This script first removes the orphaned auth.users record created by migration,
 * then properly creates the demo user through Supabase's admin API
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

console.log('🧹 Cleanup and Create Demo User');
console.log('===============================');

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL_LOCAL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY_LOCAL;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function cleanupAndCreateDemo() {
  try {
    const demoEmail = 'demo@example.com';
    const demoPassword = 'demo123';
    const oldDemoUserId = '10000000-0000-0000-0000-000000000001';
    
    console.log('🔍 Checking current state...');
    
    // Check if user exists in GoTrue
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingUser = existingUsers.users.find(u => u.email === demoEmail);
    
    if (existingUser) {
      console.log('✅ Demo user already exists in GoTrue:', existingUser.id);
      console.log('🔐 Updating password...');
      
      const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(
        existingUser.id,
        { 
          password: demoPassword,
          email_confirm: true
        }
      );
      
      if (updateError) {
        console.error('❌ Error updating password:', updateError);
        return;
      }
      
      console.log('✅ Password updated successfully!');
      console.log('📧 Email: demo@example.com');
      console.log('🔑 Password: demo123');
      return;
    }
    
    console.log('🧹 Cleaning up orphaned database records...');
    
    // Remove orphaned record from auth.users table using raw SQL
    const { data: deleteData, error: deleteError } = await supabase.rpc('exec_sql', {
      query: `DELETE FROM auth.users WHERE id = $1 AND email = $2`,
      params: [oldDemoUserId, demoEmail]
    });
    
    if (deleteError) {
      console.log('⚠️  Could not delete orphaned record (may not exist):', deleteError.message);
    } else {
      console.log('✅ Cleaned up orphaned database records');
    }
    
    console.log('👤 Creating demo user through proper API...');
    
    // Now create the user properly
    const { data: createData, error: createError } = await supabase.auth.admin.createUser({
      email: demoEmail,
      password: demoPassword,
      email_confirm: true,
      user_metadata: {
        username: 'demo_artist'
      }
    });
    
    if (createError) {
      console.error('❌ Error creating user:', createError);
      
      // If it still fails, let's try a different approach
      console.log('🔄 Trying alternative approach...');
      console.log('💡 You can create the user manually:');
      console.log('1. Go to Supabase Dashboard > Authentication > Users');
      console.log('2. Click "Add User"');
      console.log('3. Email: demo@example.com');
      console.log('4. Password: demo123');
      console.log('5. Check "Auto Confirm User"');
      console.log('6. Click "Create User"');
      return;
    }
    
    const newUserId = createData.user.id;
    
    console.log('✅ Demo user created successfully!');
    console.log('📧 Email: demo@example.com');
    console.log('🔑 Password: demo123');
    console.log('🆔 New User ID:', newUserId);
    
    // Create user profile
    console.log('👤 Creating user profile...');
    
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .upsert({
        id: newUserId,
        email: demoEmail,
        username: 'demo_artist',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
      
    if (profileError) {
      console.error('❌ Error creating profile:', profileError);
    } else {
      console.log('✅ User profile created successfully!');
    }
    
    // Update RAG data to point to the new user ID
    console.log('🔄 Updating RAG demo data...');
    
    try {
      const { error: chatsError } = await supabase
        .from('solo_ai_chats')
        .update({ user_id: newUserId })
        .eq('user_id', oldDemoUserId);
        
      if (chatsError) {
        console.error('⚠️  Error updating solo_ai_chats:', chatsError);
      } else {
        console.log('✅ Updated RAG data to use new user ID');
      }
    } catch (updateError) {
      console.error('⚠️  Error updating RAG data:', updateError);
    }
    
    console.log('');
    console.log('🎉 Demo user is ready!');
    console.log('📊 You should now have access to:');
    console.log('- Solo AI chat: "Hand Drawing Fundamentals"');
    console.log('- Solo AI chat: "Color Theory Deep Dive"');
    console.log('- 5 conversations with pre-computed embeddings');
    console.log('- Full RAG functionality for semantic search');
    console.log('');
    console.log('🔍 Try logging in now with:');
    console.log('   Email: demo@example.com');
    console.log('   Password: demo123');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    console.log('');
    console.log('💡 Manual fallback:');
    console.log('1. Go to Supabase Dashboard > Authentication > Users');
    console.log('2. Click "Add User"');
    console.log('3. Email: demo@example.com, Password: demo123');
    console.log('4. Check "Auto Confirm User"');
    console.log('5. Create the user, then note the new User ID');
    console.log('6. Update solo_ai_chats table to use the new User ID');
  }
}

cleanupAndCreateDemo()
  .then(() => {
    console.log('✅ Script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }); 