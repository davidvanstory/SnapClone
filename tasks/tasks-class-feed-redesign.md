# Tasks: Class Feed Chat-Style Redesign

## Relevant Files

- `app/(tabs)/index.tsx` - Main class feed screen that needs complete UI redesign from full-screen to chat-style
- `components/feed/ArtworkCard.tsx` - New component for individual artwork cards with metadata
- `components/feed/ClassFeedHeader.tsx` - New fixed header component with class name
- `components/feed/ClassFeedList.tsx` - New scrollable list container for artwork cards
- `store/classStore.ts` - May need updates for new feed interaction patterns and scroll-to-post functionality
- `lib/supabase.ts` - Ensure post data structure supports new card layout requirements

### Notes

- Redesigns class feed from full-screen artwork backgrounds to chat-style vertical feed
- Uses glass morphism design system from UIDesign.md with primary and secondary glass cards
- Art cards are 60% screen width with fixed aspect ratio for consistency
- Tight, cohesive card design with no dead space between artwork and metadata
- Fixed class name header that stays visible during scrolling
- Clean white background instead of dynamic artwork backgrounds
- Supports both Juni-shared and camera-captured artwork
- Sets foundation for better social interaction and Juni integration
- **IMPORTANT**: This redesign is a prerequisite for the Juni Share with Class feature, which needs scroll-to-post functionality

## Tasks

- [ ] 1.0 Create New Artwork Card Component
  - [ ] 1.1 Create ArtworkCard.tsx component with 60% screen width sizing
  - [ ] 1.2 Implement primary glass morphism card for artwork container using UIDesign.md specs
  - [ ] 1.3 Add fixed aspect ratio image display with proper scaling and border radius
  - [ ] 1.4 Create secondary glass morphism metadata strip with no gap between artwork and metadata
  - [ ] 1.5 Add artist name, view count (👁 3/5), and expiry timer (⏰ 2h) in compact layout
  - [ ] 1.6 Position comment icon (💬) on the right side of metadata strip
  - [ ] 1.7 Implement tap handlers for artwork (full-screen) and comment icon (input field)
  - [ ] 1.8 Style typography using Montserrat for metadata per UIDesign.md specifications

- [ ] 2.0 Build Fixed Class Header Component
  - [ ] 2.1 Create ClassFeedHeader.tsx component with fixed positioning
  - [ ] 2.2 Display class name using Instrument Serif typography per UIDesign.md
  - [ ] 2.3 Apply glass morphism styling consistent with app design system
  - [ ] 2.4 Ensure header stays visible during vertical scrolling
  - [ ] 2.5 Add proper safe area handling for iOS notches and Android status bars
  - [ ] 2.6 Implement subtle shadow/border to separate from scrolling content

- [ ] 3.0 Redesign Main Feed Layout and Container
  - [ ] 3.1 Replace full-screen artwork background with clean white background
  - [ ] 3.2 Remove existing glass morphism overlays and post navigation controls
  - [ ] 3.3 Create ClassFeedList.tsx component for vertical scrolling container
  - [ ] 3.4 Implement FlatList or ScrollView for efficient rendering of artwork cards
  - [ ] 3.5 Add proper spacing between cards (16px per UIDesign.md spacing system)
  - [ ] 3.6 Center cards horizontally with 60% screen width constraint
  - [ ] 3.7 Handle empty state with white background and "Share your art" message

- [ ] 4.0 Update Feed Data Loading and State Management
  - [ ] 4.1 Modify classStore to support new card-based rendering instead of single post index
  - [ ] 4.2 Ensure post data includes all required fields for card metadata display
  - [ ] 4.3 Update loadClassPosts function to work with new feed layout
  - [ ] 4.4 Remove post swiping navigation logic (no longer needed)
  - [ ] 4.5 Add support for newest posts appearing at bottom of feed
  - [ ] 4.6 Implement proper loading states for individual cards

- [ ] 5.0 Implement Card Interactions and Navigation
  - [ ] 5.1 Create full-screen artwork view navigation from card tap
  - [ ] 5.2 Implement comment input field modal/overlay triggered by comment icon tap
  - [ ] 5.3 Ensure existing post detail functionality works with new card-based navigation
  - [ ] 5.4 Update any existing comment system to work with new interaction pattern
  - [ ] 5.5 Test navigation flow between chat-style feed and existing full-screen post views
  - [ ] 5.6 Add scroll-to-post functionality by post ID (required for Juni sharing integration) 