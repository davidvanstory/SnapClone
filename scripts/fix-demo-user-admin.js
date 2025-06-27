/**
 * Fix Demo User Password using Supabase Admin API
 * 
 * This script uses Supabase's admin updateUserById function to properly
 * reset the demo user's password, which bypasses the encrypted_password
 * field and uses Supabase's proper authentication system.
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

console.log('🔧 Demo User Admin Password Reset');
console.log('=================================');

// We need the service role key for admin operations
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL_LOCAL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY_LOCAL;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   - EXPO_PUBLIC_SUPABASE_URL (or EXPO_PUBLIC_SUPABASE_URL_LOCAL)');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_ROLE_KEY_LOCAL)');
  console.error('');
  console.error('💡 You need the service role key from your Supabase project settings');
  console.error('   Go to: Settings > API > Project API keys > service_role');
  process.exit(1);
}

// Create admin client with service role
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function fixDemoUserWithAdmin() {
  try {
    const demoUserId = '10000000-0000-0000-0000-000000000001';
    const demoEmail = 'demo@example.com';
    const newPassword = 'demo123';

    console.log('🔍 Looking for demo user...');
    
    // First, let's check if the user exists
    const { data: { user }, error: getUserError } = await supabase.auth.admin.getUserById(demoUserId);
    
    if (getUserError) {
      console.error('❌ Error finding demo user:', getUserError);
      return;
    }
    
    if (!user) {
      console.error('❌ Demo user not found with ID:', demoUserId);
      return;
    }
    
    console.log('✅ Found demo user:', user.email);
    
    // Update the user's password using admin API
    console.log('🔐 Updating password using admin API...');
    
    const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(
      demoUserId,
      { 
        password: newPassword,
        email_confirm: true // Ensure email is confirmed
      }
    );
    
    if (updateError) {
      console.error('❌ Error updating password:', updateError);
      return;
    }
    
    console.log('✅ Password updated successfully!');
    console.log('');
    console.log('🎉 Demo user is now ready!');
    console.log('📧 Email: demo@example.com');
    console.log('🔑 Password: demo123');
    console.log('');
    console.log('📊 You should now have access to:');
    console.log('- Solo AI chat: "Hand Drawing Fundamentals"');
    console.log('- Solo AI chat: "Color Theory Deep Dive"');
    console.log('- 5 conversations with pre-computed embeddings');
    console.log('- Full RAG functionality for semantic search');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    console.log('');
    console.log('💡 Make sure you have the correct SUPABASE_SERVICE_ROLE_KEY');
    console.log('   This should be the "service_role" key, not the "anon" key');
  }
}

// Run the fix
fixDemoUserWithAdmin()
  .then(() => {
    console.log('✅ Script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }); 