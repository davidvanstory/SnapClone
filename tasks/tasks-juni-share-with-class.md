# Tasks: Juni Share with Class Feature

## ⚠️ DEPENDENCY NOTE
**This feature requires the Class Feed Redesign to be completed first.** The Juni sharing feature needs to navigate to and scroll to specific posts in a card-based class feed layout. The current full-screen post navigation system doesn't support the required scroll-to-post functionality.

## Relevant Files

- `components/solo/ChatInput.tsx` - Add the green "Share with Class" button that slides in to the left of existing action buttons ✅ MODIFIED
- `components/solo/ShareWithClassModal.tsx` - New modal component for image preview and caption input before sharing ✅ CREATED
- `store/soloStore.ts` - Track the last uploaded image and share button visibility state ✅ MODIFIED
- `store/classStore.ts` - Add function to create posts from Juni chat images and handle feed navigation ✅ MODIFIED (added pendingScrollToPostId)
- `lib/postService.ts` - New service for creating ephemeral posts (if not exists) or extend existing class service ✅ CREATED
- `lib/photoService.ts` - Extend to handle image uploads for class posts from Juni chat ✅ NO CHANGES NEEDED (reusing URLs)
- `app/(tabs)/solo.tsx` - Handle navigation to class feed after successful sharing and inline error messages ✅ MODIFIED
- `app/(tabs)/index.tsx` - DEPENDENCY: Must be redesigned to card-based layout first for scroll-to-post functionality ✅ MODIFIED (added scroll handling)

### Notes

- This feature bridges the Solo AI Tutor (Juni) with the Class Feed system
- Uses existing ephemeral post system with default settings: 5 viewers, 5 hour duration
- Button slides in with sparkle/pulse animation after Juni responds to messages containing images
- Shares most recent user-uploaded image from current chat session
- Automatically shares to user's current enrolled class
- Modal uses app's glass morphism design without blurred background
- Redirects to class feed and scrolls to new post after successful sharing
- Error messages appear as inline chat messages

## Tasks

- [x] 1.0 Implement Share Button State Management and Animation
  - [x] 1.1 Add state tracking for last uploaded image URL in soloStore
  - [x] 1.2 Add state for share button visibility (appears after Juni responds to image messages)
  - [x] 1.3 Create logic to detect when Juni responds to a message containing an image
  - [x] 1.4 Implement button visibility timer that persists until user leaves solo tab
  - [x] 1.5 Add function to get most recent user-uploaded image from current chat messages

- [x] 2.0 Create Animated Share Button in ChatInput
  - [x] 2.1 Add green "Share" button to the left of existing action buttons without shifting layout
  - [x] 2.2 Implement slide-in animation when button becomes visible
  - [x] 2.3 Add sparkle or pulse animation on first appearance to draw attention
  - [x] 2.4 Style button with appropriate green color and icon (matching app design system)
  - [x] 2.5 Handle button press to open share modal with last uploaded image

- [x] 3.0 Create Share with Class Modal Component
  - [x] 3.1 Build modal using glass morphism design system without blurred background
  - [x] 3.2 Display image preview of the last uploaded image from chat
  - [x] 3.3 Add simple text field for caption/question input
  - [x] 3.4 Add "Share" button in modal to confirm sharing
  - [x] 3.5 Implement modal open/close animations consistent with app design
  - [x] 3.6 Handle modal dismissal and cleanup

- [x] 4.0 Build Post Creation Service Integration
  - [x] 4.1 Create or extend postService to handle Juni image sharing (reuse existing post creation logic from classStore)
  - [x] 4.2 Implement function to create ephemeral post with adjustable settings (default: 5 viewers, 5 hours)
  - [x] 4.3 Handle image upload from Juni chat to class post storage (extend photoService.ts) - NO UPLOAD NEEDED, REUSING URL
  - [x] 4.4 Associate post with user's current enrolled class automatically
  - [x] 4.5 Include user's caption/question in post description, and name of user.
  - [x] 4.6 Return post ID and success status for navigation

- [x] 5.0 Add Navigation and Success Flow (REQUIRES REDESIGNED CLASS FEED)
  - [x] 5.1 Implement navigation from solo tab to class feed tab after successful sharing
  - [x] 5.2 Add function to scroll to specific post in class feed by post ID (requires card-based layout)
  - [x] 5.3 Ensure new post appears correctly in class feed without requiring manual refresh
  - [x] 5.4 Hide share button after successful sharing
  - [x] 5.5 Clear modal state and reset form after sharing

- [ ] 6.0 Implement Error Handling and Edge Cases
  - [ ] 6.1 Check if user is enrolled in any classes before allowing share
  - [ ] 6.2 Display inline chat message "Could not send, please join a class" if no class membership
  - [ ] 6.3 Handle image upload failures with inline chat message "Image upload failed, try again"
  - [ ] 6.4 Add error handling for post creation failures
  - [ ] 6.5 Ensure share button state resets properly on errors
  - [ ] 6.6 Add loading states during sharing process 