# VEO Creative Image Messenger
## Product Requirements Document

### Product Overview

VEO Creative Image Messenger is an ephemeral messaging platform that transforms text prompts into AI-generated images using Google's Imagen-4. Users create text prompts and send AI-generated images to friends through group messaging. Only the AI-generated image result is shared, creating surprising and entertaining conversations that automatically delete after 24 hours.

### Target Audience

Social media users who want to connect with friends through creative, AI-enhanced video content and enjoy spontaneous, humorous digital interactions.

---

## Core User Stories

1. **Authentication**: As a user, I want to authenticate with Supabase so I can access my groups and video history
2. **Group Creation**: As a user, I want to select from pre-populated fake users to create a 3-4 person group so I can share videos with multiple friends
3. **Text Prompt Creation**: As a user, I want to create text prompts so I can generate AI images to share
4. **Automatic Deletion**: As a user, I want my generated images to automatically delete after 24 hours so conversations stay ephemeral and spontaneous
5. **Text-to-Image Generation**: As a user, I want to send my text prompt to my group so friends receive a surprising AI-generated image
6. **Prompt Selection**: As a user, I want to choose from categorized prompt suggestions or create custom prompts so I can easily generate creative images

---

## Technical Requirements

### Technology Stack
- **Frontend**: React Native with Expo for cross-platform mobile development
- **Backend**: Supabase (PostgreSQL, Edge Functions, Authentication, Storage, Realtime)
- **AI Processing**: Replicate API with google/imagen-4 model for text-to-image generation
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

#### Text-to-Image Generation
- Text prompt input interface with character limits
- Categorized AI prompt suggestion system:
  - **Style-based**: "photorealistic", "cartoon style", "oil painting", "anime"
  - **Mood-based**: "epic fantasy", "cozy atmosphere", "dramatic lighting"
  - **Subject-based**: "cute animals", "space scenes", "food photography"
- Custom prompt text input with helpful tips
- Replicate API integration with google/imagen-4 for text-to-image generation
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

-- Text prompt messages with image generation status
text_messages (
  id, user_id, group_id, 
  text_prompt, generated_image_url,
  status, created_at, expires_at
)
```

### Processing Flow

1. User creates text prompt using input interface or selects from suggestions
2. User selects or customizes prompt categories and styles
3. Text prompt processed by Replicate API (google/imagen-4) via Supabase Edge Function
4. Real-time status updates provided to user during processing (5-15 seconds)
5. Completed AI-generated image sent to group members
6. Generated images automatically deleted after 24 hours

---

## Design Requirements

### User Experience
- **Playful, humorous UI personality** that matches the creative, entertaining nature of the app
- **Seamless prompt creation workflow** from text input to generation to sending
- **Clear processing state indicators** to manage user expectations during AI transformation
- **Mobile-first responsive design** optimized for smartphone usage
- **Simple group creation interface** for easy fake user selection

### Key Screens
1. **Authentication Screen**: Simple login/signup via Supabase
2. **Group Selection/Creation**: Browse and create groups with fake users
3. **Text Prompt Input**: Text creation interface with suggestions
4. **Style Selection**: Categorized style and mood options
5. **Processing Status**: Real-time progress indicator for image generation
6. **Group Chat**: View received AI-generated images
7. **Settings**: Basic user preferences

---

## Technical Considerations

### Performance Requirements
- Text-to-image generation: 5-15 seconds typical (handled by Replicate google/imagen-4)
- Image download: Sub-3 second response times
- Real-time updates: Immediate status notifications via Supabase Realtime
- Storage: Automatic cleanup of expired content

### Cost Estimation
- Replicate API: ~$0.01-0.05 per image generation (very affordable)
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
- Successful text-to-image generation rate >95%
- Processing completion within 15 seconds
- Zero data persistence beyond 24-hour limit

### User Experience
- Seamless prompt creation flow without interruption
- Intuitive style selection with <10 second decision time
- Clear processing status communication
- High-quality AI-generated image results

---

## Future Considerations
