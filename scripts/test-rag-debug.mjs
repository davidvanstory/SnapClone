/**
 * Debug RAG System
 * Test the RAG search and see what's happening
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function debugRAG() {
  console.log('🔍 Debugging RAG System');
  console.log('======================');
  
  // 1. Check what demo data exists
  console.log('\n1. Checking demo data with embeddings...');
  const { data: demoData, error: demoError } = await supabase
    .from('solo_ai_messages')
    .select(`
      id,
      content,
      role,
      chat_id,
      created_at,
      solo_ai_chats!inner(user_id)
    `)
    .eq('solo_ai_chats.user_id', '7e20cbba-83c2-4297-90a6-0ac94aabb814')
    .not('embedding', 'is', null)
    .ilike('content', '%crossflow%')
    .order('created_at');

  if (demoError) {
    console.error('❌ Error fetching demo data:', demoError);
    return;
  }

  console.log(`📊 Found ${demoData.length} Crossflow messages with embeddings:`);
  demoData.forEach((msg, index) => {
    console.log(`   ${index + 1}. [${msg.role}] "${msg.content.substring(0, 60)}..." (${msg.created_at})`);
  });

  // 2. Test the search function directly
  console.log('\n2. Testing search function directly...');
  
  // Generate a test embedding for "Crossflow Technique"
  const testQuery = "Crossflow Technique";
  console.log(`🔍 Testing search for: "${testQuery}"`);
  
  // Call Edge Function to see logs
  console.log('\n3. Calling Edge Function to trigger logs...');
  const response = await fetch(`${SUPABASE_URL}/functions/v1/get-ai-response`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: '20000000-0000-0000-0000-000000000001',
      user_id: '7e20cbba-83c2-4297-90a6-0ac94aabb814',
      user_message: testQuery
    })
  });

  const result = await response.json();
  
  console.log('\n4. Edge Function Response:');
  console.log('📊 RAG Details:', JSON.stringify(result.rag_details, null, 2));
  
  if (result.rag_details?.relevant_messages) {
    console.log('\n🎯 Relevant messages found:');
    result.rag_details.relevant_messages.forEach((msg, index) => {
      console.log(`   ${index + 1}. Similarity: ${msg.similarity.toFixed(4)} | "${msg.content.substring(0, 60)}..."`);
    });
  } else {
    console.log('❌ No relevant messages found');
  }

  console.log('\n5. Check Supabase Dashboard Function Logs for detailed similarity scores!');
  console.log('   Dashboard: https://supabase.com/dashboard/project/pexynmalkvcxlfiktjdd/functions');
}

debugRAG().catch(console.error); 