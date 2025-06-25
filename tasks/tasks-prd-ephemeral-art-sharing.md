# Draft (EphemeralArt) - Task List
**Based on PRD**: `prd-ephemeral-art-sharing.md`

---

## Codebase Analysis Summary

**✅ What's Actually Implemented (compatible with Draft):**
- Supabase authentication with email/password (✅ works for Draft)
- User registration and login functionality (✅ works for Draft)
- Basic user profile system with username validation (✅ can be simplified)
- Camera functionality with photo capture and upload (✅ works for Draft)
- Supabase Storage integration with photos bucket (✅ works for Draft)
- Basic database migrations for users and photos (✅ foundation works)
- Zustand store for auth state management (✅ works for Draft)
- Basic navigation structure with auth and tabs (✅ structure works)

**🚨 What Needs Major Rework for Draft:**
- **Class Joining Flow**: Current flow has username setup, but Draft needs class code entry after authentication
- **Home Screen**: Current shows demo content, needs class feed with ephemeral posts
- **UI/Typography**: Uses default fonts, needs Instrument Serif + Montserrat
- **Database Schema**: Missing classes, posts, comments, AI feedback tables
- **Navigation**: Current tabs are "Home" and "Explore", needs "Class Feed" and "Camera"

**🔧 What Needs to be Built from Scratch:**
- Class-based social features (classes, posts, comments)
- Ephemeral content management with timers and auto-deletion
- Feed display with pre-populated demo content
- Frame selection system for artwork
- Sharing controls (viewer limits, duration selection)
- AI feedback integration with OpenAI GPT-4V
- Real-time commenting and interactions
- Demo environment with fake classmates

---

## Relevant Files

### Existing Files That Need Major Rework
- [x] `app/(auth)/login.tsx` - Email/password authentication (can reuse existing)
- [x] `app/(auth)/register.tsx` - User registration with validation (can reuse existing)
- [ ] `app/(auth)/profile-setup.tsx` - EXISTS but needs modification for Draft requirements
- [x] `app/(auth)/_layout.tsx` - Auth stack navigation layout (can reuse)
- [ ] `app/(tabs)/camera.tsx` - EXISTS but needs sharing controls and frame selection
- [ ] `app/(tabs)/_layout.tsx` - EXISTS but wrong tab names ("Home"/"Explore" vs "Class Feed"/"Camera")
- [ ] `app/(tabs)/index.tsx` - EXISTS but shows demo content, needs class feed
- [x] `components/auth/AuthForm.tsx` - Reusable authentication form components (can reuse existing)
- [x] `lib/auth.ts` - Authentication utilities (can partially reuse)
- [x] `lib/supabase.ts` - Supabase client configuration (can reuse)
- [x] `lib/photoService.ts` - Photo upload and storage management (can reuse)
- [x] `store/authStore.ts` - Zustand auth state management (can partially reuse)
- [x] `supabase/migrations/20250101000001_auth_tables.sql` - User authentication tables (can reuse)
- [x] `supabase/migrations/20250101000002_setup_storage.sql` - Storage bucket setup (can reuse)
- [ ] `supabase/migrations/20250101000003_create_photos_table.sql` - EXISTS but wrong schema for posts
- [x] `supabase/migrations/20250101000004_storage_policies.sql` - Storage policies (can reuse)

### New Files to Create
- [ ] `components/feed/ClassJoinModal.tsx` - Class code entry modal when accessing class feed
- [ ] `app/(tabs)/index.tsx` - Main class feed screen (rename/update existing)
- [ ] `app/post/[id].tsx` - Individual post detail view with comments
- [ ] `components/feed/FeedPost.tsx` - Individual post display component
- [ ] `components/feed/CommentBubble.tsx` - Comment display component
- [ ] `components/feed/CountdownTimer.tsx` - Live countdown timer component
- [ ] `components/camera/FrameSelector.tsx` - Optional frame selection interface
- [ ] `components/camera/SharingControls.tsx` - Viewer limits and duration controls
- [ ] `components/ai/AIFeedbackButton.tsx` - AI feedback request component
- [ ] `components/ui/LoadingSpinner.tsx` - Loading states component
- [ ] `lib/classService.ts` - Class management and validation
- [ ] `lib/postService.ts` - Post creation and management
- [ ] `lib/commentService.ts` - Comment system management
- [ ] `lib/aiService.ts` - AI feedback integration with OpenAI
- [ ] `lib/ephemeralService.ts` - Timer and auto-deletion management
- [ ] `lib/frameService.ts` - Frame processing and overlay
- [ ] `store/classStore.ts` - Class and feed state management
- [ ] `store/postsStore.ts` - Posts and comments state
- [ ] `supabase/migrations/20250102000001_create_classes_table.sql` - Classes table
- [ ] `supabase/migrations/20250102000002_create_posts_table.sql` - Posts table
- [ ] `supabase/migrations/20250102000003_create_comments_table.sql` - Comments table
- [ ] `supabase/migrations/20250102000004_create_ai_feedback_table.sql` - AI feedback table
- [ ] `supabase/migrations/20250102000005_demo_data_seed.sql` - Pre-populated demo content
- [ ] `supabase/functions/ai-feedback/index.ts` - Edge function for AI integration
- [ ] `supabase/functions/cleanup-expired/index.ts` - Automatic content cleanup
- [ ] `assets/frames/` - Gallery frame overlay images
- [ ] `docs/demo-walkthrough.md` - Demo experience documentation

---

## Tasks

- [x] **1.0 Foundation & Authentication System**
  - [x] 1.1 Configure Supabase Auth settings and policies in dashboard
  - [x] 1.2 Create auth navigation stack with login/register/profile-setup screens
  - [x] 1.3 Build reusable AuthForm component with email/password validation
  - [x] 1.4 Implement user registration with email verification and error handling
  - [x] 1.5 Create login functionality with session persistence
  - [x] 1.6 Build profile setup screen for username and optional avatar
  - [x] 1.7 Set up Zustand auth store for global authentication state
  - [x] 1.8 Implement automatic session restoration on app launch
  - [x] 1.9 Create user database migration and RLS policies
  - [ ] 1.10 Create class joining modal for accessing class feed
  - [ ] 1.11 Update profile setup to be optional/simplified for Draft requirements

- [x] **2.0 Camera & Photo Management System** 
  - [x] 2.1 Set up camera permissions handling and error states
  - [x] 2.2 Create camera interface with full-screen viewfinder
  - [x] 2.3 Implement photo capture with quality settings and haptic feedback
  - [x] 2.4 Build image preview mode with upload/retake options
  - [x] 2.5 Set up Supabase Storage with photos bucket and security policies
  - [x] 2.6 Create photo upload service with metadata storage
  - [x] 2.7 Implement file size optimization and MIME type handling
  - [x] 2.8 Add upload progress indicators and success/error states
  - [ ] 2.9 Create frame selection interface with live preview
  - [ ] 2.10 Implement frame overlay processing using Expo ImageManipulator
  - [ ] 2.11 Add frame assets and horizontal carousel selector

- [ ] **3.0 Class Management & Social Infrastructure**
  - [ ] 3.1 Create classes database migration with join codes
  - [ ] 3.2 Build class validation service and join code verification
  - [ ] 3.3 Create posts database migration with ephemeral properties
  - [ ] 3.4 Create comments database migration with character limits
  - [ ] 3.5 Set up class association for users after authentication
  - [ ] 3.6 Create Zustand store for class and feed state management
  - [ ] 3.7 Build class welcome confirmation screen
  - [ ] 3.8 Implement class context display in app header
  - [ ] 3.9 Set up RLS policies for class-based content isolation
  - [ ] 3.10 Create demo data seed with 5 fake classmates and sample posts

- [ ] **4.0 Feed Display & Post Creation System**
  - [ ] 4.1 Build main class feed screen layout with scroll view
  - [ ] 4.2 Create FeedPost component for artwork display
  - [ ] 4.3 Implement post creation service with sharing controls
  - [ ] 4.4 Build sharing controls interface (viewer limits, duration selection)
  - [ ] 4.5 Create post upload flow from camera to feed
  - [ ] 4.6 Add immediate feed updates when new posts are created
  - [ ] 4.7 Implement artwork-centric layout with maximum comfortable sizing
  - [ ] 4.8 Create elegant typography hierarchy (Instrument Serif + Montserrat)
  - [ ] 4.9 Build smooth loading states and skeleton screens
  - [ ] 4.10 Add post interaction tap handlers for full-screen viewing

- [ ] **5.0 Social Features & Commenting System**
  - [ ] 5.1 Create individual post detail screen with full-screen artwork view
  - [ ] 5.2 Build CommentBubble component with character limit display
  - [ ] 5.3 Implement comment creation with 100-150 character validation
  - [ ] 5.4 Set up real-time comment updates using Supabase Realtime
  - [ ] 5.5 Create comment submission with immediate optimistic updates
  - [ ] 5.6 Build encouraging comment tone with pre-populated examples
  - [ ] 5.7 Implement comment animation and smooth appearance effects
  - [ ] 5.8 Add comment timestamp display and user attribution
  - [ ] 5.9 Create comment state management in Zustand store
  - [ ] 5.10 Build supportive interaction patterns and UI feedback

- [ ] **6.0 AI Feedback Integration System**
  - [ ] 6.1 Set up OpenAI API account and obtain GPT-4V access keys
  - [ ] 6.2 Create AI feedback database migration for storing responses
  - [ ] 6.3 Build Supabase Edge Function for secure OpenAI API integration
  - [ ] 6.4 Create AIFeedbackButton component (appears only on user's own posts)
  - [ ] 6.5 Implement AI prompt engineering for encouraging, actionable feedback
  - [ ] 6.6 Build loading states with 3-second target response time
  - [ ] 6.7 Create AI response display with proper formatting
  - [ ] 6.8 Implement unlimited AI feedback access (no rate limiting)
  - [ ] 6.9 Add error handling for AI service unavailability
  - [ ] 6.10 Create AI feedback state management and caching

- [ ] **7.0 Ephemeral Content Management System**
  - [ ] 7.1 Create CountdownTimer component with live seconds display
  - [ ] 7.2 Implement post expiration calculation and duration tracking
  - [ ] 7.3 Build automatic post deletion system via scheduled function
  - [ ] 7.4 Create cleanup Edge Function for expired content removal
  - [ ] 7.5 Implement smooth fade-out animations for post expiration
  - [ ] 7.6 Set up storage cleanup for expired image files
  - [ ] 7.7 Build peaceful transition animations (200-300ms duration)
  - [ ] 7.8 Create post-deletion feed reorganization logic
  - [ ] 7.9 Implement timer persistence across app restarts
  - [ ] 7.10 Add visual indicators for content lifecycle stages

- [ ] **8.0 Demo Environment & Content Management**
  - [ ] 8.1 Create realistic fake user profiles (Maya, Jordan, Sam, Casey, Riley)
  - [ ] 8.2 Generate high-quality sample artwork for demo posts
  - [ ] 8.3 Write encouraging, supportive demo comments
  - [ ] 8.4 Set up "Monday Drawing Fundamentals" class (DRAW01)
  - [ ] 8.5 Create varied engagement data (viewer counts, time remaining)
  - [ ] 8.6 Build realistic timer states for demo content
  - [ ] 8.7 Implement single-device testing architecture
  - [ ] 8.8 Create demo content refresh system for multiple demonstrations
  - [ ] 8.9 Build content quality validation for realistic class environment
  - [ ] 8.10 Set up demo reset functionality for clean demonstrations

- [ ] **9.0 UI Polish & Design Implementation (CRITICAL - CURRENT UI IS WRONG)**
  - [ ] 9.1 Implement monochromatic color scheme (#2C2C2C charcoal text, white backgrounds)
  - [ ] 9.2 Set up custom font loading (Instrument Serif + Montserrat) - currently using SpaceMono
  - [ ] 9.3 Create generous whitespace design with 8px grid system
  - [ ] 9.4 Rebuild tab navigation interface (currently "Home"/"Explore", needs "Class Feed"/"Camera")
  - [ ] 9.5 Implement single accent color for critical actions (currently using tint colors)
  - [ ] 9.6 Create thumb-friendly touch targets (44px minimum)
  - [ ] 9.7 Build progressive disclosure for advanced features
  - [ ] 9.8 Implement haptic feedback for key interactions
  - [ ] 9.9 Create smooth micro-animations throughout app
  - [ ] 9.10 Add visual hierarchy consistency across all screens

- [ ] **10.0 Performance Optimization & Testing**
  - [ ] 10.1 Optimize photo capture to launch under 1 second
  - [ ] 10.2 Ensure image upload completion within 3 seconds
  - [ ] 10.3 Optimize AI feedback response to under 5 seconds
  - [ ] 10.4 Implement real-time updates within 1 second latency
  - [ ] 10.5 Test ephemeral cleanup within 1 minute of expiration
  - [ ] 10.6 Optimize app startup time for smooth demo experience
  - [ ] 10.7 Test memory usage during extended demo sessions
  - [ ] 10.8 Verify smooth animations on target iOS devices
  - [ ] 10.9 Validate complete user journey from launch to AI feedback
  - [ ] 10.10 Conduct comprehensive demo readiness testing

### Notes

**Implementation Priority:**
- **Phase 1** : Complete tasks 3.0-4.0 for basic class and feed functionality
- **Phase 2** : Implement tasks 5.0-6.0 for social features and AI integration  
- **Phase 3** : Build tasks 7.0-8.0 for ephemeral features and demo content
- **Phase 4** : Polish with tasks 9.0-10.0 for production-ready experience

**Key Architectural Decisions:**
- Maintain single-device testing approach with pre-populated content
- Use Supabase Realtime for live comment updates and feed synchronization
- Implement frame system as optional enhancement with easy skip
- Focus on anxiety-reducing, confidence-building user experience
- Live countdown timers demonstrate ephemeral nature
- AI feedback only appears on user's own posts

---

## 🚨 CRITICAL REWORK REQUIRED

**The existing codebase was built for "VEO Creative Image Messenger" and does NOT match the Draft PRD requirements. Major components need complete rebuilding:**

### **Immediate Priority (Must Fix First):**
1. **Class Joining Flow**: Add class code entry modal when accessing class feed
2. **Home Screen**: Replace demo content with class feed displaying ephemeral posts
3. **Navigation**: Change tabs from "Home"/"Explore" to "Class Feed"/"Camera"  
4. **Typography**: Replace SpaceMono with Instrument Serif + Montserrat
5. **Database Schema**: Add classes, posts, comments, AI feedback tables

### **Architecture Mismatch:**
- **Current**: Email registration → username setup → group messaging with AI image generation
- **Required**: Email registration → class code entry → ephemeral art sharing with AI feedback

### **Files Requiring Major Updates:**
- `app/(tabs)/index.tsx` - Wrong home screen content, needs class feed
- `app/(tabs)/_layout.tsx` - Wrong tab names and icons
- `app/(auth)/profile-setup.tsx` - Needs simplification for Draft requirements

### **Files That Can Be Reused:**
- `app/(auth)/login.tsx` - Email/password authentication works for Draft
- `app/(auth)/register.tsx` - User registration works for Draft
- `components/auth/AuthForm.tsx` - Email/password form works for Draft

### **Recommended Approach:**
1. **Preserve Authentication**: Keep existing email/password authentication system
2. **Add Class Joining**: Create modal for class code entry when accessing class feed
3. **Rebuild Feed Screen**: Replace demo content with class feed displaying ephemeral posts
4. **Database Migration**: Create new schema for classes, posts, comments while preserving auth tables
5. **Design System**: Implement Draft-specific typography and color scheme from scratch

*This task list prioritizes building a functional, anxiety-reducing ephemeral art sharing platform that demonstrates the value proposition through realistic demo content and smooth, confidence-building interactions.* 