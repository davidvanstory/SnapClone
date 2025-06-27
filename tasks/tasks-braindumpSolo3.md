## Relevant Files

- `app/(tabs)/solo.tsx` - Main Solo Tutor chat screen component
- `app/(tabs)/_layout.tsx` - Tab navigation layout (needs Solo tab addition)
- `components/solo/SoloChat.tsx` - Chat interface component
- `components/solo/ChatMessage.tsx` - Individual chat message component
- `components/solo/ChatInput.tsx` - Text input and image upload component
- `lib/soloService.ts` - Service for Solo Tutor API calls
- `store/soloStore.ts` - Zustand store for Solo Tutor state management
- `supabase/functions/get-ai-response/index.ts` - Edge function for AI responses with RAG
- `supabase/migrations/20250103000001_create_solo_tables.sql` - Database schema for Solo Tutor
- `supabase/migrations/20250103000002_solo_demo_seed.sql` - Synthetic demo data

### Notes

- The Solo Tutor uses OpenAI's GPT-4o for multimodal AI responses and text-embedding-3-small for RAG embeddings
- Database uses pgvector extension for vector similarity search
- Image uploads go to Supabase Storage before being sent to AI
- RAG system combines both long-term memory (vector search) and short-term memory (recent messages)

## Tasks

- [ ] 1.0 Database Schema & Migration Setup
  - [ ] 1.1 Enable pgvector extension in Supabase database
  - [ ] 1.2 Create solo_ai_chats table migration with user_id, title, timestamps
  - [ ] 1.3 Create solo_ai_messages table migration with chat_id, role, content, image_url, embedding vector(1536), timestamps
  - [ ] 1.4 Add RLS policies for solo_ai_chats table (users can only access their own chats)
  - [ ] 1.5 Add RLS policies for solo_ai_messages table (users can only access messages from their own chats)
  - [ ] 1.6 Run and test database migrations locally

- [ ] 2.0 Supabase Edge Function with RAG Implementation
  - [ ] 2.1 Create base Supabase Edge Function structure in supabase/functions/get-ai-response/
  - [ ] 2.2 Implement OpenAI text-embedding-3-small integration for query embedding generation
  - [ ] 2.3 Implement vector similarity search logic using pgvector for long-term memory retrieval
  - [ ] 2.4 Implement recent conversation fetching for short-term memory (last 4-6 messages)
  - [ ] 2.5 Create system prompt for "Canvas" AI tutor persona with art terminology focus
  - [ ] 2.6 Implement OpenAI GPT-4o multimodal API integration for generating responses
  - [ ] 2.7 Implement dual message persistence (user message + AI response) with embeddings
  - [ ] 2.8 Add comprehensive error handling and logging for all API calls
  - [ ] 2.9 Test Edge Function locally with curl commands

- [ ] 3.0 Frontend Navigation & Screen Structure
  - [ ] 3.1 Add "Solo" tab to app/(tabs)/_layout.tsx with appropriate icon
  - [ ] 3.2 Create app/(tabs)/solo.tsx main screen component
  - [ ] 3.3 Integrate solo screen with existing theme and navigation patterns
  - [ ] 3.4 Add solo-related types to TypeScript definitions

- [ ] 4.0 Chat Interface Components & UI
  - [ ] 4.1 Create components/solo/SoloChat.tsx main chat container component
  - [ ] 4.2 Create components/solo/ChatMessage.tsx for individual message display (user vs AI styling)
  - [ ] 4.3 Create components/solo/ChatInput.tsx with text input and image upload functionality
  - [ ] 4.4 Implement image upload to Supabase Storage integration
  - [ ] 4.5 Add loading states and error handling for AI responses
  - [ ] 4.6 Style chat interface using existing GlassMorphismCard and ThemedText components
  - [ ] 4.7 Implement chat scrolling and message ordering functionality
  - [ ] 4.8 Create lib/soloService.ts for API communication with Edge Function
  - [ ] 4.9 Create store/soloStore.ts Zustand store for chat state management
  
- [ ] 5.0 Demo Data & Testing Integration
  - [ ] 5.1 Create supabase/migrations/20250103000002_solo_demo_seed.sql with synthetic chat data
  - [ ] 5.2 Generate pre-computed embeddings for demo messages using OpenAI API
  - [ ] 5.3 Create 5 diverse demo chats covering different art topics (hand proportions, perspective, color theory, composition)
  - [ ] 5.4 Test complete user flow: navigation → chat → image upload → AI response
  - [ ] 5.5 Test RAG functionality with demo data (verify relevant history retrieval)
  - [ ] 5.6 Verify RLS policies work correctly (users only see their own chats)
  - [ ] 5.7 Test error handling scenarios (network failures, API errors, invalid images) 