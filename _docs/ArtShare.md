# EphemeralArt - Temporary Art Sharing Platform

## Project Description
A mobile app for art students to share works-in-progress in low-pressure, ephemeral environments. Students join class groups via teacher-provided codes, share artwork with controlled visibility and timing, and receive peer feedback and optional AI guidance. The app can transform casual sketches into gallery-worthy presentations through optional professional framing. MVP focuses on core sharing functionality with realistic sample data for single-device testing.

## Target Audience
**Primary**: Art students in structured drawing/painting classes  
**Use case**: Alex, taking a drawing class, wants to share a quick sketch with 3-5 classmates for 30 minutes before bed

## Desired Features

### Core Functionality
- [ ] **Two-step authentication**: 
   - [ ] Initial login with email and password
   - [ ] Separate "Join a Class" button and class code entry
- [ ] Join class groups via 6-digit codes (e.g., "DRAW01")
- [ ] In-app camera for artwork photography
- [ ] **Optional Frame System**: Apply gallery-style frames to artwork photos
   - [ ] Default: No frame
   - [ ] Optional "Add Frame" button after photo capture
   - [ ] 4-6 frame styles available when selected
   - [ ] Live preview with horizontal frame selector
- [ ] Basic sharing controls (max viewers: 1-20, duration: 10min-24hrs)
   - [ ] Slider interface for viewer limits
   - [ ] Preset duration options (30 min, 2 hours, until tomorrow)
- [ ] **Time-based auto-deletion**: Posts delete after specified time duration
   - [ ] Live countdown timers on all posts
   - [ ] Smooth fade-out animation when posts expire
- [ ] **Static viewer display**: Show viewer count from pre-populated data

### Social Features
- [ ] **Simple peer commenting**: Text-based comments only
   - [ ] Character limit (100-150 chars) with counter
   - [ ] No threading - flat comment structure
   - [ ] Real-time comment updates for new comments
   - [ ] Full-screen artwork view when tapping posts
- [ ] Class-based group feeds with sample content
   - [ ] Posts from fake classmates with realistic artwork
   - [ ] Encouraging pre-populated comments

### AI Features
- [ ] Optional AI feedback button (appears on user's own posts)
- [ ] GPT-4V analysis with encouraging, actionable art advice
- [ ] Loading states with elegant skeleton screens
- [ ] No rate limiting for MVP

### Navigation & Structure
- [ ] Simple tab navigation (Feed, Camera)
- [ ] Launch screen with app branding
- [ ] Welcome screen after initial login
- [ ] Prominent "Join a Class" interface
- [ ] Success confirmations for posting and joining class
- [ ] Class name display in header

## Technology Stack

### Frontend Development
- [ ] **Framework**: React Native with Expo for cross-platform mobile development
- [ ] **Build Tool**: Expo CLI for rapid development and testing
- [ ] **Styling**: NativeWind (Tailwind CSS for React Native) for consistent design system
- [ ] **State Management**: Zustand for lightweight state management
- [ ] **Navigation**: React Navigation for tab and screen navigation
- [ ] **Camera Integration**: Expo Camera API for photo capture
- [ ] **Image Processing**: Expo ImageManipulator for frame overlay compositing

### Backend & Database
- [ ] **Backend-as-a-Service**: Supabase for full backend functionality
- [ ] **Database**: PostgreSQL (via Supabase) for user, class, post, and comment data
- [ ] **Authentication**: Supabase Auth for simple name-based login
- [ ] **Real-time Features**: Supabase Realtime for live comment updates
- [ ] **File Storage**: Supabase Storage for artwork images and frame assets
- [ ] **Functions**: Supabase Edge Functions for AI integration and post deletion logic

### AI Integration
- [ ] **AI Service**: OpenAI GPT-4V API for artwork analysis and feedback
- [ ] **API Management**: Direct API calls through Supabase Edge Functions
- [ ] **Image Analysis**: GPT-4V vision capabilities for art critique and suggestions

### Development & Deployment
- [ ] **Version Control**: Git with GitHub for code management
- [ ] **Testing**: Expo development build for device testing
- [ ] **Deployment**: Expo Application Services (EAS) for app building and distribution
- [ ] **Environment Management**: Expo environment variables for API keys and configuration

### Asset Management
- [ ] **Frame Assets**: High-quality PNG overlays with transparency
- [ ] **Image Optimization**: Expo ImageManipulator for compression and resizing
- [ ] **Font Integration**: Refer to UIDesign.md

## Design Requests

### Visual Identity
- Refer to UIDesign.md

### Interface Design
- [ ] **Camera-first layout**: Full-screen capture with minimal, translucent controls
   - [ ] Clean viewfinder with subtle grid lines option
   - [ ] Optional "Add Frame" button after photo capture
   - [ ] Large, centered camera button on main feed
- [ ] **Art-centric presentation**: Artwork displayed at maximum size
   - [ ] User names in Instrument Serif for personal touch
   - [ ] Simple text comments below artwork
   - [ ] Clear time remaining indicators for post deletion
   - [ ] Smooth animations for post expiration and comment additions

### Typography Hierarchy
- [ ] **Headers**: Instrument Serif, 24-32pt, medium weight
- [ ] **User names/Artist credits**: Instrument Serif, 16-18pt, regular weight  
- [ ] **Body text/Comments**: Montserrat, 14-16pt, regular weight
- [ ] **UI labels/Buttons**: Montserrat, 12-14pt, medium weight
- [ ] **Metadata/Timestamps**: Montserrat, 11-12pt, light weight

### User Experience Polish
- [ ] **Micro-animations**: Smooth 200-300ms transitions throughout
   - [ ] Shutter animation with haptic feedback
   - [ ] Comment appearance animations
   - [ ] Post expiration fade-outs
- [ ] **Progressive disclosure**: Show complexity only when needed
- [ ] **Professional but approachable**: Sophisticated typography without being intimidating

## Other Notes
- Teachers create classes and distribute join codes
- Completely ephemeral - no private saving options
- **Single-device testing approach**: Pre-populated database with sample posts, comments, and users from fake classmates (Maya, Jordan, Sam, Casey, Riley)
- **Sample data includes**: 1 test class "Monday Drawing Fundamentals" (DRAW01) with 2-3 realistic artwork posts and encouraging comments
- User can post new content and comment on existing sample posts
- Frame selection is optional enhancement, default is no frame
- Focus on anxiety-reducing, confidence-building user experience
- Live countdown timers demonstrate ephemeral nature
- AI feedback only appears on user's own posts
- **Authentication flow**: Name entry → Welcome screen → Join class button → Class code entry → Feed access