# EphemeralArt - Temporary Art Sharing Platform

## Project Description
A mobile app for art students to share works-in-progress in low-pressure, ephemeral environments. Students join class groups via teacher-provided codes, share artwork with controlled visibility and timing, and receive both peer feedback and optional AI guidance (limited to 2 AI feedbacks per day).

## Target Audience
**Primary**: Art students in structured drawing/painting classes
**Use case**: Alex, taking a drawing class, wants to share a quick sketch with 3-5 classmates for 30 minutes before bed

## Desired Features
### Core Functionality
- [ ] Simple authentication (name + join class code)
- [ ] Join class groups via 6-digit codes (e.g., "DRAW01")
- [ ] In-app camera for artwork photography
- [ ] Basic sharing controls (max viewers: 1-20, duration: 10min-24hrs)
- [ ] Auto-deletion system for shared content
- [ ] View counter (tracks actual viewers vs max allowed)
- [ ] Simple peer commenting

### AI Features (Simplified)
- [ ] Optional AI feedback button (post-sharing)
- [ ] GPT-4V analysis with encouraging, actionable art advice
- [ ] Rate limit: 2 AI feedback requests per day per user

### Essential Social Features
- [ ] Class-based group feeds
- [ ] Real-time notifications for new posts/comments
- [ ] Clear privacy indicators

## Database Schema
### Tables
- [ ] Users (id, name, class_id, ai_feedback_count, last_ai_reset)
- [ ] Classes (id, name, join_code)
- [ ] Posts (id, user_id, image_url, expires_at, max_viewers, view_count)
- [ ] Comments (id, post_id, user_id, text, created_at)

## Design Requests
- [ ] Camera-first interface (like Snapchat)
    - [ ] Simple controls for viewer limit and duration
    - [ ] Clear countdown timers showing when content expires
- [ ] Encouraging, anxiety-reducing design
    - [ ] Clear privacy indicators ("Only 3 people can see this")
    - [ ] AI feedback quota display ("1 AI feedback remaining today")

## Technical Implementation
- [ ] React Native + Expo
- [ ] Supabase (auth, database, storage, real-time)
- [ ] OpenAI GPT-4V API (direct calls)
- [ ] Expo Camera API
- [ ] Join code system with 6-digit alphanumeric codes

## Testing Data
- [ ] 2 sample classes: "Monday Drawing Fundamentals" (DRAW01), "Advanced Sketching" (SKETCH2)
- [ ] 5 users per class with sample artwork
- [ ] Simple drawings provided for testing posts

## Other Notes
- 7-day development timeline
- Teachers create classes and distribute join codes
- Completely ephemeral - no private saving options
- No user profiles or skill levels