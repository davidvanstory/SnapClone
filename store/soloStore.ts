/**
 * Solo Tutor Store using Zustand
 * 
 * This store manages global state for the Solo AI Tutor feature including:
 * - Chat session management
 * - Message history and real-time updates
 * - AI response loading states
 * - Error handling and retry functionality
 * - Image upload states
 * - Chat creation and navigation
 */

import { create } from 'zustand';
import {
    createSoloChat,
    deleteChat,
    getChatMessages,
    getOrCreateDefaultChat,
    getUserChats,
    sendMessage,
    updateChatTitle,
    type AIResponseResult,
    type SendMessageOptions,
} from '../lib/soloService';
import type { SoloAIChat, SoloAIMessage } from '../lib/supabase';

// Solo Tutor state interface
export interface SoloState {
  // Current state
  currentChat: SoloAIChat | null;
  messages: SoloAIMessage[];
  userChats: SoloAIChat[];
  
  // Loading states
  isLoading: boolean;
  isLoadingMessages: boolean;
  isLoadingChats: boolean;
  isSendingMessage: boolean;
  isCreatingChat: boolean;
  
  // Error states
  error: string | null;
  messageError: string | null;
  
  // UI states
  isInitialized: boolean;
  prepopulatedImageUri: string | null;
  
  // Actions
  initialize: (userId: string) => Promise<void>;
  loadChats: (userId: string) => Promise<void>;
  loadMessages: (chatId: string) => Promise<void>;
  sendMessage: (options: SendMessageOptions) => Promise<AIResponseResult>;
  createNewChat: (userId: string, title?: string) => Promise<SoloAIChat | null>;
  switchToChat: (chatId: string) => Promise<void>;
  deleteChat: (chatId: string, userId: string) => Promise<boolean>;
  updateChatTitle: (chatId: string, userId: string, title: string) => Promise<boolean>;
  clearError: () => void;
  clearMessageError: () => void;
  reset: () => void;
  setPrepopulatedImageUri: (imageUri: string | null) => void;
  clearPrepopulatedImageUri: () => void;
  
  // Internal state setters
  setCurrentChat: (chat: SoloAIChat | null) => void;
  setMessages: (messages: SoloAIMessage[]) => void;
  addMessage: (message: SoloAIMessage) => void;
  addMessages: (messages: SoloAIMessage[]) => void;
  setUserChats: (chats: SoloAIChat[]) => void;
  setLoading: (loading: boolean) => void;
  setLoadingMessages: (loading: boolean) => void;
  setLoadingChats: (loading: boolean) => void;
  setSendingMessage: (sending: boolean) => void;
  setCreatingChat: (creating: boolean) => void;
  setError: (error: string | null) => void;
  setMessageError: (error: string | null) => void;
  setInitialized: (initialized: boolean) => void;
}

export const useSoloStore = create<SoloState>((set, get) => ({
  // Initial state
  currentChat: null,
  messages: [],
  userChats: [],
  isLoading: false,
  isLoadingMessages: false,
  isLoadingChats: false,
  isSendingMessage: false,
  isCreatingChat: false,
  error: null,
  messageError: null,
  isInitialized: false,
  prepopulatedImageUri: null,

  // Initialize the Solo Tutor store
  initialize: async (userId: string) => {
    console.log('🧠 Solo Store - Initializing for user:', userId);
    set({ isLoading: true, error: null });

    try {
      // Load user's chats
      await get().loadChats(userId);
      
      // Get or create default chat
      const defaultChat = await getOrCreateDefaultChat(userId);
      
      if (defaultChat) {
        console.log('✅ Solo Store - Default chat loaded:', defaultChat.id);
        set({ currentChat: defaultChat });
        
        // Load messages for the default chat
        await get().loadMessages(defaultChat.id);
      } else {
        console.log('⚠️ Solo Store - No default chat available');
      }
      
      set({ isInitialized: true });
      console.log('✅ Solo Store - Initialization complete');
      
    } catch (error) {
      console.error('❌ Solo Store - Initialization error:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to initialize Solo Tutor',
        isInitialized: true 
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // Load user's chat list
  loadChats: async (userId: string) => {
    console.log('📋 Solo Store - Loading chats for user:', userId);
    set({ isLoadingChats: true, error: null });

    try {
      const chats = await getUserChats(userId);
      console.log('✅ Solo Store - Loaded', chats.length, 'chats');
      set({ userChats: chats });
      
    } catch (error) {
      console.error('❌ Solo Store - Error loading chats:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to load chats' });
    } finally {
      set({ isLoadingChats: false });
    }
  },

  // Load messages for a specific chat
  loadMessages: async (chatId: string) => {
    console.log('💬 Solo Store - Loading messages for chat:', chatId);
    set({ isLoadingMessages: true, messageError: null });

    try {
      const messages = await getChatMessages(chatId);
      console.log('✅ Solo Store - Loaded', messages.length, 'messages');
      set({ messages });
      
    } catch (error) {
      console.error('❌ Solo Store - Error loading messages:', error);
      set({ messageError: error instanceof Error ? error.message : 'Failed to load messages' });
    } finally {
      set({ isLoadingMessages: false });
    }
  },

  // Send a message and get AI response
  sendMessage: async (options: SendMessageOptions) => {
    console.log('🚀 Solo Store - Sending message');
    set({ isSendingMessage: true, messageError: null });

    try {
      const result = await sendMessage(options);
      
      if (result.success && result.userMessage && result.aiMessage) {
        console.log('✅ Solo Store - Message sent successfully');
        
        // Add both messages to the store
        const currentMessages = get().messages;
        set({ 
          messages: [...currentMessages, result.userMessage, result.aiMessage]
        });
        
        // Update the chat's updated_at timestamp in the chats list
        const currentChats = get().userChats;
        const updatedChats = currentChats.map(chat => 
          chat.id === options.chatId 
            ? { ...chat, updated_at: new Date().toISOString() }
            : chat
        );
        set({ userChats: updatedChats });
        
      } else {
        console.error('❌ Solo Store - Message send failed:', result.error);
        set({ messageError: result.error || 'Failed to send message' });
      }
      
      return result;
      
    } catch (error) {
      console.error('❌ Solo Store - Unexpected error sending message:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
      set({ messageError: errorMessage });
      
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      set({ isSendingMessage: false });
    }
  },

  // Create a new chat
  createNewChat: async (userId: string, title?: string) => {
    console.log('🆕 Solo Store - Creating new chat');
    set({ isCreatingChat: true, error: null });

    try {
      const result = await createSoloChat(userId, title);
      
      if (result.success && result.chat) {
        console.log('✅ Solo Store - New chat created:', result.chat.id);
        
        // Add to chats list
        const currentChats = get().userChats;
        set({ userChats: [result.chat, ...currentChats] });
        
        // Switch to the new chat
        set({ 
          currentChat: result.chat,
          messages: [] // New chat has no messages
        });
        
        return result.chat;
      } else {
        console.error('❌ Solo Store - Chat creation failed:', result.error);
        set({ error: result.error || 'Failed to create chat' });
        return null;
      }
      
    } catch (error) {
      console.error('❌ Solo Store - Unexpected error creating chat:', error);
      set({ error: error instanceof Error ? error.message : 'Unexpected error' });
      return null;
    } finally {
      set({ isCreatingChat: false });
    }
  },

  // Switch to a different chat
  switchToChat: async (chatId: string) => {
    console.log('🔄 Solo Store - Switching to chat:', chatId);
    
    const targetChat = get().userChats.find(chat => chat.id === chatId);
    if (!targetChat) {
      console.error('❌ Solo Store - Chat not found:', chatId);
      set({ error: 'Chat not found' });
      return;
    }
    
    set({ currentChat: targetChat, messages: [] });
    
    // Load messages for the new chat
    await get().loadMessages(chatId);
  },

  // Delete a chat
  deleteChat: async (chatId: string, userId: string) => {
    console.log('🗑️ Solo Store - Deleting chat:', chatId);
    set({ error: null });

    try {
      const success = await deleteChat(chatId, userId);
      
      if (success) {
        console.log('✅ Solo Store - Chat deleted successfully');
        
        // Remove from chats list
        const currentChats = get().userChats;
        const updatedChats = currentChats.filter(chat => chat.id !== chatId);
        set({ userChats: updatedChats });
        
        // If this was the current chat, switch to another one or clear
        const currentChat = get().currentChat;
        if (currentChat?.id === chatId) {
          if (updatedChats.length > 0) {
            // Switch to the most recent chat
            set({ currentChat: updatedChats[0] });
            await get().loadMessages(updatedChats[0].id);
          } else {
            // No chats left, clear current chat
            set({ currentChat: null, messages: [] });
          }
        }
        
        return true;
      } else {
        console.error('❌ Solo Store - Chat deletion failed');
        set({ error: 'Failed to delete chat' });
        return false;
      }
      
    } catch (error) {
      console.error('❌ Solo Store - Unexpected error deleting chat:', error);
      set({ error: error instanceof Error ? error.message : 'Unexpected error' });
      return false;
    }
  },

  // Update chat title
  updateChatTitle: async (chatId: string, userId: string, title: string) => {
    console.log('📝 Solo Store - Updating chat title');
    set({ error: null });

    try {
      const success = await updateChatTitle(chatId, userId, title);
      
      if (success) {
        console.log('✅ Solo Store - Chat title updated successfully');
        
                 // Update in chats list
         const currentChats = get().userChats;
         const updatedChats = currentChats.map(chat =>
           chat.id === chatId ? { ...chat, title: title.trim() || undefined } : chat
         );
         set({ userChats: updatedChats });
         
         // Update current chat if it's the same one
         const currentChat = get().currentChat;
         if (currentChat?.id === chatId) {
           set({ currentChat: { ...currentChat, title: title.trim() || undefined } });
         }
        
        return true;
      } else {
        console.error('❌ Solo Store - Chat title update failed');
        set({ error: 'Failed to update chat title' });
        return false;
      }
      
    } catch (error) {
      console.error('❌ Solo Store - Unexpected error updating chat title:', error);
      set({ error: error instanceof Error ? error.message : 'Unexpected error' });
      return false;
    }
  },

  // Clear general error
  clearError: () => {
    console.log('🧹 Solo Store - Clearing error');
    set({ error: null });
  },

  // Clear message error
  clearMessageError: () => {
    console.log('🧹 Solo Store - Clearing message error');
    set({ messageError: null });
  },

  // Reset store to initial state
  reset: () => {
    console.log('🔄 Solo Store - Resetting to initial state');
    set({
      currentChat: null,
      messages: [],
      userChats: [],
      isLoading: false,
      isLoadingMessages: false,
      isLoadingChats: false,
      isSendingMessage: false,
      isCreatingChat: false,
      error: null,
      messageError: null,
      isInitialized: false,
      prepopulatedImageUri: null,
    });
  },

  // Internal state setters
  setCurrentChat: (chat: SoloAIChat | null) => {
    console.log('🔄 Solo Store - Setting current chat:', chat?.id || 'null');
    set({ currentChat: chat });
  },

  setMessages: (messages: SoloAIMessage[]) => {
    console.log('💬 Solo Store - Setting messages:', messages.length);
    set({ messages });
  },

  addMessage: (message: SoloAIMessage) => {
    console.log('➕ Solo Store - Adding message:', message.role);
    const currentMessages = get().messages;
    set({ messages: [...currentMessages, message] });
  },

  addMessages: (messages: SoloAIMessage[]) => {
    console.log('➕ Solo Store - Adding messages:', messages.length);
    const currentMessages = get().messages;
    set({ messages: [...currentMessages, ...messages] });
  },

  setUserChats: (chats: SoloAIChat[]) => {
    console.log('📋 Solo Store - Setting user chats:', chats.length);
    set({ userChats: chats });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setLoadingMessages: (loading: boolean) => {
    set({ isLoadingMessages: loading });
  },

  setLoadingChats: (loading: boolean) => {
    set({ isLoadingChats: loading });
  },

  setSendingMessage: (sending: boolean) => {
    set({ isSendingMessage: sending });
  },

  setCreatingChat: (creating: boolean) => {
    set({ isCreatingChat: creating });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  setMessageError: (error: string | null) => {
    set({ messageError: error });
  },

  setInitialized: (initialized: boolean) => {
    set({ isInitialized: initialized });
  },

  // Prepopulated image management
  setPrepopulatedImageUri: (imageUri: string | null) => {
    console.log('📷 Solo Store - Setting prepopulated image URI:', imageUri ? 'Image set' : 'Cleared');
    set({ prepopulatedImageUri: imageUri });
  },

  clearPrepopulatedImageUri: () => {
    console.log('🧹 Solo Store - Clearing prepopulated image URI');
    set({ prepopulatedImageUri: null });
  },
})); 