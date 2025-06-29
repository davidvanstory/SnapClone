/**
 * Generate Embeddings for Existing Messages
 * 
 * This script finds messages without embeddings for a specific user and generates them.
 * SAFETY: Only targets user 7e20cbba-83c2-4297-90a6-0ac94aabb814
 * 
 * Usage: OPENAI_API_KEY=your_key node scripts/generate-embeddings-for-existing.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables
config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// SAFETY: Hardcoded target user ID to prevent accidents
const TARGET_USER_ID = '7e20cbba-83c2-4297-90a6-0ac94aabb814';

if (!OPENAI_API_KEY) {
  console.error('❌ Missing OPENAI_API_KEY environment variable');
  process.exit(1);
}

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

/**
 * Generate embedding using OpenAI text-embedding-3-large
 */
async function generateEmbedding(text) {
  console.log(`📊 Generating embedding for text (${text.length} chars)...`);
  console.log('🔄 Using text-embedding-3-large model (3072 dimensions)');
  
  try {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-large',
        input: text,
        encoding_format: 'float',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const embedding = data.data[0].embedding;
    
    console.log(`✅ Generated embedding (dimension: ${embedding.length})`);
    if (embedding.length !== 3072) {
      console.warn('⚠️ Unexpected embedding dimension:', embedding.length, 'expected 3072');
    }
    return embedding;
  } catch (error) {
    console.error('❌ Embedding generation failed:', error);
    throw error;
  }
}

/**
 * Generate embeddings for existing messages without embeddings
 */
async function generateEmbeddingsForExisting() {
  console.log('🚀 Generating Embeddings for Existing Messages');
  console.log('===============================================');
  console.log(`🎯 Target User: ${TARGET_USER_ID}`);
  console.log('🔍 Finding messages without embeddings...');
  console.log('');

  try {
    // Find messages without embeddings for the target user
    const { data: messagesWithoutEmbeddings, error: fetchError } = await supabase
      .from('solo_ai_messages')
      .select(`
        id,
        chat_id,
        content,
        role,
        created_at,
        solo_ai_chats!inner(user_id)
      `)
      .eq('solo_ai_chats.user_id', TARGET_USER_ID)
      .is('embedding', null)
      .order('created_at', { ascending: true });

    if (fetchError) {
      console.error('❌ Error fetching messages:', fetchError);
      return;
    }

    if (!messagesWithoutEmbeddings || messagesWithoutEmbeddings.length === 0) {
      console.log('✅ All messages for this user already have embeddings!');
      return;
    }

    console.log(`📋 Found ${messagesWithoutEmbeddings.length} messages without embeddings`);
    console.log('');

    // Process each message
    for (const [index, message] of messagesWithoutEmbeddings.entries()) {
      console.log(`📝 Processing message ${index + 1}/${messagesWithoutEmbeddings.length}`);
      console.log(`   ID: ${message.id}`);
      console.log(`   Role: ${message.role}`);
      console.log(`   Content: "${message.content.substring(0, 60)}${message.content.length > 60 ? '...' : ''}"`);
      console.log(`   Created: ${message.created_at}`);
      
      try {
        // Generate embedding
        const embedding = await generateEmbedding(message.content);
        
        // Update the message with the embedding
        const { error: updateError } = await supabase
          .from('solo_ai_messages')
          .update({ embedding: embedding })
          .eq('id', message.id);

        if (updateError) {
          console.error(`   ❌ Error updating message ${message.id}:`, updateError);
          continue;
        }
        
        console.log(`   ✅ Embedding saved for message ${message.id}`);
        console.log('');
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.error(`   ❌ Failed to process message ${message.id}:`, error);
        console.log('');
        continue;
      }
    }

    // Verification
    console.log('🔍 Verifying embeddings...');
    const { data: verifyData, error: verifyError } = await supabase
      .from('solo_ai_messages')
      .select(`
        id,
        content,
        embedding,
        solo_ai_chats!inner(user_id, title)
      `)
      .eq('solo_ai_chats.user_id', TARGET_USER_ID)
      .order('created_at', { ascending: false });

    if (verifyError) {
      console.error('❌ Verification failed:', verifyError);
      return;
    }

    const totalMessages = verifyData.length;
    const messagesWithEmbeddings = verifyData.filter(msg => msg.embedding !== null).length;
    const remainingWithoutEmbeddings = totalMessages - messagesWithEmbeddings;

    console.log(`📊 Embedding Status for User ${TARGET_USER_ID}:`);
    console.log(`   Total messages: ${totalMessages}`);
    console.log(`   With embeddings: ${messagesWithEmbeddings} ✅`);
    console.log(`   Without embeddings: ${remainingWithoutEmbeddings} ${remainingWithoutEmbeddings === 0 ? '✅' : '❌'}`);
    console.log('');

    if (remainingWithoutEmbeddings === 0) {
      console.log('🎉 All messages now have embeddings!');
      console.log('');
      console.log('🧪 Ready to test RAG system:');
      console.log('1. Ask about "Crossflow Technique" or "Emma drawings"');
      console.log('2. Check for RAG details in response logs');
      console.log('3. Verify historical messages are found');
    } else {
      console.log(`⚠️  ${remainingWithoutEmbeddings} messages still need embeddings`);
    }

    console.log('');
    console.log('📊 Dashboard: https://supabase.com/dashboard/project/pexynmalkvcxlfiktjdd/editor');

  } catch (error) {
    console.error('❌ Process failed:', error);
  }
}

// Run the embedding generation
generateEmbeddingsForExisting();

export { generateEmbedding, generateEmbeddingsForExisting };
