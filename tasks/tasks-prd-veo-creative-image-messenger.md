# VEO Creative Image Messenger - Task List
Based on PRD: `prd-veo-creative-image-messenger.md`

## Relevant Files

- `app/(auth)/login.tsx` - Login screen with email/password authentication
- `app/(auth)/register.tsx` - User registration screen with validation
- `app/(auth)/profile-setup.tsx` - Initial profile creation screen
- `app/(auth)/_layout.tsx` - Auth stack navigation layout
- `app/(tabs)/groups.tsx` - Groups list and management screen
- `app/(tabs)/create-group.tsx` - Group creation interface
- `app/group/[id].tsx` - Individual group chat screen
- `app/create-image.tsx` - AI image generation interface
- `components/auth/AuthForm.tsx` - Reusable authentication form components
- `components/groups/GroupCard.tsx` - Group display component
- `components/groups/GroupMembersList.tsx` - Group members management
- `components/ai/PromptInput.tsx` - Text prompt input component
- `components/ai/CategorySelector.tsx` - Prompt category selection
- `components/ai/ProcessingStatus.tsx` - Real-time processing indicator
- `components/messaging/MessageBubble.tsx` - Chat message display component
- `components/messaging/ImageMessage.tsx` - AI-generated image message component
- `components/messaging/CountdownTimer.tsx` - 24-hour deletion countdown
- `lib/auth.ts` - Authentication utilities and session management
- `lib/groups.ts` - Group management functions
- `lib/ai-generation.ts` - AI image generation service integration
- `lib/supabase-client.ts` - Enhanced Supabase client configuration
- `lib/replicate.ts` - Replicate API integration utilities
- `lib/storage.ts` - Image storage and cleanup functions
- `lib/realtime.ts` - Real-time updates handling
- `store/authStore.ts` - Zustand auth state management
- `store/groupsStore.ts` - Zustand groups state management
- `store/messagesStore.ts` - Zustand messages state management
- `supabase/functions/generate-image/index.ts` - Edge function for AI processing
- `supabase/functions/cleanup-expired/index.ts` - Automated content cleanup
- `supabase/migrations/20250101000001_auth_tables.sql` - User authentication tables
- `supabase/migrations/20250101000002_groups_tables.sql` - Group management tables
- `supabase/migrations/20250101000003_messages_tables.sql` - AI messages and content tables
- `supabase/migrations/20250101000004_prompt_categories.sql` - Prompt categories and templates

### Notes

- All auth screens should be placed in `app/(auth)/` directory for proper navigation flow
- Group-related screens use both tabs navigation and dynamic routing for individual groups
- AI generation components are modular and reusable across different screens
- Supabase Edge Functions handle server-side AI processing to keep API keys secure
- State management with Zustand provides reactive updates across the app
- Database migrations follow timestamp naming convention for proper ordering
- Real-time functionality uses Supabase Realtime for instant status updates

## Tasks

- [x] 1.0 Authentication & User Management System
  - [x] 1.1 Configure Supabase Auth settings and policies in Supabase dashboard
  - [x] 1.2 Create auth navigation stack with login/register/profile-setup screens
  - [x] 1.3 Build reusable AuthForm component with email/password validation
  - [x] 1.4 Implement user registration with email verification and error handling
  - [x] 1.5 Create login functionality with session persistence
  - [x] 1.6 Build profile setup screen for username and optional avatar
  - [x] 1.7 Set up Zustand auth store for global authentication state
  - [x] 1.8 Implement automatic session restoration on app launch
  - [x] 1.9 Create user database migration and RLS policies

- [ ] 2.0 Group Management & Navigation
  - [ ] 2.1 Create groups database migration with proper relationships
  - [ ] 2.2 Build groups list screen showing user's active groups
  - [ ] 2.3 Implement group creation screen with name input and invite code generation
  - [ ] 2.4 Create group joining functionality via invite codes or links
  - [ ] 2.5 Build GroupCard component for consistent group display
  - [ ] 2.6 Set up dynamic routing for individual group screens
  - [ ] 2.7 Implement group members management and display
  - [ ] 2.8 Create Zustand groups store for state management
  - [ ] 2.9 Add RLS policies for secure group access control

- [ ] 3.0 AI Image Generation & Processing Pipeline
  - [ ] 3.1 Set up Replicate API account and obtain API keys
  - [ ] 3.2 Create prompt categories database migration with seed data
  - [ ] 3.3 Build PromptInput component with character limit and validation
  - [ ] 3.4 Create CategorySelector component for style/mood/subject categories
  - [ ] 3.5 Implement category combination logic and prompt building
  - [ ] 3.6 Create Supabase Edge Function for secure Replicate API integration
  - [ ] 3.7 Build ProcessingStatus component with real-time updates
  - [ ] 3.8 Set up Supabase Realtime subscriptions for processing status
  - [ ] 3.9 Implement image generation workflow from prompt to completion
  - [ ] 3.10 Create AI messages database migration with status tracking
  - [ ] 3.11 Set up image storage in Supabase Storage with proper naming

- [ ] 4.0 Messaging Interface & Ephemeral Content Management
  - [ ] 4.1 Build group chat screen layout with message list
  - [ ] 4.2 Create MessageBubble component for text and system messages
  - [ ] 4.3 Build ImageMessage component for AI-generated content display
  - [ ] 4.4 Implement full-screen image viewing with zoom capabilities
  - [ ] 4.5 Create CountdownTimer component showing time until deletion
  - [ ] 4.6 Set up 24-hour automatic deletion system via scheduled function
  - [ ] 4.7 Build expired content cleanup Edge Function
  - [ ] 4.8 Implement real-time message synchronization across group members
  - [ ] 4.9 Create messages Zustand store for chat state management
  - [ ] 4.10 Add visual indicators for ephemeral content lifecycle

- [ ] 5.0 Error Handling & System Reliability
  - [ ] 5.1 Implement retry mechanism for failed AI generation (3 attempts max)
  - [ ] 5.2 Create comprehensive error handling for network connectivity issues
  - [ ] 5.3 Build fallback UI states for when AI generation fails permanently
  - [ ] 5.4 Set up offline data caching for recent messages and groups
  - [ ] 5.5 Implement graceful degradation when Replicate API is unavailable
  - [ ] 5.6 Create user-friendly error messages without technical jargon
  - [ ] 5.7 Add loading states and progress indicators throughout the app
  - [ ] 5.8 Implement exponential backoff for API rate limiting scenarios
  - [ ] 5.9 Set up error logging and monitoring for debugging
  - [ ] 5.10 Create recovery mechanisms for partial failures and interrupted processes 