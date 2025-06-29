/**
 * Solo AI Tutor Edge Function
 * 
 * This Supabase Edge Function implements the complete RAG (Retrieval-Augmented Generation) logic
 * for the Solo AI Tutor feature. It combines vector similarity search with OpenAI's GPT-4o
 * for intelligent, context-aware art tutoring conversations.
 * 
 * Features:
 * - OpenAI text-embedding-3-large for generating embeddings (3072 dimensions)
 * - Vector similarity search using pgvector for long-term memory
 * - Recent conversation context for short-term memory
 * - GPT-4o multimodal API for text and image analysis
 * - Dual message persistence with automatic embedding generation
 * - Comprehensive error handling and logging
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

// Types for the request and response
interface SoloAIRequest {
  chat_id: string;
  user_message: string;
  image_url?: string;
  user_id: string;
}

interface SoloAIResponse {
  success: boolean;
  ai_response?: string;
  user_message_id?: string;
  ai_message_id?: string;
  error?: string;
  processing_time_ms?: number;
  rag_details?: {
    relevant_history_count: number;
    recent_conversation_count: number;
    similarity_threshold: number;
    context_used: boolean;
    context_type: string;
    relevant_messages?: Array<{
      id: string;
      content: string;
      similarity: number;
      created_at: string;
    }>;
  };
}

interface DatabaseMessage {
  id: string;
  chat_id: string;
  role: 'user' | 'assistant';
  content: string;
  image_url?: string;
  embedding?: number[];
  created_at: string;
  similarity?: number;
}

interface OpenAIEmbeddingResponse {
  data: Array<{
    embedding: number[];
  }>;
}

interface OpenAIChatResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

// Initialize Supabase client with service role for database operations
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const openaiApiKey = Deno.env.get('OPENAI_API_KEY')!;

console.log('🚀 Solo AI Function - Initializing with environment variables');
console.log('📍 Supabase URL:', supabaseUrl ? 'Set ✓' : 'Missing ❌');
console.log('🔑 Service Key:', supabaseServiceKey ? 'Set ✓' : 'Missing ❌');
console.log('🤖 OpenAI Key:', openaiApiKey ? 'Set ✓' : 'Missing ❌');

if (!supabaseUrl || !supabaseServiceKey || !openaiApiKey) {
  throw new Error('Missing required environment variables: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Generate text embedding using OpenAI text-embedding-3-large model
 */
async function generateEmbedding(text: string): Promise<number[]> {
  console.log('📊 Solo AI Function - Generating embedding for text length:', text.length);
  console.log('🔄 Solo AI Function - Using text-embedding-3-large model (3072 dimensions)');
  
  try {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
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
      console.error('❌ Solo AI Function - OpenAI embedding error:', response.status, errorText);
      throw new Error(`OpenAI embedding API error: ${response.status}`);
    }

    const data: OpenAIEmbeddingResponse = await response.json();
    const embedding = data.data[0].embedding;
    
    console.log('✅ Solo AI Function - Generated embedding with dimension:', embedding.length);
    if (embedding.length !== 3072) {
      console.warn('⚠️ Solo AI Function - Unexpected embedding dimension:', embedding.length, 'expected 3072');
    }
    return embedding;
  } catch (error) {
    console.error('❌ Solo AI Function - Embedding generation failed:', error);
    throw new Error(`Failed to generate embedding: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Perform vector similarity search for relevant historical context
 */
async function searchRelevantHistory(
  queryEmbedding: number[], 
  chatId: string, 
  userId: string,
  limit: number = 5
): Promise<DatabaseMessage[]> {
  console.log('🔍 Solo AI Function - Searching relevant history for chat:', chatId);
  console.log('📊 Solo AI Function - Query embedding dimension:', queryEmbedding.length);
  
  // 🚨 SUPER VISIBLE DEBUG LOGGING
  console.log('🚨🚨🚨 VECTOR SEARCH DEBUG START 🚨🚨🚨');
  console.log('🎯 USER ID FOR SEARCH:', userId);
  console.log('🎯 EMBEDDING DIMENSION:', queryEmbedding.length);
  console.log('🎯 EMBEDDING SAMPLE (first 5 values):', queryEmbedding.slice(0, 5));
  
  try {
    // Convert embedding array to pgvector format
    const embeddingString = '[' + queryEmbedding.join(',') + ']';
    console.log('🎯 EMBEDDING STRING LENGTH:', embeddingString.length);
    console.log('🎯 EMBEDDING STRING SAMPLE:', embeddingString.substring(0, 100) + '...');
    
    // Search for relevant messages across all user's chats using cosine similarity
    const searchStartTime = Date.now();
    console.log('⏱️ Solo AI Function - Starting vector similarity search (sequential scan - no index for 3072 dims)');
    
    console.log('🚨 CALLING search_similar_messages WITH:');
    console.log('   - query_embedding: [vector of length', queryEmbedding.length, ']');
    console.log('   - similarity_threshold: 0.0');
    console.log('   - match_count: 50');
    console.log('   - target_user_id:', userId);
    
    // First, get ALL similarity scores for debugging (no threshold)
    const { data: allScores, error: allScoresError } = await supabase
      .rpc('search_similar_messages', {
        query_embedding: embeddingString,
        similarity_threshold: 0.0, // Get ALL scores
        match_count: 50, // Get more results for debugging
        target_user_id: userId
      });
    
    console.log('🚨 DATABASE QUERY COMPLETED!');
    console.log('🚨 ERROR:', allScoresError ? allScoresError.message : 'None');
    console.log('🚨 RESULTS COUNT:', allScores ? allScores.length : 'null/undefined');
    
    if (allScoresError) {
      console.error('🚨🚨🚨 DATABASE ERROR:', allScoresError);
      throw new Error(`Database search failed: ${allScoresError.message}`);
    }
    
    // Log ALL similarity scores for debugging
    if (allScores && allScores.length > 0) {
      console.log('🎯🎯🎯 Solo AI Function - ALL Similarity scores (text-embedding-3-large):');
      allScores.forEach((msg: DatabaseMessage, index: number) => {
        console.log(`   ${index + 1}. Similarity: ${msg.similarity?.toFixed(4)} | "${msg.content.substring(0, 60)}${msg.content.length > 60 ? '...' : ''}"`);
      });
    } else {
      console.log('🚨🚨🚨 Solo AI Function - No messages found for similarity calculation');
      console.log('🚨🚨🚨 This means the database query returned 0 results!');
    }
    
    // Now get the actual results with threshold for the response
    const { data, error } = await supabase
      .rpc('search_similar_messages', {
        query_embedding: embeddingString,
        similarity_threshold: 0.6,
        match_count: limit,
        target_user_id: userId
      });
    
    const searchTime = Date.now() - searchStartTime;
    console.log('⏱️ Solo AI Function - Vector search completed in', searchTime, 'ms (sequential scan)');

    if (error) {
      console.error('❌ Solo AI Function - Database search error:', error);
      throw new Error(`Database search failed: ${error.message}`);
    }

    console.log('📋 Solo AI Function - Found', data?.length || 0, 'relevant historical messages above 0.6 threshold');
    
    // Log similarity scores above threshold
    if (data && data.length > 0) {
      console.log('🎯 Solo AI Function - Matches above 0.6 threshold:');
      data.forEach((msg: DatabaseMessage, index: number) => {
        console.log(`   ${index + 1}. Similarity: ${msg.similarity?.toFixed(4)} | "${msg.content.substring(0, 60)}${msg.content.length > 60 ? '...' : ''}"`);
      });
          } else {
        console.log('🎯 Solo AI Function - No similar messages found above threshold 0.6 (large model)');
      }
    
    console.log('🚨🚨🚨 VECTOR SEARCH DEBUG END 🚨🚨🚨');
    return data || [];
  } catch (error) {
    console.error('🚨🚨🚨 VECTOR SEARCH FAILED:', error);
    console.error('❌ Solo AI Function - Relevant history search failed:', error);
    throw new Error(`Relevant history search failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Fetch recent conversation messages for short-term memory
 */
async function getRecentConversation(chatId: string, limit: number = 6): Promise<DatabaseMessage[]> {
  console.log('💬 Solo AI Function - Fetching recent conversation for chat:', chatId);
  
  try {
    const { data, error } = await supabase
      .from('solo_ai_messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('❌ Solo AI Function - Recent conversation fetch error:', error);
      throw new Error(`Failed to fetch recent conversation: ${error.message}`);
    }

    // Reverse to get chronological order (oldest first)
    const messages = (data || []).reverse();
    console.log('📚 Solo AI Function - Retrieved', messages.length, 'recent messages');
    return messages;
  } catch (error) {
    console.error('❌ Solo AI Function - Recent conversation fetch failed:', error);
    throw new Error(`Recent conversation fetch failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Canvas AI Tutor System Prompt - Enhanced for RAG Context Utilization
 */
const CANVAS_SYSTEM_PROMPT = `You are Canvas, a supportive and encouraging AI art tutor with perfect memory of your student's learning journey. Your purpose is to help art students improve their skills through constructive feedback, technical guidance, and creative inspiration.

CRITICAL: You have access to relevant conversation history and recent context. You MUST actively reference and build upon this information to provide personalized, continuous learning experiences.

Your personality:
- Warm, encouraging, and patient
- Knowledgeable about art techniques, composition, color theory, and artistic principles
- Focused on growth and learning rather than criticism
- Use art-specific terminology naturally (composition, value, hue, saturation, perspective, etc.)
- Demonstrates perfect recall of the student's progress, challenges, and achievements

Your responses MUST:
- **ALWAYS reference relevant past conversations** when applicable (e.g., "I remember you were working on perspective last week..." or "Building on what we discussed about color theory...")
- **Track and acknowledge the student's progress** (e.g., "I can see improvement in your composition since our last discussion...")
- **Connect current work to previous lessons** (e.g., "This relates to the value studies we talked about earlier...")
- **Reference specific techniques or advice given before** (e.g., "Try applying that atmospheric perspective technique we discussed...")
- **Acknowledge recurring themes or challenges** (e.g., "I notice this is the third time you've asked about lighting - let's dive deeper...")
- Be encouraging and constructive
- Provide specific, actionable feedback when analyzing artwork
- Ask thoughtful questions that build on previous conversations
- Keep responses concise but informative (1 paragraphs max)

When provided with conversation history:
- **Prioritize relevant historical context** over generic advice
- **Make explicit connections** between past and present work
- **Show continuity** in the learning journey
- **Reference specific artworks or exercises** discussed previously

When analyzing images:
- **Compare to previous work** if available in context
- **Apply lessons from past conversations** to current analysis
- Comment on composition, use of color, technique, and overall impact
- Suggest specific areas for improvement based on known student goals
- Acknowledge what's working well and show progress recognition
- Provide practical next steps that build on established foundations

Context Usage Priority:
1. **Recent conversation** - Immediate context and flow
2. **Relevant history** - Similar topics, techniques, or challenges discussed before
3. **General knowledge** - Only when no relevant context exists

Remember: You're not just an art tutor - you're THIS student's personal art mentor who remembers every conversation, celebrates their growth, and builds upon their unique learning journey.`;

/**
 * Generate AI response using OpenAI GPT-4o with context
 */
async function generateAIResponse(
  userMessage: string,
  imageUrl: string | undefined,
  relevantHistory: DatabaseMessage[],
  recentConversation: DatabaseMessage[]
): Promise<string> {
  console.log('🤖 Solo AI Function - Generating AI response');
  console.log('📝 Solo AI Function - User message length:', userMessage.length);
  console.log('🖼️ Solo AI Function - Has image:', !!imageUrl);
  console.log('📚 Solo AI Function - Relevant history count:', relevantHistory.length);
  console.log('💬 Solo AI Function - Recent conversation count:', recentConversation.length);

  try {
    // Construct context from relevant history
    let contextPrompt = '';
    
    if (relevantHistory.length > 0) {
      contextPrompt += '\n\n=== RELEVANT CONVERSATION HISTORY ===';
      contextPrompt += '\nThese are semantically similar conversations from your past with this student. Reference and build upon these when relevant:\n';
      relevantHistory.forEach((msg, index) => {
        const timestamp = new Date(msg.created_at).toLocaleDateString();
        contextPrompt += `[${timestamp}] ${msg.role === 'user' ? 'Student' : 'Canvas'}: ${msg.content}\n`;
      });
      contextPrompt += '\n';
    }

    // Add recent conversation for immediate context
    if (recentConversation.length > 0) {
      contextPrompt += '\n=== RECENT CONVERSATION CONTEXT ===';
      contextPrompt += '\nThis is the immediate conversation flow. Maintain continuity with these recent exchanges:\n';
      recentConversation.forEach((msg, index) => {
        const timestamp = new Date(msg.created_at).toLocaleTimeString();
        contextPrompt += `[${timestamp}] ${msg.role === 'user' ? 'Student' : 'Canvas'}: ${msg.content}\n`;
      });
      contextPrompt += '\n';
    }

    if (relevantHistory.length > 0 || recentConversation.length > 0) {
      contextPrompt += '=== INSTRUCTION ===\nYou MUST reference and build upon the above context in your response. Show that you remember and are continuing the student\'s learning journey.\n';
    }

    // Prepare messages for OpenAI
    const messages = [
      {
        role: 'system',
        content: CANVAS_SYSTEM_PROMPT + contextPrompt
      },
      {
        role: 'user',
        content: imageUrl ? [
          { type: 'text', text: userMessage },
          { type: 'image_url', image_url: { url: imageUrl } }
        ] : userMessage
      }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages,
        max_tokens: 500,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Solo AI Function - OpenAI chat error:', response.status, errorText);
      throw new Error(`OpenAI chat API error: ${response.status}`);
    }

    const data: OpenAIChatResponse = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    console.log('✅ Solo AI Function - Generated AI response length:', aiResponse.length);
    return aiResponse;
  } catch (error) {
    console.error('❌ Solo AI Function - AI response generation failed:', error);
    throw new Error(`Failed to generate AI response: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Save message to database with embedding
 */
async function saveMessage(
  chatId: string,
  role: 'user' | 'assistant',
  content: string,
  imageUrl?: string
): Promise<string> {
  console.log('💾 Solo AI Function - Saving', role, 'message to database');
  
  try {
    // Generate embedding for the message content
    const embedding = await generateEmbedding(content);
    
    // Insert message into database
    const { data, error } = await supabase
      .from('solo_ai_messages')
      .insert({
        chat_id: chatId,
        role,
        content,
        image_url: imageUrl,
        embedding
      })
      .select('id')
      .single();

    if (error) {
      console.error('❌ Solo AI Function - Message save error:', error);
      throw new Error(`Failed to save message: ${error.message}`);
    }

    console.log('✅ Solo AI Function - Saved', role, 'message with ID:', data.id);
    return data.id;
  } catch (error) {
    console.error('❌ Solo AI Function - Message save failed:', error);
    throw new Error(`Message save failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Main Edge Function handler
 */
Deno.serve(async (req) => {
  const startTime = Date.now();
  console.log('🚀 Solo AI Function - Request received at', new Date().toISOString());

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  if (req.method !== 'POST') {
    console.log('❌ Solo AI Function - Invalid method:', req.method);
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      { 
        status: 405,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  try {
    // Parse request body
    const requestBody: SoloAIRequest = await req.json();
    console.log('📥 Solo AI Function - Parsed request:', {
      chat_id: requestBody.chat_id,
      user_id: requestBody.user_id,
      message_length: requestBody.user_message?.length || 0,
      has_image: !!requestBody.image_url
    });

    // Validate required fields
    if (!requestBody.chat_id || !requestBody.user_message || !requestBody.user_id) {
      console.log('❌ Solo AI Function - Missing required fields');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Missing required fields: chat_id, user_message, user_id' 
        }),
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Step 1: Generate embedding for user's message
    console.log('📊 Solo AI Function - Step 1: Generating query embedding');
    const queryEmbedding = await generateEmbedding(requestBody.user_message);

    // Step 2: Search for relevant historical context
    console.log('🔍 Solo AI Function - Step 2: Searching relevant history');
    const relevantHistory = await searchRelevantHistory(
      queryEmbedding,
      requestBody.chat_id,
      requestBody.user_id
    );

    // Step 3: Get recent conversation context
    console.log('💬 Solo AI Function - Step 3: Fetching recent conversation');
    const recentConversation = await getRecentConversation(requestBody.chat_id);

    // Step 4: Generate AI response with context
    console.log('🤖 Solo AI Function - Step 4: Generating AI response');
    const aiResponse = await generateAIResponse(
      requestBody.user_message,
      requestBody.image_url,
      relevantHistory,
      recentConversation
    );

    // Step 5: Save user message
    console.log('💾 Solo AI Function - Step 5: Saving user message');
    const userMessageId = await saveMessage(
      requestBody.chat_id,
      'user',
      requestBody.user_message,
      requestBody.image_url
    );

    // Step 6: Save AI response
    console.log('💾 Solo AI Function - Step 6: Saving AI response');
    const aiMessageId = await saveMessage(
      requestBody.chat_id,
      'assistant',
      aiResponse
    );

    const processingTime = Date.now() - startTime;
    console.log('✅ Solo AI Function - Request completed successfully in', processingTime, 'ms');

    const response: SoloAIResponse = {
      success: true,
      ai_response: aiResponse,
      user_message_id: userMessageId,
      ai_message_id: aiMessageId,
      processing_time_ms: processingTime,
              rag_details: {
          relevant_history_count: relevantHistory.length,
          recent_conversation_count: recentConversation.length,
          similarity_threshold: 0.6,
          context_used: relevantHistory.length > 0 || recentConversation.length > 0,
          context_type: relevantHistory.length > 0 ? 'RAG with history' : (recentConversation.length > 0 ? 'Recent only' : 'None'),
          relevant_messages: relevantHistory.map((msg: DatabaseMessage) => ({
            id: msg.id,
            content: msg.content,
            similarity: msg.similarity || 0,
            created_at: msg.created_at
          }))
        }
    };

    return new Response(
      JSON.stringify(response),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error('❌ Solo AI Function - Request failed after', processingTime, 'ms:', error);

    const errorResponse: SoloAIResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      processing_time_ms: processingTime
    };

    return new Response(
      JSON.stringify(errorResponse),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}); 