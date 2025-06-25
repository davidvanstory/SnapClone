# VEO Creative Image Messenger
## Product Requirements Document

---

## Introduction/Overview

VEO Creative Image Messenger is an ephemeral messaging platform designed for Gen Z and millennial users who want to connect through creative, AI-enhanced conversations. The core innovation combines real-time text-to-image AI generation with ephemeral messaging - users create text prompts that transform into AI-generated images using Google's Imagen-4, which are then shared in group chats and automatically deleted after 24 hours.

**Problem Statement**: Traditional messaging apps rely on static text, photos, and emojis. Users want more creative, surprising ways to express themselves digitally without the permanence that creates social anxiety.

**Solution**: An AI-first messaging platform where creativity meets spontaneity - users send text prompts that become AI-generated images, creating unexpected, entertaining conversations that disappear after 24 hours.

---

## Goals

1. **Primary Goal**: Create a functional prototype demonstrating AI-powered ephemeral messaging with seamless text-to-image generation
2. **User Engagement**: Enable users to express creativity through AI-generated content in group conversations
3. **Technical Validation**: Prove the viability of real-time AI image generation within messaging workflows
4. **User Experience**: Deliver an intuitive, mobile-first interface that makes AI image creation accessible to non-technical users
5. **Performance**: Achieve consistent image generation within 15 seconds with >95% success rate

---

## User Stories

### Authentication & Onboarding
- **US-1**: As a new user, I want to register with email and password so I can create my account and start using. If email is to hard to set up suggest other options.
- **US-2**: As a returning user, I want to login with my credentials so I can access my groups and message history
- **US-3**: As a user, I want a simple onboarding flow so I understand how to create AI images from text prompts

### Group Management
- **US-4**: As a user, I want to create a new group so I can start messaging with friends
- **US-5**: As a user, I want to join existing groups so I can participate in ongoing conversations
- **US-6**: As a user, I want to see my active groups so I can choose where to send my AI-generated images

### AI Image Creation & Messaging
- **US-7**: As a user, I want to type a custom text prompt so I can generate exactly what I'm imagining
- **US-8**: As a user, I want to select from categorized prompt suggestions (style, mood, subject) so I can easily create interesting images
- **US-9**: As a user, I want to combine multiple prompt categories so I can create more complex, personalized images
- **US-10**: As a user, I want to see real-time processing status so I know when my AI image will be ready
- **US-11**: As a user, I want to send my generated image to a group so friends can see my creative expression
- **US-12**: As a user, I want to view AI-generated images from other group members so I can enjoy the creative conversation

### Ephemeral Experience
- **US-13**: As a user, I want my images to automatically delete after 24 hours so conversations stay spontaneous and anxiety-free
- **US-14**: As a user, I want to see a countdown timer on images so I know when they'll disappear

---

## Functional Requirements

### Authentication System
1. The system must provide email/password registration with basic validation. 
2. The system must provide secure login/logout functionality via Supabase Auth
3. The system must maintain user session state across app restarts
4. The system must allow users to create a simple profile with username and optional avatar

### Group Management
5. The system must allow users to create new groups with custom names
6. The system must enable users to join groups via invite links or group codes
7. The system must display a list of user's active groups
8. The system must support flexible group sizes (starting with small groups for testing)

### AI Image Generation
9. The system must provide a text input interface for custom prompts with character limit (500 characters)
10. The system must offer categorized prompt suggestions:
    - **Style-based**: photorealistic, cartoon style, oil painting, anime, watercolor
    - **Mood-based**: epic fantasy, cozy atmosphere, dramatic lighting, mysterious, cheerful
    - **Subject-based**: cute animals, space scenes, food photography, landscapes, portraits
11. The system must allow users to combine multiple categories in a single prompt
12. The system must integrate with Replicate API using Google's Imagen-4 model
13. The system must process text-to-image generation via Supabase Edge Functions
14. The system must provide real-time status updates during processing (queued, processing, complete, failed)
15. The system must deliver generated images within 15 seconds under normal conditions

### Messaging & Sharing
16. The system must send completed AI-generated images to selected groups
17. The system must display images in group chat interface with sender information
18. The system must show image creation timestamp and countdown to deletion
19. The system must support image viewing in full-screen mode

### Ephemeral Content Management
20. The system must automatically delete images exactly 24 hours after creation
21. The system must run cleanup processes to remove expired content from storage
22. The system must show visual countdown indicators on images approaching deletion

### Error Handling & Reliability
23. The system must implement retry mechanism for failed image generation (up to 3 attempts)
24. The system must provide fallback error messages when AI generation fails permanently
25. The system must handle network connectivity issues gracefully
26. The system must cache user data locally for offline viewing of recent messages

---

## Non-Goals (Out of Scope)

- **Content Moderation**: No automated content filtering or moderation systems
- **Advanced Group Features**: No group admin roles, member permissions, or complex group settings
- **Video Generation**: Focus only on static image generation (not video)
- **Direct Messaging**: Only group messaging, no 1-on-1 chats
- **Advanced Analytics**: No user behavior tracking or detailed analytics
- **Monetization Features**: No paid features, subscriptions, or in-app purchases
- **Desktop/Web Versions**: Mobile-only focus for prototype phase
- **Advanced AI Models**: Only Google Imagen-4, no model selection or custom training

---

## Design Considerations

### User Interface Requirements
- **Mobile-First Design**: Optimized for iOS with cross-platform compatibility
- **Playful, Creative Aesthetic**: UI should reflect the fun, experimental nature of AI art creation
- **Intuitive Prompt Building**: Simple, guided interface for combining categories and custom text
- **Clear Status Communication**: Visual indicators for AI processing states (loading, progress, completion)
- **Ephemeral Visual Language**: Design elements that emphasize temporary nature of content

### Key Screen Flows
1. **Authentication Flow**: Register → Login → Simple Profile Setup
2. **Group Creation Flow**: Groups List → Create Group → Invite/Share Group Code
3. **AI Image Creation Flow**: Select Group → Build Prompt (Categories + Custom Text) → Generate → Review → Send
4. **Group Chat Flow**: Groups List → Select Group → View Messages → Create New Image
5. **Image Viewing Flow**: Tap Image → Full Screen → Countdown Timer → Sharing Options

### Technical UI Requirements
- React Native with Expo for cross-platform development
- NativeWind/Tailwind CSS for consistent styling
- Responsive design supporting various iOS device sizes
- Smooth animations for processing states and ephemeral countdown timers

---

## Technical Considerations

### Technology Stack
- **Frontend**: React Native + Expo SDK (cross-platform with iOS focus)
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions, Realtime, Storage)
- **AI Processing**: Replicate API with Google Imagen-4 model
- **Styling**: NativeWind/Tailwind CSS
- **State Management**: Zustand for app state management

### Database Schema
```sql
-- User authentication and profiles
users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Group management
groups (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  invite_code TEXT UNIQUE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

group_members (
  group_id UUID REFERENCES groups(id),
  user_id UUID REFERENCES users(id),
  joined_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (group_id, user_id)
);

-- AI prompt categories and templates
prompt_categories (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'style', 'mood', 'subject'
  description TEXT,
  popularity_score INTEGER DEFAULT 0
);

-- Generated images and messages
ai_messages (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  group_id UUID REFERENCES groups(id),
  original_prompt TEXT NOT NULL,
  selected_categories UUID[],
  generated_image_url TEXT,
  processing_status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  processing_started_at TIMESTAMP,
  processing_completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '24 hours'),
  replicate_prediction_id TEXT
);
```

### AI Integration Architecture
- **Supabase Edge Function**: Handles Replicate API communication
- **Realtime Updates**: WebSocket connection for processing status
- **Image Storage**: Supabase Storage with automatic cleanup
- **Error Handling**: Exponential backoff retry logic

### Performance Requirements
- Image generation: 5-15 seconds typical (Google Imagen-4 performance)
- Real-time updates: <1 second latency for status changes
- Image loading: <3 seconds for generated images
- App startup: <2 seconds on iOS devices

---

## Error Handling Recommendations

### Image Generation Failures
1. **Retry Strategy**: Implement automatic retry with exponential backoff (3 attempts max)
2. **Fallback Messages**: Clear user communication when generation fails permanently
3. **Partial Success Handling**: Allow users to modify prompts and try again
4. **Network Resilience**: Queue generation requests when offline, process when reconnected

### Specific Error Scenarios
- **Prompt Too Complex**: Suggest simplifying prompt or breaking into multiple images
- **API Rate Limits**: Queue requests and notify user of expected wait time
- **Content Policy Violations**: Generic "unable to generate" message with suggestion to modify prompt
- **Service Unavailable**: Temporary service message with retry option

### User Experience During Errors
- Clear error messages without technical jargon
- Actionable next steps for users
- Option to save prompts and retry later
- Graceful degradation when AI service is unavailable

---

## Success Metrics

### Technical Success Criteria
- **Generation Success Rate**: >95% of prompts successfully generate images
- **Processing Time**: Average generation time <10 seconds
- **System Uptime**: >99% availability during testing phase
- **Error Recovery**: >80% of failed generations succeed on retry

### User Experience Success Criteria
- **User Onboarding**: >80% of users complete registration and send first AI image
- **Feature Adoption**: >70% of users try prompt categories within first session
- **Engagement**: Users create average 5+ images per session
- **Retention**: >60% of users return within 48 hours for second session

### Business/Product Success Criteria
- **Core Functionality**: All 14 functional requirements fully implemented
- **Platform Stability**: App runs without crashes on target iOS devices
- **Scalability Readiness**: Architecture supports scaling to 100+ concurrent users
- **Demo Readiness**: Fully functional prototype suitable for investor/stakeholder demos

---

## Open Questions

1. **Prompt Optimization**: Should we implement prompt enhancement suggestions to improve generation success rates?
2. **Storage Costs**: With 24-hour ephemeral content, what's the optimal storage cleanup frequency?
5. **Group Discovery**: Do we need any mechanism for users to discover and join public groups?
6. **Image Quality Settings**: Should users have options for generation speed vs. quality trade-offs?
7. **Notification Strategy**: What notifications should users receive for new AI images in their groups?

---

## Implementation Priority

### Phase 1 
- User authentication and basic profiles
- Simple group creation and joining
- Basic text prompt input and AI generation
- Core messaging interface

### Phase 2 
- Prompt categories and suggestions
- Real-time processing status
- Ephemeral content deletion
- Error handling and retry logic

### Phase 3 
- UI/UX refinements
- Performance optimization
- Comprehensive testing
- Demo preparation 