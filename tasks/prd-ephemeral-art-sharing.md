# EphemeralArt - Product Requirements Document

---

## Introduction/Overview

Draft is a mobile application designed to reduce anxiety and pressure for art students when sharing works-in-progress. The platform creates a low-pressure, ephemeral environment where students join class groups via teacher-provided codes, share artwork with controlled visibility and timing, and receive peer feedback and unlimited AI guidance. 

**Problem Statement**: Art students, particularly those learning foundational skills, experience significant anxiety when sharing unfinished work due to fear of judgment, perfectionism, and social pressure in traditional critique environments.

**Solution**: A clean, elegant mobile app that makes sharing artwork as frictionless as possible through ephemeral content (auto-deletion after specified time), controlled audience sizes, encouraging peer interactions, and optional AI feedback for personal growth.

**Core Value Proposition**: Transform the vulnerable act of sharing work-in-progress into a confidence-building, anxiety-reducing experience that accelerates learning through supportive peer feedback.

---

## Goals

### Primary Goals
1. **Reduce Sharing Anxiety**: Create the lowest possible friction for art students to share work-in-progress by removing permanence and limiting audience
2. **Foster Peer Learning**: Enable structured, encouraging feedback within class environments that builds confidence rather than judgment
3. **Accelerate Skill Development**: Provide unlimited AI feedback that offers constructive, actionable guidance for artistic improvement
4. **Demonstrate Technical Feasibility**: Build a fully functional prototype showcasing ephemeral content, real-time features, and AI integration

### Secondary Goals
5. **Validate User Experience**: Test the anxiety-reduction hypothesis through clean, elegant UI that prioritizes ease of use over feature complexity
6. **Establish Technical Foundation**: Create scalable architecture that can evolve from single-device demo to multi-user production system

---

## User Stories

### Core User Journey - "Alex the Art Student"
**Primary Persona**: Alex, an art student in "Monday Drawing Fundamentals" who wants to share a quick sketch with 3-5 classmates for feedback without long-term exposure or judgment.

#### Authentication & Onboarding
- **US-1**: As Alex, I want to enter my name and class code so I can quickly join my art class without complex registration
- **US-2**: As Alex, I want to see a welcoming confirmation so I know I've successfully joined "Monday Drawing Fundamentals"

#### Discovering Class Activity  
- **US-3**: As Alex, I want to immediately see realistic posts from classmates (Maya, Jordan, Sam, Casey, Riley) so I understand how the platform works and feel part of an active community
- **US-4**: As Alex, I want to see countdown timers on posts so I understand the ephemeral nature and feel less pressure about permanence
- **US-5**: As Alex, I want to read encouraging comments from classmates so I see the supportive tone and expectations

#### Sharing Artwork
- **US-6**: As Alex, I want a large, prominent camera button so I can easily capture my artwork without hunting for features
- **US-7**: As Alex, I want a clean camera interface with subtle guides so I can focus on photographing my work properly
- **US-8**: As Alex, I want to optionally add a gallery frame to my artwork so I can present it more professionally if desired
- **US-9**: As Alex, I want simple sharing controls (viewer limit, duration) so I can maintain control over who sees my work and for how long
- **US-10**: As Alex, I want clear confirmation when I post so I know my artwork has been shared successfully

#### Receiving & Giving Feedback
- **US-11**: As Alex, I want to tap on classmates' artwork to view it full-screen so I can appreciate the details and provide thoughtful feedback
- **US-12**: As Alex, I want a simple comment box with character limits so I can leave encouraging feedback without overthinking length
- **US-13**: As Alex, I want to see my comments appear immediately so I know my support has been shared
- **US-14**: As Alex, I want to receive peer comments on my work so I get the validation and feedback I'm seeking

#### AI-Powered Learning
- **US-15**: As Alex, I want an "AI Feedback" button on my own posts so I can get personalized guidance whenever I need it
- **US-16**: As Alex, I want encouraging, actionable AI advice so I can improve my technique without feeling criticized
- **US-17**: As Alex, I want unlimited AI feedback so I can learn and iterate without artificial constraints

#### Ephemeral Experience
- **US-18**: As Alex, I want to watch posts naturally disappear after their timer expires so I experience the anxiety-reducing nature of temporary sharing
- **US-19**: As Alex, I want smooth animations when content expires so the ephemeral nature feels intentional and peaceful rather than jarring

---

## Functional Requirements

### Authentication System
1. **User Login**: The system must provide an elegant login page requiring the users email and password. (using Supabase Auth)
2. **Simple Name + Code Entry**: The system must provide a streamlined class registration requiring only a name and 6-digit class code (e.g., "DRAW01")
3. **Class Validation**: The system must validate class codes and display the full class name upon successful entry (e.g., "Monday Drawing Fundamentals")
4. **Session Persistence**: The system must remember the user's session so they don't need to re-enter information on app restart

### Pre-populated Demo Environment
4. **Fake Classmate System**: The system must display realistic posts from 5 pre-populated users (Maya, Jordan, Sam, Casey, Riley) with authentic artwork and encouraging comments
5. **Sample Content Variety**: The system must show diverse artwork examples (charcoal sketches, pencil drawings, various subjects) to demonstrate the platform's versatility
6. **Realistic Engagement**: The system must display varied viewer counts, time remaining, and comment interactions to simulate an active class environment

### Camera & Photo Capture
7. **Prominent Camera Access**: The system must provide a large, centered camera button on the main feed for immediate photo capture
8. **Clean Camera Interface**: The system must offer a full-screen viewfinder with subtle grid lines and minimal UI distractions
9. **Quality Capture Settings**: The system must capture photos with appropriate quality for artwork sharing (optimized file size vs. detail)
10. **Haptic Feedback**: The system must provide gentle haptic feedback during photo capture for tactile confirmation

### Optional Frame System
11. **Frame Selection Interface**: The system must offer an optional "Add Frame" button after photo capture
12. **Frame Variety**: The system must provide 2-3 gallery-style frame options via horizontal swipe carousel
13. **Live Preview**: The system must show real-time preview of frames applied to the user's artwork
14. **Default No Frame**: The system must default to no frame, making framing purely optional enhancement

### Sharing Controls & Post Creation
15. **Viewer Limit Control**: The system must provide a slider interface allowing users to set maximum viewers from 1-20 (default: 5)
16. **Duration Selection**: The system must offer preset duration options ("10 seconds", "1 minute", "30 minutes", "2 hours", "Until tomorrow")
17. **Clear Posting Confirmation**: The system must provide clear success feedback when posts are created
18. **Immediate Feed Update**: The system must display new posts at the top of the feed immediately after creation

### Social Features & Commenting
19. **Full-screen Artwork View**: The system must allow users to tap posts for full-screen viewing and detailed examination
20. **Character-Limited Comments**: The system must provide a comment box with 100-150 character limit and live counter
21. **Real-time Comment Updates**: The system must display new comments immediately with smooth animations
22. **Encouraging Comment Tone**: The system must pre-populate sample comments that demonstrate supportive, constructive feedback patterns

### AI Feedback Integration
23. **AI Feedback Button**: The system must show "Get AI Feedback" button only on the user's own posts
24. **Unlimited AI Access**: The system must allow users to request AI feedback without rate limiting or usage caps
25. **Loading States**: The system must provide elegant loading animations during AI processing (target: 3 seconds)
26. **Constructive AI Response**: The system must deliver encouraging, actionable feedback that focuses on improvement opportunities rather than criticism

### Ephemeral Content Management
27. **Live Countdown Timers**: The system must display real-time countdown timers on all posts showing time until deletion
28. **Automatic Deletion**: The system must automatically remove posts when their specified duration expires
29. **Smooth Expiration Animation**: The system must use fade-out animations when posts expire to create peaceful rather than jarring transitions
30. **Post-Deletion Feed Update**: The system must smoothly reorganize remaining posts when content is removed

### User Interface & Navigation
31. **Clean Typography Hierarchy**: The system must use Instrument Serif for user names/headings and Montserrat for body text/UI elements
32. **Monochromatic Color Scheme**: The system must use white backgrounds, charcoal text (#2C2C2C), with single accent color for critical actions
33. **Minimal Tab Navigation**: The system must provide simple two-tab interface ("Class Feed" and "Camera") with clean visual design
34. **Class Context Display**: The system must show class name in header ("Monday Drawing Fundamentals") for user orientation

---

## Non-Goals (Out of Scope)

### Explicitly Excluded Features
- **Complex User Profiles**: No detailed profile creation, skill levels, or user customization beyond name entry
- **Advanced Teacher Controls**: No moderation tools, analytics access, or administrative features for teachers
- **Content Moderation**: No automated filtering, reporting systems, or content review processes
- **Offline Functionality**: No offline photo capture, comment drafting, or data synchronization capabilities
- **Multi-Class Management**: No ability for users to join multiple classes or switch between class contexts
- **Direct Messaging**: No private messaging between individual users outside of class feed
- **Advanced Frame Features**: No custom frame uploads, frame editing, or professional publishing tools
- **Social Discovery**: No mechanisms to find other classes, users, or public content beyond assigned class
- **Analytics & Reporting**: No usage tracking, learning outcome measurement, or progress reporting features
- **Monetization Features**: No paid features, premium content, or in-app purchases

### Technical Limitations for MVP
- **Real Multi-User System**: Single-device testing approach with pre-populated content rather than true multi-user architecture
- **Production Authentication**: Simplified name/code system rather than full account management
- **Advanced Error Handling**: Basic error states without comprehensive offline recovery or network resilience
- **Cross-Platform Optimization**: iOS-focused development without Android optimization

---

## Design Considerations

### Visual Identity & Aesthetic
The design must embody "monochromatic elegance" that reduces visual clutter and creates a calming, professional environment conducive to sharing vulnerable creative work.

**Core Design Principles:**
- **Minimalism Over Features**: Every UI element must justify its presence; remove rather than add
- **Whitespace as Comfort**: Generous spacing creates breathing room that reduces visual anxiety
- **Typography as Personality**: Instrument Serif adds warmth for personal elements (names, titles) while Montserrat provides clarity for functional text
- **Single Accent Color**: One carefully chosen accent color for critical actions maintains focus and prevents overwhelm

### Key Interface Patterns

#### Launch & Authentication Flow
- **Launch Screen**: Clean white background with "Draft" in elegant Instrument Serif, minimal loading indicators
- **Login Interface**: Simple centered form with "Your Name" and "Class Code" fields, large "Join Class" button
- **Welcome Confirmation**: Warm confirmation message "Welcome to [Class Name], [User Name]!" with smooth transition

#### Feed Design Philosophy
- **Art-Centric Layout**: Artwork displayed at maximum comfortable size to honor the creative work
- **Subtle Metadata**: View counts, timers, and user names present but not competing with artwork for attention
- **Encouraging Comment Style**: Comments styled to feel supportive rather than critical, with adequate spacing between responses

#### Camera & Capture Experience
- **Full-Screen Immersion**: Camera interface takes full screen to create focused, professional capture environment
- **Minimal Control Overlay**: Essential controls (capture button, flash toggle) with translucent backgrounds
- **Guided Composition**: Subtle grid lines available but not forced, respecting user's artistic autonomy

### Animation & Interaction Design
- **Gentle Transitions**: 200-300ms duration for all animations, creating smooth rather than snappy interactions
- **Haptic Reinforcement**: Tactile feedback for key actions (photo capture, posting) to provide confirmation without visual disruption
- **Progressive Disclosure**: Advanced features (framing, detailed controls) revealed only when requested to avoid overwhelming new users
- **Peaceful Ephemeral Transitions**: Content expiration handled with graceful fade-outs rather than abrupt removal

### Responsive & Accessibility Considerations
- **Mobile-First Design**: All layouts optimized for smartphone usage with thumb-friendly interaction zones
- **Readable Typography**: Font sizes appropriate for viewing artwork details and reading comments comfortably
- **Adequate Touch Targets**: All interactive elements meet minimum 44px touch target guidelines
- **Clear Visual Hierarchy**: Consistent spacing, sizing, and color usage to guide user attention naturally

---

## Technical Considerations

### Technology Stack
- **Frontend Framework**: React Native with Expo for cross-platform mobile development
- **Backend Services**: Supabase for authentication, database, storage, and real-time features
- **AI Integration**: OpenAI GPT-4V API via Supabase Edge Functions for artwork analysis and feedback
- **Image Processing**: Expo ImageManipulator for frame overlay compositing and photo optimization
- **State Management**: Zustand for lightweight, scalable app state management
- **Styling System**: NativeWind (Tailwind CSS for React Native) for consistent design implementation

### Database Schema Requirements

```sql
-- Class management
classes (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  join_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User profiles (simplified for demo)
users (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  class_id UUID REFERENCES classes(id),
  is_demo_user BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Artwork posts with ephemeral properties
posts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  class_id UUID REFERENCES classes(id),
  image_url TEXT NOT NULL,
  frame_style TEXT, -- Optional frame selection
  max_viewers INTEGER DEFAULT 5,
  view_count INTEGER DEFAULT 0,
  duration_minutes INTEGER NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Peer comments with character limits
comments (
  id UUID PRIMARY KEY,
  post_id UUID REFERENCES posts(id),
  user_id UUID REFERENCES users(id),
  content TEXT NOT NULL CHECK (length(content) <= 150),
  created_at TIMESTAMP DEFAULT NOW()
);

-- AI feedback requests and responses
ai_feedback (
  id UUID PRIMARY KEY,
  post_id UUID REFERENCES posts(id),
  user_id UUID REFERENCES users(id),
  feedback_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Performance Requirements
- **Photo Capture**: Immediate camera launch (<1 second) with smooth viewfinder performance
- **Image Upload**: Photo processing and upload completion within 3 seconds on typical mobile connections
- **AI Feedback**: GPT-4V analysis and response delivery within 5 seconds of request
- **Real-time Updates**: Comment and interaction updates propagated to all class members within 1 second
- **Ephemeral Cleanup**: Expired content removal processed within 1 minute of expiration time

### Security & Privacy Considerations
- **Limited Data Collection**: Only essential information stored (name, class association, posts within time limits)
- **Automatic Data Deletion**: All posts and associated data permanently removed after specified duration
- **Class Isolation**: Users can only access content within their assigned class group
- **AI Processing**: Artwork images sent to OpenAI only for users who explicitly request AI feedback

### Demo-Specific Technical Requirements
- **Pre-populated Content**: Seed database with 5 realistic user profiles and 3-4 high-quality artwork posts
- **Realistic Timers**: Set expiration times on demo content to demonstrate ephemeral behavior during demonstrations
- **Comment Examples**: Pre-populate encouraging comments that model the desired supportive tone
- **Single-Device Architecture**: Design data flow to work seamlessly on single device without requiring multiple user accounts

---

## Success Metrics

### Primary Success Criteria (User Experience)
1. **Friction Reduction**: Users can complete the full flow from opening app to posting artwork in under 2 minutes
2. **Feature Adoption**: 100% of demo users successfully post their own artwork after viewing pre-populated content
3. **AI Engagement**: Users request AI feedback on average 2+ times per demo session
4. **Emotional Response**: Qualitative feedback indicates reduced anxiety compared to traditional critique environments

### Technical Success Criteria
5. **Performance Benchmarks**: All interactions meet specified response time requirements (camera <1s, upload <3s, AI <5s)
6. **Reliability**: Zero crashes during demo sessions with proper error handling for network connectivity issues
7. **Visual Polish**: UI implementation matches design specifications with smooth animations and proper typography
8. **Ephemeral Functionality**: Automatic content deletion works reliably with proper cleanup of storage and database entries

### Demonstration Readiness
9. **Complete User Journey**: Full walkthrough from launch to AI feedback completion works flawlessly
10. **Content Quality**: Pre-populated artwork and comments create realistic, engaging class environment
11. **Platform Stability**: App performs consistently across multiple demo sessions without requiring resets
12. **Value Proposition Clarity**: Observers can immediately understand the anxiety-reduction benefits from watching the demo

---

## Open Questions

### User Experience Refinements
1. **Optimal Timer Granularity**: Should countdown displays show minutes/seconds for short durations, or keep format consistent? **Answer**: If it is not too technically difficult I would like a seconds timer.
2. **Comment Notification Strategy**: How should users be notified of new comments on their posts without creating pressure to respond immediately? **Answer**: Don't worry about notifications right now
3. **Frame Selection UX**: Should frame preview be mandatory after photo capture, or truly optional with easy skip? **Answer**: Easy skip

### Technical Implementation Details
4. **AI Feedback Personalization**: Should AI responses consider user's skill level or previous work, or maintain general encouraging tone? **Answer**: If possible, this can be refined later
5. **Image Quality Optimization**: What's the optimal balance between image quality and upload/storage performance for artwork sharing? **Answer**: To begin with, image quality is not a big deal.
6. **Demo Content Refresh**: How frequently should pre-populated content be updated to maintain realistic feel across multiple demonstrations? **Answer**: How difficult would it be to generate a second set of synthetic data that could be toggled between? Should this be made now or later?

### Future Scalability Considerations
7. **Multi-Class Architecture**: When transitioning from demo to production, how should users handle enrollment in multiple classes? dont worry about it. 
8. **Teacher Feedback Integration**: Should teachers have any visibility into class activity for pedagogical purposes, while maintaining student privacy? don't worry about it. 
9. **Cross-Platform Expansion**: What additional considerations are needed for Android compatibility beyond the initial iOS focus? i want this to be cross platform, but i am developing this on ios and thats the priority

---

## Implementation Phases

### Phase 1: Core Foundation 
**Authentication & Demo Environment**
- Clean email and password login system
- Simple name/class code login system
- Pre-populated class with 5 demo users and sample posts
- Basic feed display with realistic artwork and comments
- Class welcome confirmation and navigation

### Phase 2: Photo Capture & Sharing 
**Camera Integration & Post Creation**
- Camera interface with full-screen viewfinder
- Photo capture with haptic feedback
- Basic sharing controls (viewers, duration)
- Post creation and feed integration

### Phase 3: Social Features 
**Comments & Interactions**
- Full-screen artwork viewing
- Comment creation with character limits
- Real-time comment display and updates
- Encouraging interaction patterns

### Phase 4: AI Integration  
**Intelligent Feedback System**
- OpenAI GPT-4V integration via Supabase Edge Functions
- AI feedback button on user's own posts
- Loading states and response display
- Unlimited feedback request handling

### Phase 5: Ephemeral Features 
**Time-based Content Management**
- Live countdown timer implementation
- Automatic post deletion system
- Smooth expiration animations
- Storage and database cleanup

### Phase 6: Polish & Frames 
**Optional Enhancements & Refinement**
- Gallery frame system with live preview
- UI polish and animation refinement
- Performance optimization
- Comprehensive demo testing

---

This PRD provides a comprehensive roadmap for building EphemeralArt as an anxiety-reducing, ephemeral art sharing platform that prioritizes clean design, simple interactions, and confidence-building features for art students. 