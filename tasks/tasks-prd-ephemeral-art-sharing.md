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
- **UI/Typography**: Review UIDesign.md
- **Database Schema**: Missing classes, posts, comments, AI feedback tables
- **Navigation**: Current tabs are "Home" and "Explore", needs "Class Feed" and "Camera"

**🔧 What Needs to be Built from Scratch:**
- Class-based social features (classes, posts, comments)
- Ephemeral content management with timers and auto-deletion
- Feed display with pre-populated demo content

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
- [ ] `app/(tabs)/camera.tsx` - EXISTS but needs sharing controls and feed integration
- [x] `app/(tabs)/_layout.tsx` - CORRECT tab names "Class Feed"/"Camera" already implemented
- [ ] `app/(tabs)/index.tsx` - EXISTS but shows traditional cards, needs glass morphism feed
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

- [ ] `components/camera/SharingControls.tsx` - Viewer limits and duration controls
- [ ] `lib/postService.ts` - Post creation and management service
- [ ] `components/ai/AIFeedbackButton.tsx` - AI feedback request component
- [ ] `components/ui/LoadingSpinner.tsx` - Loading states component
- [ ] `lib/classService.ts` - Class management and validation
- [ ] `lib/postService.ts` - Post creation and management
- [ ] `lib/commentService.ts` - Comment system management
- [ ] `lib/aiService.ts` - AI feedback integration with OpenAI
- [ ] `lib/ephemeralService.ts` - Timer and auto-deletion management

- [x] `store/classStore.ts` - Class and feed state management
- [ ] `store/postsStore.ts` - Posts and comments state
- [ ] `supabase/migrations/20250102000001_create_classes_table.sql` - Classes table
- [ ] `supabase/migrations/20250102000002_create_posts_table.sql` - Posts table
- [ ] `supabase/migrations/20250102000003_create_comments_table.sql` - Comments table
- [ ] `supabase/migrations/20250102000004_create_ai_feedback_table.sql` - AI feedback table
- [ ] `supabase/migrations/20250102000005_demo_data_seed.sql` - Pre-populated demo content
- [ ] `supabase/functions/ai-feedback/index.ts` - Edge function for AI integration
- [ ] `supabase/functions/cleanup-expired/index.ts` - Automatic content cleanup

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

- [x] **2.0 Camera & Photo Management System (Glass Morphism Interface)**
  - [x] 2.1 Set up camera permissions handling and error states
  - [x] 2.2 Create camera interface with full-screen viewfinder
  - [x] 2.3 Implement photo capture with quality settings and haptic feedback
  - [x] 2.4 Build image preview mode with upload/retake options
  - [x] 2.5 Set up Supabase Storage with photos bucket and security policies
  - [x] 2.6 Create photo upload service with metadata storage
  - [x] 2.7 Implement file size optimization and MIME type handling
  - [x] 2.8 Add upload progress indicators and success/error states
  - [ ] 2.9 Update camera controls to glass morphism specs: bottom glass card slides up from edge, large 80px centered capture button with subtle shadow, settings as glass morphism pills
  - [ ] 2.10 Build post-capture sharing interface with glass morphism: artwork displayed full-screen with large glass morphism controls card centered over artwork

- [x] **3.0 Class Management & Social Infrastructure**
  - [x] 3.1 Create classes database migration with join codes
  - [x] 3.2 Build class validation service and join code verification
  - [x] 3.3 Create posts database migration with ephemeral properties
  - [x] 3.4 Create comments database migration with character limits
  - [x] 3.5 Set up class association for users after authentication
  - [x] 3.6 Create Zustand store for class and feed state management
  - [x] 3.7 Build class welcome confirmation screen
  - [x] 3.8 Implement class context display in app header
  - [x] 3.9 Set up RLS policies for class-based content isolation
  - [x] 3.10 Create demo data seed with 5 fake classmates and sample posts
  - [x] 3.11 Validate demo content quality: ensure image URLs work, comments display properly, and timer states are realistic for consistent demo experience
  - [x] 3.12 Create demo refresh system: build script to reset demo data with fresh timestamps (NOW() + intervals) for reliable multi-session demos
  - [x] 3.13 Implement single-device testing architecture: update demo seed to use relative timestamps instead of fixed dates to prevent timer display issues

- [ ] **4.0 Glass Morphism Feed Display (Artwork-as-Background System)**
  - [ ] 4.1 Replace current solid card UI with artwork-as-background feed: each post artwork fills entire screen with dark gradient overlay (rgba(0,0,0,0.3) to transparent) - uses existing GlassMorphismCard component and Colors.ts system
  - [ ] 4.2 Create glass morphism feed card components: Top card (post info), Bottom-left card (stats), Bottom-right card (actions) with exact UIDesign.md positioning (20px margins) - leverages existing Primary/Secondary Glass Card specs
  - [ ] 4.3 Implement vertical swipe navigation between posts with smooth artwork crossfades (400ms ease-out transitions)
  - [ ] 4.4 Build FeedPost component with Primary Glass Card specs for post info: artist name (Instrument Serif 18pt white), class name (Montserrat 12pt rgba(255,255,255,0.7)), timer (Montserrat 14pt white) - uses existing ThemedText typography system
  - [ ] 4.5 Create bottom-left stats card with Secondary Glass specs: view count "3 of 5 viewers" (Montserrat 12pt), time remaining "Expires in 18 min" (Montserrat 11pt)
  - [ ] 4.6 Build bottom-right actions card with Secondary Glass specs: camera icon (24px white), AI feedback icon, comment icon with count, 12px gaps between buttons
  - [ ] 4.7 Replace current sharing controls with glass morphism card centered over artwork: viewer limit slider (warm sage accent), duration pills (30min/2hrs/tomorrow), "Share with Class" button (warm sage background)
  - [ ] 4.8 Implement glass morphism typography hierarchy: Instrument Serif for artist names/headers, Montserrat for all UI elements with exact UIDesign.md font sizes - typography system already complete in ThemedText.tsx
  - [ ] 4.9 Build skeleton screens maintaining glass morphism aesthetic: animated gradients from rgba(255,255,255,0.1) to rgba(255,255,255,0.2) with backdrop blur
  - [ ] 4.10 Create smooth loading states with glass morphism cards appearing (scale 0.95->1.0 with 300ms opacity fade-in)

- [ ] **5.0 Camera to Feed Connection & Post Creation System**
  - [ ] 5.1 Create PostService with database integration for ephemeral posts
  - [ ] 5.2 Build sharing controls interface with viewer limit slider and duration selection
  - [ ] 5.3 Implement seamless photo capture to post creation flow
  - [ ] 5.4 Add automatic navigation to feed tab after successful posting
  - [ ] 5.5 Create post creation confirmation with success feedback
  - [ ] 5.6 Integrate ephemeral post properties (max viewers, duration, expiration time)
  - [ ] 5.7 Connect camera upload service to feed display system
  - [ ] 5.8 Build post metadata collection (class association, timestamp)
  - [ ] 5.9 Implement immediate feed refresh after new post creation
  - [ ] 5.10 Add error handling and retry mechanism for post creation failures

- [ ] **6.0 Glass Morphism Social Features & Commenting System**
  - [ ] 6.1 Create full-screen artwork view with glass morphism comments overlay that slides up from bottom: higher opacity glass card (rgba(255,255,255,0.25)) with scrollable comment list
  - [ ] 6.2 Build CommentBubble component with glass morphism background and precise typography: user names (Instrument Serif 14pt white), comment text (Montserrat 14pt rgba(255,255,255,0.9)), timestamps (Montserrat 11pt rgba(255,255,255,0.5))
  - [ ] 6.3 Implement comment input with glass morphism styling: background rgba(255,255,255,0.2), border rgba(255,255,255,0.3), placeholder rgba(255,255,255,0.5), character counter (subtle, appears when typing)
  - [ ] 6.4 Create user names in Instrument Serif 14pt white over artwork backgrounds with 12px spacing between comments per UIDesign.md
  - [ ] 6.5 Add comment text in Montserrat 14pt rgba(255,255,255,0.9) with proper line height (1.4-1.5x) and padding within glass morphism comment bubbles
  - [ ] 6.6 Implement timestamp display in Montserrat 11pt rgba(255,255,255,0.5) positioned below comment text with consistent spacing
  - [ ] 6.7 Create comment submission with warm sage accent send button (#8B9D83) and paper plane icon, integrated on right side of multi-line input
  - [ ] 6.8 Build encouraging pre-populated demo comments with glass morphism styling: "Beautiful work on the shading!", "Love the composition!", "The texture details are amazing!"
  - [ ] 6.9 Add smooth comment appearance animations: slide up and fade (300ms) maintaining glass morphism backdrop blur throughout
  - [ ] 6.10 Implement real-time comment updates with glass morphism aesthetic: new comments appear with scale from 0.95 to 1.0 plus opacity fade-in

- [ ] **7.0 Glass Morphism AI Feedback Integration System**
  - [ ] 7.1 Create "Get AI Feedback" button in bottom-right actions card with glass morphism styling and warm tan accent (#B8956A) - only visible on user's own posts
  - [ ] 7.2 Implement AI feedback display as large glass morphism card with higher opacity (rgba(255,255,255,0.25)) centered over artwork background
  - [ ] 7.3 Add "AI Feedback" header in Instrument Serif 18pt white with proper spacing within glass card per UIDesign.md specifications
  - [ ] 7.4 Create elegant loading states with skeleton screen: animated gradient from rgba(255,255,255,0.1) to rgba(255,255,255,0.2) maintaining backdrop blur
  - [ ] 7.5 Display "Analyzing your artwork..." in Montserrat 12pt rgba(255,255,255,0.7) during 2-3 second processing with realistic progression
  - [ ] 7.6 Format AI response text in Montserrat 14pt rgba(255,255,255,0.9) with encouraging, constructive tone and proper line height (1.4-1.5x)
  - [ ] 7.7 Add dismissal interaction: tap outside card or X button (top-right) with smooth fade-out animation (300ms) maintaining glass aesthetic
  - [ ] 7.8 Position AI feedback button in bottom-right actions card alongside camera/comment icons with 12px gaps per UIDesign.md positioning specs
  - [ ] 7.9 Set up OpenAI API account, obtain GPT-4V access keys, and implement via Supabase Edge Functions for artwork analysis
  - [ ] 7.10 Ensure AI feedback button only appears on user's own posts with consistent glass morphism styling (Secondary Glass specs for icon button)

- [ ] **8.0 Glass Morphism Ephemeral Content Management System**
  - [ ] 8.1 Create countdown timer in Montserrat 14pt white within top glass card showing exact time remaining with live updates
  - [ ] 8.2 Implement live seconds display with smooth number transitions and proper typography (Montserrat Regular) maintaining glass morphism backdrop blur
  - [ ] 8.3 Add "Expires in X min" text in Montserrat 11pt rgba(255,255,255,0.7) in bottom-left stats card with consistent spacing
  - [ ] 8.4 Create post expiration with 2-second fade-out plus scale to 0.95 animation maintaining glass morphism aesthetic throughout transition
  - [ ] 8.5 Implement smooth artwork crossfade when posts expire and reorganize: 400ms ease-out transitions with glass cards maintained during artwork transitions
  - [ ] 8.6 Build visual countdown warnings for last 60 seconds with subtle glass morphism effects: gentle pulsing of timer text, no jarring color changes
  - [ ] 8.7 Create 5-second "undo" option with glass morphism popup after deletion: centered glass card with "Undo" button using warm sage accent (#8B9D83)
  - [ ] 8.8 Add peaceful transition animations maintaining glass aesthetic: all ephemeral actions use smooth scale/fade transitions rather than abrupt changes
  - [ ] 8.9 Implement automatic cleanup with smooth feed reorganization: expired posts fade out gracefully while maintaining glass morphism cards for remaining content
  - [ ] 8.10 Create visual indicators for content lifecycle within glass cards: subtle timer progression without anxiety-inducing urgency, celebrating temporary nature



- [ ] **9.0 Performance Optimization & Testing**
  - [ ] 9.1 Optimize photo capture to launch under 1 second
  - [ ] 9.2 Ensure image upload completion within 3 seconds
  - [ ] 9.3 Optimize AI feedback response to under 5 seconds
  - [ ] 9.4 Implement real-time updates within 1 second latency
  - [ ] 9.5 Test ephemeral cleanup within 1 minute of expiration
  - [ ] 9.6 Optimize app startup time for smooth demo experience
  - [ ] 9.7 Test memory usage during extended demo sessions
  - [ ] 9.8 Verify smooth animations on target iOS devices
  - [ ] 9.9 Validate complete user journey from launch to AI feedback
  - [ ] 9.10 Conduct comprehensive demo readiness testing



### Notes

**Implementation Priority:**
- **Phase 1** : Complete tasks 3.0-4.0 for basic class and feed functionality (includes demo content and glass morphism UI)
- **Phase 2** : Implement task 5.0 for camera-to-feed connection
- **Phase 3** : Build tasks 6.0-7.0 for social features and AI integration  
- **Phase 4** : Implement task 8.0 for ephemeral features
- **Phase 5** : Polish with task 9.0 for production-ready experience

**Key Architectural Decisions:**
- Maintain single-device testing approach with pre-populated content
- Use Supabase Realtime for live comment updates and feed synchronization

- Focus on anxiety-reducing, confidence-building user experience
- Live countdown timers demonstrate ephemeral nature
- AI feedback only appears on user's own posts

---

## 🚨 CRITICAL REWORK REQUIRED

**The existing codebase was built for "VEO Creative Image Messenger" and does NOT match the Draft PRD requirements. Major components need complete rebuilding:**

### **Immediate Priority (Must Fix First):**
1. **Glass Morphism Feed**: Replace traditional card layout with artwork-as-background system
2. **Class Joining Flow**: Add class code entry modal when accessing class feed
3. **Typography**: Replace SpaceMono with Instrument Serif + Montserrat
4. **Design System**: Implement complete glass morphism UI replacing current solid UI
5. **Feed Display**: Build full-screen artwork posts with glass morphism overlay cards

### **Architecture Mismatch:**
- **Current**: Email registration → username setup → group messaging with AI image generation
- **Required**: Email registration → class code entry → ephemeral art sharing with AI feedback

### **Files Requiring Major Updates:**
- `app/(tabs)/index.tsx` - Traditional card layout, needs glass morphism artwork-as-background system
- `app/(auth)/profile-setup.tsx` - Needs simplification for Draft requirements
- `constants/Colors.ts` - Needs glass morphism color specifications
- `components/ThemedText.tsx` - Needs Instrument Serif + Montserrat typography

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