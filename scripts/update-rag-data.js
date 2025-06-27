/**
 * Update RAG Demo Data to Use Existing User
 * 
 * This script updates the RAG demo data to use an existing user ID
 * so you can test the RAG functionality with the existing chat history
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

console.log('🔄 Updating RAG Demo Data');
console.log('=========================');

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

async function updateRagData() {
  try {
    // User details provided
    const existingEmail = 'hello@example.com';
    const existingUserId = '7e20cbba-83c2-4297-90a6-0ac94aabb814';
    const oldDemoUserId = '10000000-0000-0000-0000-000000000001';
    
    console.log('🔍 Verifying user exists...');
    console.log(`   Email: ${existingEmail}`);
    console.log(`   User ID: ${existingUserId}`);
    
    // Verify the user exists in auth
    const { data: { user }, error: getUserError } = await supabase.auth.admin.getUserById(existingUserId);
    
    if (getUserError || !user) {
      console.error('❌ User not found in auth system:', getUserError);
      return;
    }
    
    console.log('✅ User found in auth system');
    
    // Check if user has a profile
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', existingUserId)
      .single();
    
    if (profileError && profileError.code === 'PGRST116') {
      console.log('👤 Creating user profile...');
      
      const { data: newProfile, error: createProfileError } = await supabase
        .from('users')
        .insert({
          id: existingUserId,
          email: existingEmail,
          username: 'demo_user',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
        
      if (createProfileError) {
        console.error('❌ Error creating profile:', createProfileError);
        return;
      }
      
      console.log('✅ User profile created');
    } else if (profileError) {
      console.error('❌ Error checking profile:', profileError);
      return;
    } else {
      console.log('✅ User profile already exists');
    }
    
    // Update RAG demo data
    console.log('🔄 Updating RAG demo data to use this user...');
    
    // Update solo_ai_chats
    const { data: chatsData, error: chatsError } = await supabase
      .from('solo_ai_chats')
      .update({ user_id: existingUserId })
      .eq('user_id', oldDemoUserId)
      .select();
    
    if (chatsError) {
      console.error('❌ Error updating solo_ai_chats:', chatsError);
      return;
    }
    
    console.log(`✅ Updated ${chatsData.length} chat conversations`);
    
    // Check what chats we have
    const { data: allChats, error: allChatsError } = await supabase
      .from('solo_ai_chats')
      .select('id, title, created_at')
      .eq('user_id', existingUserId);
    
    if (allChatsError) {
      console.error('❌ Error fetching chats:', allChatsError);
    } else {
      console.log('📊 Available chat conversations:');
      allChats.forEach((chat, index) => {
        console.log(`   ${index + 1}. ${chat.title} (${chat.id})`);
      });
    }
    
    // Check messages count
    const { data: messagesCount, error: messagesError } = await supabase
      .from('solo_ai_messages')
      .select('id', { count: 'exact' })
      .in('chat_id', allChats.map(c => c.id));
    
    if (!messagesError) {
      console.log(`📝 Total messages with embeddings: ${messagesCount.length}`);
    }
    
    console.log('');
    console.log('🎉 RAG Demo Data Updated Successfully!');
    console.log('');
    console.log('🔍 You can now login with:');
    console.log(`   Email: ${existingEmail}`);
    console.log('   Password: 123456');
    console.log('');
    console.log('📊 You should have access to:');
    console.log('- Solo AI chat: "Hand Drawing Fundamentals"');
    console.log('- Solo AI chat: "Color Theory Deep Dive"');
    console.log('- Pre-computed embeddings for RAG functionality');
    console.log('- Semantic search capabilities');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

updateRagData()
  .then(() => {
    console.log('✅ Script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }); 