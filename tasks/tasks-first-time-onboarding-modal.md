# First-Time User Onboarding Modal - Task List

## Relevant Files

- `components/onboarding/OnboardingModal.tsx` - Main onboarding modal component with three-step flow
- `components/onboarding/OnboardingModal.test.tsx` - Unit tests for OnboardingModal component
- `components/onboarding/OnboardingStep.tsx` - Individual step component for each feature highlight
- `components/onboarding/OnboardingStep.test.tsx` - Unit tests for OnboardingStep component
- `store/onboardingStore.ts` - Zustand store for onboarding state management
- `store/onboardingStore.test.ts` - Unit tests for onboarding store
- `lib/onboardingService.ts` - Service for tracking onboarding completion (AsyncStorage vs Database)
- `lib/onboardingService.test.ts` - Unit tests for onboarding service
- `app/(tabs)/_layout.tsx` - Modified to trigger onboarding modal after first login
- `store/authStore.ts` - Modified to track first-time login state
- `constants/OnboardingContent.ts` - Content constants for onboarding steps
- `supabase/migrations/add_onboarding_field.sql` - Database migration to add has_seen_onboarding field

### Notes

- Using Database field approach for persistence (has_seen_onboarding boolean in users table)
- Modal should appear after successful login/registration
- Three separate modals: Camera → Juni → Class Feed → Navigate to Camera
- Users can skip at any point
- Clean glass morphism design per UIDesign.md
- Brief, action-focused content

## Tasks

- [x] 1.0 Design Onboarding Persistence Strategy
  - [x] 1.1 Create database migration to add has_seen_onboarding boolean field to users table
  - [x] 1.2 Update UserProfile interface in store/authStore.ts to include has_seen_onboarding field
  - [x] 1.3 Create onboardingService.ts with functions to check and mark onboarding completion
  - [x] 1.4 Add onboarding state management to existing auth store
  - [x] 1.5 Test database migration and service functions work correctly

- [x] 2.0 Create Onboarding Modal Components
  - [x] 2.1 Create OnboardingStep.tsx component for individual feature highlights
  - [x] 2.2 Create OnboardingModal.tsx main modal component with three-step flow
  - [x] 2.3 Add glass morphism styling following UIDesign.md specifications
  - [x] 2.4 Implement step navigation (next, skip, direct feature navigation)
  - [x] 2.5 Add proper TypeScript interfaces and prop validation

- [x] 3.0 Integrate Onboarding Content and Navigation
  - [x] 3.1 Define the three onboarding steps with content (Camera: "Capture Your Art", Juni: "Ask Juni About Your Art", Community: "Share With Your Community")
  - [x] 3.2 Configure navigation targets for each step (Camera tab, Solo tab, Main feed)
  - [x] 3.3 Implement proper routing with expo-router integration
  - [x] 3.4 Add step-by-step flow logic (1→2→3→Camera as final destination)
  - [x] 3.5 Test navigation between steps and final destination routing

- [x] 4.0 Implement Onboarding Trigger Logic
  - [x] 4.1 Add onboarding modal to main tabs layout with auth store integration
  - [x] 4.2 Implement automatic trigger after successful login
  - [x] 4.3 Add proper state management for modal visibility
  - [x] 4.4 Ensure modal only shows for first-time users (has_seen_onboarding = false)
  - [x] 4.5 Test complete onboarding flow from login to completion

- [ ] 5.0 Testing and Polish
  - [ ] 5.1 Write unit tests for OnboardingStep component
  - [ ] 5.2 Write unit tests for OnboardingModal component
  - [ ] 5.3 Write unit tests for onboardingService functions
  - [ ] 5.4 Test complete onboarding flow on iOS simulator
  - [ ] 5.5 Test complete onboarding flow on Android emulator
  - [ ] 5.6 Verify glass morphism styling matches UIDesign.md (backdrop blur, colors, spacing)
  - [ ] 5.7 Test skip functionality from each step
  - [ ] 5.8 Test navigation paths work correctly for all three features
  - [ ] 5.9 Verify onboarding doesn't show again after completion
  - [ ] 5.10 Test edge cases (network errors, rapid navigation, etc.) 