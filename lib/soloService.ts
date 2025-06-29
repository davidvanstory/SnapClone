/**
 * Solo Service
 * 
 * This service handles all Solo AI Tutor-related operations including:
 * - Chat creation and management
 * - Message sending and AI response handling
 * - Integration with Supabase Edge Function for RAG-powered AI responses
 * - Chat history retrieval and management
 * - Error handling for AI API failures
 */

import { uploadSoloImage } from './soloImageService';
import type { SoloAIChat, SoloAIMessage } from './supabase';
import { supabase } from './supabase';

/**
 * AI response result interface
 */
export interface AIResponseResult {
  success: boolean;
  userMessage?: SoloAIMessage;
  aiMessage?: SoloAIMessage;
  error?: string;
  processingTimeMs?: number;
}

/**
 * Chat creation result interface
 */
export interface ChatCreationResult {
  success: boolean;
  chat?: SoloAIChat;
  error?: string;
}

/**
 * Send message options
 */
export interface SendMessageOptions {
  chatId: string;
  message: string;
  imageUri?: string;
  userId: string;
}

/**
 * Create a new chat session
 */
export async function createSoloChat(
  userId: string,
  title?: string
): Promise<ChatCreationResult> {
  console.log('💬 Solo Service - Creating new chat for user:', userId);
  console.log('📝 Chat title:', title || 'Untitled Chat');

  try {
    const { data: chatData, error } = await supabase
      .from('solo_ai_chats')
      .insert({
        user_id: userId,
        title: title || null,
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Solo Service - Chat creation error:', error);
      return {
        success: false,
        error: `Failed to create chat: ${error.message}`,
      };
    }

    console.log('✅ Solo Service - Chat created successfully:', chatData.id);
    return {
      success: true,
      chat: chatData as SoloAIChat,
    };

  } catch (error) {
    console.error('❌ Solo Service - Unexpected error during chat creation:', error);
    return {
      success: false,
      error: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Get user's chat list
 */
export async function getUserChats(userId: string): Promise<SoloAIChat[]> {
  console.log('📋 Solo Service - Fetching chats for user:', userId);

  try {
    const { data: chats, error } = await supabase
      .from('solo_ai_chats')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('❌ Solo Service - Error fetching chats:', error);
      throw new Error(`Failed to fetch chats: ${error.message}`);
    }

    console.log('✅ Solo Service - Retrieved', chats?.length || 0, 'chats');
    return (chats || []) as SoloAIChat[];

  } catch (error) {
    console.error('❌ Solo Service - Unexpected error fetching chats:', error);
    throw error;
  }
}

/**
 * Get messages for a specific chat
 */
export async function getChatMessages(chatId: string): Promise<SoloAIMessage[]> {
  console.log('💬 Solo Service - Fetching messages for chat:', chatId);

  try {
    const { data: messages, error } = await supabase
      .from('solo_ai_messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('❌ Solo Service - Error fetching messages:', error);
      throw new Error(`Failed to fetch messages: ${error.message}`);
    }

    console.log('✅ Solo Service - Retrieved', messages?.length || 0, 'messages');
    return (messages || []) as SoloAIMessage[];

  } catch (error) {
    console.error('❌ Solo Service - Unexpected error fetching messages:', error);
    throw error;
  }
}

/**
 * Send a message and get AI response
 */
export async function sendMessage(options: SendMessageOptions): Promise<AIResponseResult> {
  console.log('🚀 Solo Service - Sending message to AI');
  console.log('📍 Chat ID:', options.chatId);
  console.log('📝 User Question:', options.message);
  console.log('🖼️ Has image:', !!options.imageUri);

  const startTime = Date.now();

  try {
    let imageUrl: string | undefined;

    // Upload image if provided
    if (options.imageUri) {
      console.log('📤 Solo Service - Uploading image for AI analysis');
      const uploadResult = await uploadSoloImage(options.imageUri, {
        userId: options.userId,
      });

      if (!uploadResult.success) {
        console.error('❌ Solo Service - Image upload failed:', uploadResult.error);
        return {
          success: false,
          error: uploadResult.error || 'Failed to upload image',
        };
      }

      imageUrl = uploadResult.publicUrl;
      console.log('✅ Solo Service - Image uploaded successfully');
    }

    // Prepare request payload for Edge Function
    const requestPayload = {
      chat_id: options.chatId,
      user_message: options.message,
      image_url: imageUrl,
      user_id: options.userId,
    };

    console.log('📡 Solo Service - Calling Edge Function with payload');
    console.log('🔧 Payload:', {
      chat_id: requestPayload.chat_id,
      message_length: requestPayload.user_message.length,
      has_image: !!requestPayload.image_url,
      user_id: requestPayload.user_id,
    });

    // Call the Edge Function
    const { data: responseData, error: functionError } = await supabase.functions.invoke(
      'get-ai-response',
      {
        body: requestPayload,
      }
    );

    if (functionError) {
      console.error('❌ Solo Service - Edge Function error:', functionError);
      return {
        success: false,
        error: `AI service error: ${functionError.message}`,
      };
    }

    if (!responseData?.success) {
      console.error('❌ Solo Service - AI response failed:', responseData?.error);
      return {
        success: false,
        error: responseData?.error || 'AI failed to generate response',
      };
    }

    console.log('✅ Solo Service - AI response received successfully');
    console.log('🤖 AI Response:', responseData.ai_response || 'No response content');
    console.log('📊 Response data:', {
      user_message_id: responseData.user_message_id,
      ai_message_id: responseData.ai_message_id,
      processing_time: responseData.processing_time_ms,
    });

    // Fetch the created messages from database to return complete objects
    const [userMessage, aiMessage] = await Promise.all([
      getUserMessage(responseData.user_message_id),
      getAIMessage(responseData.ai_message_id),
    ]);

    const processingTime = Date.now() - startTime;
    console.log('⏱️ Solo Service - Total processing time:', processingTime, 'ms');

    return {
      success: true,
      userMessage,
      aiMessage,
      processingTimeMs: processingTime,
    };

  } catch (error) {
    console.error('❌ Solo Service - Unexpected error during message send:', error);
    const processingTime = Date.now() - startTime;
    
    return {
      success: false,
      error: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      processingTimeMs: processingTime,
    };
  }
}

/**
 * Get a specific user message by ID
 */
async function getUserMessage(messageId: string): Promise<SoloAIMessage | undefined> {
  try {
    const { data: message, error } = await supabase
      .from('solo_ai_messages')
      .select('*')
      .eq('id', messageId)
      .single();

    if (error) {
      console.error('❌ Solo Service - Error fetching user message:', error);
      return undefined;
    }

    return message as SoloAIMessage;
  } catch (error) {
    console.error('❌ Solo Service - Unexpected error fetching user message:', error);
    return undefined;
  }
}

/**
 * Get a specific AI message by ID
 */
async function getAIMessage(messageId: string): Promise<SoloAIMessage | undefined> {
  try {
    const { data: message, error } = await supabase
      .from('solo_ai_messages')
      .select('*')
      .eq('id', messageId)
      .single();

    if (error) {
      console.error('❌ Solo Service - Error fetching AI message:', error);
      return undefined;
    }

    return message as SoloAIMessage;
  } catch (error) {
    console.error('❌ Solo Service - Unexpected error fetching AI message:', error);
    return undefined;
  }
}

/**
 * Delete a chat and all its messages
 */
export async function deleteChat(chatId: string, userId: string): Promise<boolean> {
  console.log('🗑️ Solo Service - Deleting chat:', chatId);

  try {
    // Delete the chat (messages will be deleted via CASCADE)
    const { error } = await supabase
      .from('solo_ai_chats')
      .delete()
      .eq('id', chatId)
      .eq('user_id', userId); // Ensure user owns the chat

    if (error) {
      console.error('❌ Solo Service - Error deleting chat:', error);
      return false;
    }

    console.log('✅ Solo Service - Chat deleted successfully');
    return true;

  } catch (error) {
    console.error('❌ Solo Service - Unexpected error deleting chat:', error);
    return false;
  }
}

/**
 * Update chat title
 */
export async function updateChatTitle(
  chatId: string,
  userId: string,
  title: string
): Promise<boolean> {
  console.log('📝 Solo Service - Updating chat title:', { chatId, title });

  try {
    const { error } = await supabase
      .from('solo_ai_chats')
      .update({ title: title.trim() || null })
      .eq('id', chatId)
      .eq('user_id', userId); // Ensure user owns the chat

    if (error) {
      console.error('❌ Solo Service - Error updating chat title:', error);
      return false;
    }

    console.log('✅ Solo Service - Chat title updated successfully');
    return true;

  } catch (error) {
    console.error('❌ Solo Service - Unexpected error updating chat title:', error);
    return false;
  }
}

/**
 * Get or create a default chat for the user
 */
export async function getOrCreateDefaultChat(userId: string): Promise<SoloAIChat | null> {
  console.log('🔍 Solo Service - Getting or creating default chat for user:', userId);

  try {
    // Try to get the most recent chat
    const { data: existingChats, error: fetchError } = await supabase
      .from('solo_ai_chats')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .limit(1);

    if (fetchError) {
      console.error('❌ Solo Service - Error fetching existing chats:', fetchError);
      throw fetchError;
    }

    if (existingChats && existingChats.length > 0) {
      console.log('✅ Solo Service - Found existing chat:', existingChats[0].id);
      return existingChats[0] as SoloAIChat;
    }

    // No existing chat, create a new one
    console.log('🆕 Solo Service - No existing chat found, creating new one');
    const createResult = await createSoloChat(userId, 'Chat with Canvas');

    if (!createResult.success || !createResult.chat) {
      console.error('❌ Solo Service - Failed to create default chat:', createResult.error);
      return null;
    }

    console.log('✅ Solo Service - Default chat created:', createResult.chat.id);
    return createResult.chat;

  } catch (error) {
    console.error('❌ Solo Service - Unexpected error getting/creating default chat:', error);
    return null;
  }
} 