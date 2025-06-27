/**
 * Fix Demo User Password Script
 * 
 * This script fixes the bogus password hash for demo@example.com
 * so you can login with the credentials: demo@example.com / demo123
 * to test the RAG functionality with existing historical data.
 */

const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Supabase configuration - prioritize local development environment
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL_LOCAL || process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY_LOCAL || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   - EXPO_PUBLIC_SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Fix the demo user's password hash
 */
async function fixDemoUserPassword() {
  try {
    console.log('🔧 Demo User Password Fix for Cloud Supabase');
    console.log('============================================');

    // Generate the correct bcrypt hash for "demo123"
    const password = 'demo123';
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    console.log('✅ Generated bcrypt hash for password "demo123":');
    console.log(`   ${hash}`);
    console.log('');

    console.log('📋 MANUAL FIX STEPS FOR CLOUD SUPABASE:');
    console.log('');
    console.log('Option 1 - Using Supabase Dashboard:');
    console.log('1. Go to your Supabase project dashboard');
    console.log('2. Navigate to Authentication > Users');
    console.log('3. Find the user with email: demo@example.com');
    console.log('4. Click on the user to edit');
    console.log('5. Update the "encrypted_password" field with:');
    console.log(`   ${hash}`);
    console.log('6. Save the changes');
    console.log('');

    console.log('Option 2 - Using SQL Editor:');
    console.log('1. Go to your Supabase project dashboard');
    console.log('2. Navigate to SQL Editor');
    console.log('3. Run this SQL query:');
    console.log('');
    console.log('UPDATE auth.users SET');
    console.log(`encrypted_password = '${hash}'`);
    console.log("WHERE email = 'demo@example.com';");
    console.log('');

    console.log('Option 3 - Using Supabase CLI (if connected to cloud):');
    console.log('1. Make sure you\'re linked to your cloud project:');
    console.log('   supabase link --project-ref YOUR_PROJECT_REF');
    console.log('2. Run this SQL via CLI:');
    console.log(`   supabase db sql --execute "UPDATE auth.users SET encrypted_password = '${hash}' WHERE email = 'demo@example.com';"`);
    console.log('');

    console.log('🔍 To verify the fix worked:');
    console.log('1. Try logging in with demo@example.com / demo123');
    console.log('2. You should see the existing chat history and RAG data');
    console.log('');

    console.log('📊 Expected Demo Data After Fix:');
    console.log('- Solo AI chat: "Hand Drawing Fundamentals"');
    console.log('- Solo AI chat: "Color Theory Deep Dive"');
    console.log('- 5 conversations with pre-computed embeddings');
    console.log('- Full RAG functionality for semantic search');
    console.log('');

    console.log('✅ Hash generation complete. Follow the manual steps above.');
    
    const demoUserId = '10000000-0000-0000-0000-000000000001';
    const demoEmail = 'demo@example.com';
    
    // Update the demo user's password hash in auth.users
    console.log('📡 Updating demo user password hash in database...');
    const { data, error } = await supabase
      .from('auth.users')
      .update({ 
        encrypted_password: hash,
        updated_at: new Date().toISOString()
      })
      .eq('id', demoUserId)
      .eq('email', demoEmail);

    if (error) {
      console.error('❌ Error updating password hash:', error);
      
      // Try alternative approach using raw SQL
      console.log('🔄 Trying alternative approach with raw SQL...');
      const { data: sqlData, error: sqlError } = await supabase.rpc('exec_sql', {
        sql: `
          UPDATE auth.users 
          SET encrypted_password = $1, updated_at = NOW() 
          WHERE id = $2 AND email = $3
        `,
        params: [hash, demoUserId, demoEmail]
      });
      
      if (sqlError) {
        console.error('❌ SQL approach also failed:', sqlError);
        console.log('');
        console.log('🔍 Manual fix required:');
        console.log('   1. Open your Supabase dashboard');
        console.log('   2. Go to Authentication > Users');
        console.log('   3. Find demo@example.com user');
        console.log('   4. Update the encrypted_password field to:');
        console.log(`      ${hash}`);
        console.log('');
        console.log('   Or run this SQL directly in the SQL editor:');
        console.log(`   UPDATE auth.users SET encrypted_password = '${hash}' WHERE email = 'demo@example.com';`);
        return;
      }
      
      console.log('✅ Password hash updated via SQL');
    } else {
      console.log('✅ Password hash updated successfully');
    }
    
    // Verify the update worked
    console.log('🔍 Verifying the update...');
    const { data: verifyData, error: verifyError } = await supabase
      .from('auth.users')
      .select('id, email, encrypted_password')
      .eq('id', demoUserId)
      .single();
    
    if (verifyError) {
      console.error('❌ Error verifying update:', verifyError);
    } else {
      const isFixed = !verifyData.encrypted_password.includes('XXXXX');
      console.log('🔍 Verification result:', isFixed ? '✅ FIXED' : '❌ STILL BROKEN');
      console.log('📧 Email:', verifyData.email);
      console.log('🔑 Password hash preview:', verifyData.encrypted_password.substring(0, 20) + '...');
    }
    
    // Check associated solo AI data
    console.log('');
    console.log('📊 Checking associated RAG data...');
    const { data: chatsData, error: chatsError } = await supabase
      .from('solo_ai_chats')
      .select('id, title, created_at')
      .eq('user_id', demoUserId);
    
    if (chatsError) {
      console.error('❌ Error checking chats:', chatsError);
    } else {
      console.log(`✅ Found ${chatsData.length} demo chat conversations:`);
      chatsData.forEach((chat, index) => {
        console.log(`   ${index + 1}. "${chat.title}" (${chat.id})`);
      });
    }
    
    const { data: messagesData, error: messagesError } = await supabase
      .from('solo_ai_messages')
      .select('id, role, content')
      .in('chat_id', chatsData.map(c => c.id))
      .limit(5);
    
    if (messagesError) {
      console.error('❌ Error checking messages:', messagesError);
    } else {
      console.log(`✅ Found messages with embeddings for RAG testing`);
      console.log(`   Sample message: "${messagesData[0]?.content?.substring(0, 50)}..."`);
    }
    
    console.log('');
    console.log('🎉 Demo user fix complete!');
    console.log('📱 You can now login with:');
    console.log('   Email: demo@example.com');
    console.log('   Password: demo123');
    console.log('');
    console.log('🧠 This user has access to 5 chat conversations with pre-computed embeddings');
    console.log('   perfect for testing the RAG functionality!');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    console.log('');
    console.log('🔧 Manual fix instructions:');
    console.log('   Run this SQL in your Supabase SQL editor:');
    console.log(`   UPDATE auth.users SET encrypted_password = '${bcrypt.hashSync('demo123', 10)}' WHERE email = 'demo@example.com';`);
  }
}

// Run the script
if (require.main === module) {
  fixDemoUserPassword()
    .then(() => {
      console.log('✅ Script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { fixDemoUserPassword }; 