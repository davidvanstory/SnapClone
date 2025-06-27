/**
 * Create Demo User Properly
 * 
 * This script creates the demo user through Supabase's admin API
 * which properly integrates with GoTrue authentication system
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

console.log('🎨 Creating Demo User for RAG Testing');
console.log('====================================');

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

async function createDemoUser() {
  try {
    const demoEmail = 'demo@example.com';
    const demoPassword = 'demo123';
    const oldDemoUserId = '10000000-0000-0000-0000-000000000001';
    
    console.log('🔍 Checking if demo user already exists...');
    
    // Check if user exists first
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingUser = existingUsers.users.find(u => u.email === demoEmail);
    
    if (existingUser) {
      console.log('✅ Demo user already exists:', existingUser.id);
      console.log('🔐 Updating password...');
      
      // Update existing user's password
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
    
    console.log('👤 Creating new demo user (without custom ID)...');
    
    // Create new user without specifying ID to avoid conflicts
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
      return;
    }
    
    const newUserId = createData.user.id;
    
    console.log('✅ Demo user created successfully!');
    console.log('📧 Email: demo@example.com');
    console.log('🔑 Password: demo123');
    console.log('🆔 New User ID:', newUserId);
    
    // Now create the corresponding profile in the users table
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
      console.log('⚠️  User created but profile creation failed - login may still work');
    } else {
      console.log('✅ User profile created successfully!');
    }
    
    // Update RAG data to point to the new user ID
    console.log('🔄 Updating RAG demo data to use new user ID...');
    
    try {
      // Update solo_ai_chats
      const { error: chatsError } = await supabase
        .from('solo_ai_chats')
        .update({ user_id: newUserId })
        .eq('user_id', oldDemoUserId);
        
      if (chatsError) {
        console.error('⚠️  Error updating solo_ai_chats:', chatsError);
      } else {
        console.log('✅ Updated solo_ai_chats to use new user ID');
      }
      
      // Update any other tables that reference the old user ID
      // Add more updates here if needed for other tables
      
    } catch (updateError) {
      console.error('⚠️  Error updating RAG data:', updateError);
      console.log('💡 You may need to manually update the RAG data user IDs');
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
  }
}

createDemoUser()
  .then(() => {
    console.log('✅ Script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }); 