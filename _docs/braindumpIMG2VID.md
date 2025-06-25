# VEO Creative Video Messenger
## Product Requirements Document

### Product Overview

Creative Video Messenger is an ephemeral video messaging platform that transforms photos into AI-generated videos using creative prompts. Users capture images, select AI prompts, and send transformed videos to friends through group messaging. Only the AI-generated video result is shared, creating surprising and entertaining conversations that automatically delete after 24 hours.

### Target Audience

Social media users who want to connect with friends through creative, AI-enhanced video content and enjoy spontaneous, humorous digital interactions.

---

## Core User Stories

1. **Authentication**: As a user, I want to authenticate with Supabase so I can access my groups and video history
2. **Group Creation**: As a user, I want to select from pre-populated fake users to create a 3-4 person group so I can share videos with multiple friends
3. **Image Capture**: As a user, I want to capture a photo with my phone camera so I can create an image to transform into video content
4. **Automatic Deletion**: As a user, I want my transformed videos to automatically delete after 24 hours so conversations stay ephemeral and spontaneous
5. **Image-to-Video Transformation**: As a user, I want to add an AI prompt to my image and send it to my group so friends receive a surprising AI-generated video
6. **Prompt Selection**: As a user, I want to choose from categorized prompt suggestions or create custom prompts so I can easily transform my videos in creative ways

---

## Technical Requirements

### Technology Stack
- **Frontend**: React Native with Expo for cross-platform mobile development
- **Backend**: Supabase (PostgreSQL, Edge Functions, Authentication, Storage, Realtime)
- **AI Processing**: Replicate API with minimax/video-01 model (free tier) for image-to-video generation
- **Styling**: NativeWind/Tailwind CSS for responsive design
- **State Management**: Zustand for app state management

### Core Features

#### Authentication & User Management
- Supabase authentication integration
- Pre-populated fake user system for testing and demonstration
- Simple user profiles with usernames and avatars

#### Group Management
- Create groups by selecting 3-4 fake users from pre-populated list
- Simple group messaging interface
- Group member management

#### Image Capture & Video Generation
- Photo capture using device camera
- Categorized AI prompt suggestion system:
  - **Mood-based**: "Make it epic", "Turn it spooky", "Make it vintage"
  - **Style-based**: "Pixar animation", "Comic book", "Oil painting"
  - **Action-based**: "Add explosions", "Slow motion drama", "Make it dance"
- Custom prompt text input
- Replicate API integration with minimax/video-01 for image-to-video transformation
- Real-time processing status updates via Supabase Realtime
- Processing completion required before sending

#### Messaging & Sharing
- Group video sharing (transformed videos only)
- 24-hour automatic content deletion
- Processing status indicators
- Basic video viewing interface

### Database Schema

```sql
-- Pre-populated fake users
users (id, username, avatar_url, created_at)

-- Group management
groups (id, name, created_by, created_at)
group_members (group_id, user_id, joined_at)

-- Prompt templates
prompt_templates (id, category, title, prompt, popularity)

-- Image messages with video generation status
image_messages (
  id, user_id, group_id, 
  original_image_url, selected_prompt, generated_video_url,
  status, created_at, expires_at
)
```

### Processing Flow

1. User captures photo with device camera
2. User selects AI prompt from categories or creates custom prompt
3. Image uploaded to Supabase Storage
4. Image-to-video generation request sent to Replicate API (minimax/video-01) via Supabase Edge Function
5. Real-time status updates provided to user during processing (20-60 seconds)
6. Completed AI-generated video sent to group members
7. Original image and generated video automatically deleted after 24 hours

---

## Design Requirements

### User Experience
- **Playful, humorous UI personality** that matches the creative, entertaining nature of the app
- **Seamless image capture workflow** from photo taking to prompt selection to sending
- **Clear processing state indicators** to manage user expectations during AI transformation
- **Mobile-first responsive design** optimized for smartphone usage
- **Simple group creation interface** for easy fake user selection

### Key Screens
1. **Authentication Screen**: Simple login/signup via Supabase
2. **Group Selection/Creation**: Browse and create groups with fake users
3. **Image Capture**: Photo taking with camera controls
4. **Prompt Selection**: Categorized suggestions + custom input
5. **Processing Status**: Real-time progress indicator for video generation
6. **Group Chat**: View received AI-generated videos
7. **Settings**: Basic user preferences

---

## Technical Considerations

### Performance Requirements
- Image-to-video generation: 20-60 seconds typical (handled by Replicate minimax/video-01)
- Image upload/video download: Sub-3 second response times
- Real-time updates: Immediate status notifications via Supabase Realtime
- Storage: Automatic cleanup of expired content

### Cost Estimation
- Replicate API: FREE with minimax/video-01 model
- Supabase: Generous free tier for prototype/testing
- Storage: Minimal due to 24-hour ephemeral nature

### Scalability Notes
- Template app approach with fake users eliminates user acquisition complexity
- Supabase handles infrastructure scaling automatically
- Replicate API manages AI model scaling and availability

---

## Success Metrics

### Core Functionality
- All 6 user stories fully functional
- Successful image-to-video generation rate >95%
- Processing completion within 60 seconds
- Zero data persistence beyond 24-hour limit

### User Experience
- Seamless image capture flow without interruption
- Intuitive prompt selection with <10 second decision time
- Clear processing status communication
- Engaging AI-generated video results

---


### Technical Debt Management
- Abstract video generation to easily swap AI providers
- Modular prompt system for easy category expansion
- Clean separation between fake user system and future real user implementation