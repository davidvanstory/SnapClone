#!/usr/bin/env node

/**
 * Cleanup Today's Data Script
 * 
 * This script deletes all messages created today for the demo user
 * to provide a clean testing environment with only historical demo data.
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

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

async function cleanupTodayData() {
  const targetUserId = '7e20cbba-83c2-4297-90a6-0ac94aabb814';
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  console.log('🧹 Cleanup Today\'s Data');
  console.log('======================');
  console.log(`👤 Target User: ${targetUserId}`);
  console.log(`📅 Deleting messages from: ${today}`);
  console.log('');

  try {
    // First, get count of messages to delete
    const { data: messagesToDelete, error: countError } = await supabase
      .from('solo_ai_messages')
      .select('id, content, created_at, chat_id')
      .gte('created_at', `${today}T00:00:00.000Z`)
      .lt('created_at', `${today}T23:59:59.999Z`)
      .in('chat_id', [
        '20000000-0000-0000-0000-000000000001' // Main demo chat
      ]);

    if (countError) {
      console.error('❌ Error counting messages:', countError);
      return;
    }

    console.log(`📊 Found ${messagesToDelete?.length || 0} messages from today to delete`);
    
    if (!messagesToDelete || messagesToDelete.length === 0) {
      console.log('✅ No messages from today found - database is already clean');
      return;
    }

    // Show what will be deleted
    console.log('📋 Messages to delete:');
    messagesToDelete.forEach((msg, index) => {
      const preview = msg.content.substring(0, 60) + (msg.content.length > 60 ? '...' : '');
      console.log(`   ${index + 1}. ${msg.created_at} | "${preview}"`);
    });
    console.log('');

    // Delete the messages
    console.log('🗑️ Deleting messages...');
    const { error: deleteError } = await supabase
      .from('solo_ai_messages')
      .delete()
      .gte('created_at', `${today}T00:00:00.000Z`)
      .lt('created_at', `${today}T23:59:59.999Z`)
      .in('chat_id', [
        '20000000-0000-0000-0000-000000000001'
      ]);

    if (deleteError) {
      console.error('❌ Error deleting messages:', deleteError);
      return;
    }

    console.log(`✅ Successfully deleted ${messagesToDelete.length} messages from today`);
    console.log('');

    // Verify cleanup - show remaining messages
    const { data: remainingMessages, error: verifyError } = await supabase
      .from('solo_ai_messages')
      .select('id, created_at, content')
      .in('chat_id', [
        '20000000-0000-0000-0000-000000000001'
      ])
      .order('created_at', { ascending: false })
      .limit(10);

    if (verifyError) {
      console.error('❌ Error verifying cleanup:', verifyError);
      return;
    }

    console.log('🔍 Verification - Most recent remaining messages:');
    remainingMessages?.forEach((msg, index) => {
      const date = msg.created_at.split('T')[0];
      const preview = msg.content.substring(0, 60) + (msg.content.length > 60 ? '...' : '');
      console.log(`   ${index + 1}. ${date} | "${preview}"`);
    });

    console.log('');
    console.log('✅ Cleanup complete! Database now contains historical demo data plus yesterday\'s messages.');
    console.log('🎯 Ready for clean RAG testing with yesterday\'s and historical demo data.');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the cleanup
cleanupTodayData(); 