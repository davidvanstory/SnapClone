/**
 * List all users in Supabase Auth
 * 
 * This script lists all users to help debug authentication issues
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

console.log('👥 Listing all Supabase Auth users');
console.log('==================================');

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

async function listUsers() {
  try {
    console.log('📡 Fetching users from auth system...');
    
    const { data, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.error('❌ Error listing users:', error);
      return;
    }
    
    console.log(`✅ Found ${data.users.length} users:`);
    console.log('');
    
    data.users.forEach((user, index) => {
      console.log(`${index + 1}. User ID: ${user.id}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Created: ${user.created_at}`);
      console.log(`   Email confirmed: ${user.email_confirmed_at ? 'Yes' : 'No'}`);
      console.log(`   Last sign in: ${user.last_sign_in_at || 'Never'}`);
      console.log('');
    });
    
    // Look specifically for demo user
    const demoUser = data.users.find(u => u.email === 'demo@example.com');
    if (demoUser) {
      console.log('🎯 Found demo user:');
      console.log(`   ID: ${demoUser.id}`);
      console.log(`   Email: ${demoUser.email}`);
      console.log(`   Can sign in: ${demoUser.email_confirmed_at ? 'Yes' : 'No'}`);
    } else {
      console.log('❌ No demo@example.com user found');
      console.log('💡 The demo user might need to be created first');
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

listUsers()
  .then(() => {
    console.log('✅ User listing completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }); 