# ArtCritique AI: Ephemeral Art Sharing with Solo Tutor

## Project Overview

ArtCritique AI is a React Native mobile application built with Expo that combines ephemeral art sharing with AI-powered tutoring. The app provides a supportive, low-stakes environment for art students and hobbyists to build confidence through both peer interaction and personalized AI guidance.

## Key Features

### 🎨 **Class-Based Social Feed**
- **Ephemeral Posts**: Share artwork that automatically expires (30 minutes to 24 hours)
- **Limited Viewers**: Control audience size (1-20 viewers per post)
- **Real-time Countdown**: Live expiration timers create urgency and reduce anxiety
- **Glass Morphism UI**: Beautiful artwork-as-background interface with overlay cards
- **Peer Comments**: Supportive feedback with 150-character limit to encourage focused responses
- **Join Classes**: Simple 6-character codes to join art classes and communities

### 📸 **Camera & Photo Sharing**
- **Built-in Camera**: Full-screen viewfinder with optimized capture settings
- **Instant Upload**: Direct integration with Supabase Storage
- **Photo Management**: Metadata tracking and public URL generation
- **Quality Optimization**: Balanced file size and detail for artwork sharing

### 🤖 **Solo AI Tutor (Canvas)**
- **Private AI Coach**: One-on-one conversations with Canvas, your personal art tutor
- **Multimodal Analysis**: Upload artwork for AI analysis using OpenAI GPT-4o
- **RAG-Powered Memory**: Retrieval-Augmented Generation system remembers your art journey
- **Contextual Conversations**: AI references past discussions and artwork for personalized guidance
- **Vector Search**: Uses pgvector extension for intelligent conversation history retrieval
- **Dual Memory System**: 
  - Long-term memory via vector similarity search
  - Short-term memory from recent conversation context

### 🔐 **Authentication & User Management**
- **Secure Auth**: Supabase authentication with email/password
- **User Profiles**: Customizable usernames and profile management
- **Row Level Security**: Database-level security for all user data
- **Session Management**: Automatic session handling and restoration

## Technical Architecture

### **Frontend (React Native + Expo)**
- **Framework**: React Native with Expo SDK
- **Navigation**: Expo Router with file-based routing
- **State Management**: Zustand stores for auth, classes, and solo chat
- **UI Components**: Custom glass morphism design system
- **Typography**: Instrument Serif for headings, Montserrat for body text
- **Styling**: StyleSheet with dynamic theming support

### **Backend (Supabase)**
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Storage**: Supabase Storage for images with public/private buckets
- **Edge Functions**: Serverless functions for AI integration
- **Real-time**: Live updates for posts and comments
- **Vector Database**: pgvector extension for AI embeddings

### **AI Integration (OpenAI)**
- **Text Generation**: GPT-4o for multimodal AI tutoring responses
- **Image Analysis**: GPT-4o vision capabilities for artwork feedback
- **Embeddings**: text-embedding-3-small (1536 dimensions) for RAG
- **RAG System**: Vector similarity search + recent context for personalized responses

## Database Schema

### **Core Tables**
- `users` - User profiles extending Supabase auth
- `classes` - Art class containers with join codes
- `class_members` - User-class relationships with roles
- `posts` - Ephemeral artwork posts with expiration logic
- `post_views` - View tracking to prevent double-counting
- `comments` - Peer feedback with character limits
- `ai_feedback` - AI-generated artwork analysis
- `photos` - Photo metadata and storage references

### **Solo Tutor Tables**
- `solo_ai_chats` - Conversation thread containers
- `solo_ai_messages` - Individual messages with vector embeddings
- Vector indexes for efficient similarity search

## Key Libraries & Dependencies

### **Frontend**
- `@expo/vector-icons` - Icon system
- `expo-camera` - Camera functionality
- `expo-image-picker` - Gallery image selection
- `expo-file-system` - File operations
- `@supabase/supabase-js` - Supabase client
- `zustand` - State management
- `react-native-reanimated` - Smooth animations

### **Backend**
- `@supabase/supabase-js` - Database and storage
- `pgvector` - Vector similarity search
- OpenAI API integration for AI responses

## File Structure

```
app/
├── (auth)/           # Authentication screens
├── (tabs)/           # Main app navigation
│   ├── index.tsx     # Class feed screen
│   ├── camera.tsx    # Camera interface
│   └── solo.tsx      # Solo AI tutor
components/
├── auth/             # Auth-related components
├── feed/             # Class feed components
├── solo/             # Solo tutor components
└── ui/               # Reusable UI components
lib/
├── auth.ts           # Authentication utilities
├── classService.ts   # Class management
├── photoService.ts   # Photo upload/management
├── soloService.ts    # Solo tutor API integration
└── supabase.ts       # Database client & types
store/
├── authStore.ts      # Authentication state
├── classStore.ts     # Class & feed state
└── soloStore.ts      # Solo tutor state
supabase/
├── functions/        # Edge functions for AI
└── migrations/       # Database schema evolution
```

## Design Philosophy

### **Glass Morphism Elegance**
- Translucent cards with subtle blur effects
- Artwork-as-background for immersive viewing
- Consistent 16px padding and 8px border radius
- Warm sage (#8B9D83) and coral (#E67E50) accents

### **Anxiety-Reducing UX**
- Ephemeral content reduces permanent judgment fear
- Limited viewer counts create intimate sharing
- Supportive comment character limits encourage positivity
- Private AI tutor for judgment-free learning

### **Mobile-First Experience**
- Optimized for portrait phone usage
- Touch-friendly 44px minimum tap targets
- Keyboard-aware layouts with proper padding
- Smooth animations and haptic feedback

## Getting Started

1. **Prerequisites**: Node.js, Expo CLI, Supabase account
2. **Installation**: `npm install` or `yarn install`
3. **Environment**: Configure Supabase credentials in `.env`
4. **Database**: Run migrations in `supabase/migrations/`
5. **Development**: `expo start` to launch development server
6. **AI Setup**: Configure OpenAI API keys for Solo Tutor functionality

## Key Features in Detail

### **Ephemeral Art Sharing**
Posts automatically expire based on user-selected duration, creating a low-pressure environment where mistakes don't last forever. The glass morphism interface displays artwork as full-screen backgrounds with floating overlay cards for interactions.

### **RAG-Powered AI Tutor**
The Solo Tutor uses a sophisticated Retrieval-Augmented Generation system that:
- Converts conversations to vector embeddings
- Searches chat history for relevant context
- Combines long-term and short-term memory
- Provides personalized, evolving guidance
- Remembers artistic progress and preferences

### **Class-Based Social Learning**
Users join art classes via simple codes, creating focused communities for peer feedback and shared learning experiences. The ephemeral nature encourages experimentation and risk-taking.

This application represents a modern approach to art education, combining the benefits of social learning with personalized AI tutoring in a beautifully designed, anxiety-reducing mobile experience. 