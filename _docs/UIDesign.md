# EphemeralArt - Complete Design System PRD

## Design Philosophy

### Core Visual Principles
- **Artwork as Hero**: Every design decision serves to elevate and showcase student artwork
- **Glass Morphism Elegance**: Sophisticated layering that creates depth without overwhelming content
- **Ephemeral Beauty**: Visual cues that celebrate the temporary nature of shared art
- **Encouraging Atmosphere**: Design language that reduces anxiety and builds confidence

### Emotional Design Goals
- **Reduce sharing anxiety** through soft, welcoming interfaces
- **Elevate casual sketches** to gallery-worthy presentations
- **Create intimacy** within class groups through warm, personal touches
- **Celebrate impermanence** as a feature, not limitation

## Visual Identity System

### Color Palette

#### Primary Neutrals
- **Pure White**: #FFFFFF (primary text, key UI elements)
- **Charcoal Text**: #2C2C2C (high contrast text when needed)
- **Soft Gray Surfaces**: #F8F8F8 (background cards, subtle separators)
- **Medium Gray**: #E5E5E5 (inactive states, borders)

#### Glass Morphism Colors
- **Primary Glass**: rgba(255, 255, 255, 0.15) - Main card backgrounds
- **Secondary Glass**: rgba(255, 255, 255, 0.25) - Active/hover states
- **Text Glass**: rgba(255, 255, 255, 0.9) - Primary white text
- **Secondary Text Glass**: rgba(255, 255, 255, 0.7) - Metadata, timestamps
- **Subtle Text Glass**: rgba(255, 255, 255, 0.5) - Disabled states

#### Accent Colors (Sparingly Used)
- **Warm Sage**: #8B9D83 - Encouraging actions (AI feedback, positive states)
- **Soft Coral**: #E67E50 - Critical actions (delete, warnings)
- **Warm Tan**: #B8956A - Special moments (first post, achievements)

### Typography System

#### Font Pairing
- **Primary**: Montserrat (400, 500, 600 weights)
- **Display**: Instrument Serif (400, 500 weights)

#### Type Scale & Usage

**Display Typography (Instrument Serif)**
- **App Name/Large Headers**: 32-42pt, Medium (500) weight
- **Screen Titles**: 24-28pt, Medium (500) weight  
- **User Names/Artist Credits**: 16-18pt, Regular (400) weight
- **Decorative Elements**: 14-16pt, Regular (400) weight

**UI Typography (Montserrat)**
- **Primary Headers**: 20-24pt, Medium (500) weight
- **Body Text/Comments**: 14-16pt, Regular (400) weight
- **Button Text**: 14-16pt, Medium (500) weight
- **Labels**: 12-14pt, Medium (500) weight
- **Metadata/Timestamps**: 11-12pt, Regular (400) weight
- **Small Details**: 10-11pt, Regular (400) weight

#### Typography Treatment
- **Line Height**: 1.4-1.5x for body text, 1.2-1.3x for headers
- **Letter Spacing**: Default for body, -0.02em for large headers
- **Text Shadows**: Subtle 1px shadows when white text over complex backgrounds

## Layout & Spacing System

### Grid System
- **Base Unit**: 8px
- **Component Spacing**: 16px (2 units)
- **Section Spacing**: 24px (3 units)
- **Screen Margins**: 20px (2.5 units)
- **Card Padding**: 16-20px (2-2.5 units)

### Border Radius System
- **Screen Containers**: 28px
- **Primary Cards**: 20px
- **Secondary Cards**: 16px
- **Buttons**: 28px (fully rounded)
- **Pills/Tags**: 20px
- **Small Elements**: 12px

## Glass Morphism Implementation

### Technical Specifications

#### Primary Glass Cards
```css
background: rgba(255, 255, 255, 0.15);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.2);
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
border-radius: 20px;
```

#### Secondary Glass Elements
```css
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(8px);
border: 1px solid rgba(255, 255, 255, 0.15);
box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
border-radius: 16px;
```

#### Interactive States
- **Hover**: Increase background opacity to 0.25
- **Active**: Slight scale (0.98) with increased shadow
- **Focus**: 2px accent color border with glow effect

## Screen-by-Screen Design Specifications

### 1. Launch Screen
- **Background**: Soft gradient from #F8F8F8 to #FFFFFF
- **App Name**: "EphemeralArt" in Instrument Serif, 42pt, centered
- **Tagline**: "Share. Encourage. Fade." in Montserrat, 16pt, rgba(0,0,0,0.6)
- **Minimal branding**: Small sketched icon above app name

### 2. Initial Login Screen
- **Background**: Clean white with subtle paper texture
- **Card**: Glass morphism container (primary glass specs)
- **Header**: "Welcome to EphemeralArt" in Instrument Serif, 28pt
- **Input Field**: 
  - Rounded (16px) border with rgba(0,0,0,0.1) outline
  - Placeholder in Montserrat, 14pt, rgba(0,0,0,0.4)
  - Focus state with warm sage accent color
- **Button**: Full-width glass morphism button with Montserrat text

### 3. Welcome Screen (Post-Login)
- **Layout**: Centered content with generous whitespace
- **Greeting**: "Welcome, [Name]!" in Instrument Serif, 32pt
- **Subtext**: Encouraging message in Montserrat, 16pt
- **Primary Action**: "Join a Class" button prominent and centered
- **Button Style**: Full-width, rounded, glass morphism with warm sage background

### 4. Join Class Screen
- **Background**: Same as login screen
- **Input Focus**: Large, friendly input for class code
- **Visual Feedback**: Real-time validation with gentle color changes
- **Success State**: Green checkmark with smooth animation

### 5. Main Feed Screen

#### Overall Layout
- **Background**: Dynamic - each artwork becomes full-screen background
- **Overlay**: Subtle dark gradient (rgba(0,0,0,0.3) to transparent)
- **Content Areas**: Glass morphism cards layered over artwork

#### Artwork Display
- **Full-Screen Background**: Current post artwork fills entire screen
- **Frame Integration**: When artwork has frame, it's visible in background
- **Smooth Transitions**: 400ms ease-out when switching between posts

#### Glass Morphism Cards Layout

**Top Card - Post Information**
- **Position**: Top 20px margin, left/right 20px
- **Content**: 
  - Artist name (Instrument Serif, 18pt, white)
  - Class name (Montserrat, 12pt, rgba(255,255,255,0.7))
  - Timer countdown (Montserrat, 14pt, white)
- **Background**: Primary glass specifications
- **Height**: Auto-sizing based on content

**Bottom Left Card - Post Stats**
- **Position**: 20px from bottom, 20px from left
- **Content**:
  - View count: "3 of 5 viewers" (Montserrat, 12pt)
  - Time remaining: "Expires in 18 min" (Montserrat, 11pt)
- **Background**: Secondary glass specifications
- **Size**: Compact, auto-width

**Bottom Right Card - Actions**
- **Position**: 20px from bottom, 20px from right
- **Buttons**: 
  - Camera icon (24px, white)
  - AI feedback icon (when applicable)
  - Comment icon with count
- **Layout**: Horizontal row with 12px gaps
- **Background**: Secondary glass per button

#### Navigation Between Posts
- **Vertical Swipe**: Switch between posts in feed
- **Smooth Transitions**: Artwork crossfades behind glass cards
- **Loading States**: Skeleton screens with glass morphism

### 6. Camera Interface

#### Camera View
- **Full-Screen Viewfinder**: No UI chrome during capture
- **Grid Lines**: Optional, subtle white lines (rgba(255,255,255,0.3))
- **Minimal Controls**: Only essential capture elements visible

#### Control Overlay
- **Bottom Glass Card**: Slides up from bottom edge
- **Capture Button**: Large (80px), centered, white with subtle shadow
- **Settings**: Side buttons for flash, flip camera (glass morphism pills)

#### Post-Capture Flow
- **Preview**: Artwork displayed full-screen
- **Frame Selection**: 
  - Trigger: Small "Add Frame" button (glass morphism)
  - Interface: Horizontal scrolling carousel at bottom
  - Preview: Real-time frame application
  - Frame Options: Displayed as glass morphism cards with previews

### 7. Sharing Controls Screen

#### Layout Over Artwork
- **Background**: User's artwork full-screen with dark overlay
- **Controls Card**: Large glass morphism card, centered

#### Control Elements
**Viewer Limit Slider**
- **Label**: "Max Viewers" (Montserrat, 14pt, Medium)
- **Slider**: Custom design with warm sage accent
- **Value Display**: Large number (Instrument Serif, 24pt) with animation
- **Range**: 1-20 with haptic feedback at key points

**Duration Selection**
- **Options**: Three glass morphism pills
  - "30 minutes" 
  - "2 hours"
  - "Until tomorrow"
- **Selection State**: Warm sage background with white text
- **Default**: Middle option pre-selected

**Privacy Indicator**
- **Visual**: Lock icon with descriptive text
- **Text**: "Only your Drawing Fundamentals class can see this"
- **Style**: Secondary glass morphism card

#### Primary Action
- **Button**: "Share with Class" 
- **Style**: Full-width, prominent glass morphism
- **Color**: Warm sage background
- **Typography**: Montserrat, 16pt, Medium, white text

### 8. Full-Screen Artwork View

#### Artwork Display
- **Background**: Artwork fills entire screen
- **Frame**: Rendered as part of image if selected
- **Zoom**: Pinch-to-zoom capability with smooth animations

#### Comments Overlay
- **Position**: Bottom of screen, slides up when tapped
- **Background**: Glass morphism card with higher opacity (0.25)
- **Layout**: Scrollable list of comments

#### Comment Display
**Individual Comments**
- **User Name**: Instrument Serif, 14pt, white
- **Comment Text**: Montserrat, 14pt, rgba(255,255,255,0.9)
- **Timestamp**: Montserrat, 11pt, rgba(255,255,255,0.5)
- **Spacing**: 12px between comments

**Comment Input**
- **Position**: Bottom of comments overlay
- **Style**: Glass morphism input field
- **Placeholder**: "Add encouraging feedback..." 
- **Character Counter**: Subtle, appears as user types
- **Send Button**: Warm sage accent with paper plane icon

### 9. AI Feedback Interface

#### Trigger
- **Button**: "Get AI Feedback" on user's own posts
- **Style**: Glass morphism with warm tan accent
- **Position**: Appears in actions card

#### Loading State
- **Animation**: Elegant skeleton screen within glass card
- **Text**: "Analyzing your artwork..." (Montserrat, 12pt)
- **Duration**: 2-3 seconds with realistic loading progression

#### Feedback Display
- **Card**: Large glass morphism card with higher opacity
- **Header**: "AI Feedback" (Instrument Serif, 18pt)
- **Content**: Well-formatted feedback text (Montserrat, 14pt)
- **Tone**: Always encouraging and constructive
- **Dismissal**: Tap outside or X button to close

## Component Library

### Buttons

#### Primary Action Button
- **Background**: rgba(255, 255, 255, 0.9) or warm sage for special actions
- **Border Radius**: 28px (fully rounded)
- **Padding**: 16px 24px
- **Typography**: Montserrat, 16pt, Medium
- **Shadow**: 0 4px 16px rgba(0, 0, 0, 0.1)
- **States**: Hover (slight scale), Active (pressed scale), Disabled (0.5 opacity)

#### Secondary Action Button
- **Background**: Primary glass specifications
- **Border**: 1px solid rgba(255, 255, 255, 0.3)
- **Text Color**: White
- **Same dimensions as primary**

#### Icon Buttons
- **Size**: 44px × 44px (minimum touch target)
- **Background**: Secondary glass specifications
- **Icon Size**: 20px, centered
- **Border Radius**: 22px (fully rounded)

### Input Fields

#### Text Input
- **Background**: rgba(255, 255, 255, 0.2)
- **Border**: 1px solid rgba(255, 255, 255, 0.3)
- **Border Radius**: 16px
- **Padding**: 12px 16px
- **Typography**: Montserrat, 14pt, Regular
- **Placeholder**: rgba(255, 255, 255, 0.5)
- **Focus State**: Border becomes warm sage with subtle glow

#### Comment Input
- **Multi-line capable**
- **Auto-resize**: Grows with content up to 4 lines
- **Character counter**: Appears when approaching limit
- **Send button**: Integrated on right side

### Cards

#### Primary Content Card
- **Background**: rgba(255, 255, 255, 0.15)
- **Backdrop Filter**: blur(12px)
- **Border**: 1px solid rgba(255, 255, 255, 0.2)
- **Border Radius**: 20px
- **Padding**: 20px
- **Shadow**: 0 4px 20px rgba(0, 0, 0, 0.08)

#### Secondary Information Card
- **Background**: rgba(255, 255, 255, 0.1)
- **Backdrop Filter**: blur(8px)
- **Border**: 1px solid rgba(255, 255, 255, 0.15)
- **Border Radius**: 16px
- **Padding**: 16px
- **Shadow**: 0 2px 12px rgba(0, 0, 0, 0.05)

### Loading States

#### Skeleton Screens
- **Background**: Animated gradient from rgba(255,255,255,0.1) to rgba(255,255,255,0.2)
- **Animation**: 1.5s ease-in-out infinite
- **Shapes**: Match final content layout
- **Blur**: Maintain backdrop blur during loading

#### Progress Indicators
- **Style**: Thin line with warm sage color
- **Background**: rgba(255, 255, 255, 0.2)
- **Animation**: Smooth, determinate when possible

## Animation & Interaction Design

### Transition Specifications

#### Screen Transitions
- **Duration**: 400ms
- **Easing**: cubic-bezier(0.25, 0.46, 0.45, 0.94)
- **Type**: Crossfade for artwork backgrounds, slide for overlays

#### Element Animations
- **Cards Appearing**: Scale from 0.95 to 1.0 with opacity fade-in (300ms)
- **Button Interactions**: Scale to 0.98 on press (150ms)
- **Input Focus**: Border color transition (200ms) with subtle scale (1.02)

#### Deletion Animations
- **Post Expiration**: 2-second fade-out with scale to 0.95
- **Comment Removal**: Slide up and fade (300ms)
- **Warning**: Gentle shake animation before deletion

### Haptic Feedback
- **Light Impact**: Button taps, selection changes
- **Medium Impact**: Post creation, successful actions
- **Heavy Impact**: Deletions, errors
- **Selection Feedback**: Slider adjustments, frame selection

## Accessibility Considerations

### Color & Contrast
- **Minimum Contrast**: 4.5:1 for normal text, 3:1 for large text
- **Glass Morphism Readability**: Always test text legibility over artwork
- **Alternative Indicators**: Never rely solely on color for information

### Typography Accessibility
- **Minimum Sizes**: 12pt for metadata, 14pt for body text
- **Dynamic Type**: Support iOS/Android text scaling
- **Font Weights**: Sufficient weight for glass morphism backgrounds

### Touch Targets
- **Minimum Size**: 44px × 44px for all interactive elements
- **Spacing**: 8px minimum between adjacent touch targets
- **Visual Feedback**: Clear hover/active states

### Screen Reader Support
- **Semantic Markup**: Proper heading hierarchy
- **Alt Text**: Descriptive text for artwork and UI elements
- **Focus Management**: Logical tab order, clear focus indicators

## Error States & Edge Cases

### Network Issues
- **Offline Mode**: Graceful degradation with cached content
- **Failed Uploads**: Retry mechanism with clear messaging
- **Slow Loading**: Progressive loading with skeleton screens

### Content Edge Cases
- **Empty States**: Beautiful illustrations with encouraging text
- **Long Comments**: Proper text wrapping and scrolling
- **Unusual Aspect Ratios**: Elegant letterboxing or cropping

### Deletion Timing
- **Countdown Warnings**: Visual countdown for last 60 seconds
- **Grace Period**: 5-second "undo" option after deletion
- **Smooth Removal**: Elegant animations when content disappears

## Platform-Specific Considerations

### iOS Design Adaptations
- **Safe Areas**: Proper handling of notches and home indicators
- **Navigation**: iOS-style back gestures and animations
- **System Integration**: Proper keyboard handling and scroll behavior

### Android Design Adaptations
- **Material Design Elements**: Subtle incorporation where appropriate
- **Navigation**: Android back button and gesture handling
- **System Bars**: Proper status bar and navigation bar treatment

## Performance Optimization

### Glass Morphism Performance
- **Blur Optimization**: Use platform-native blur when possible
- **Layer Management**: Minimize backdrop-filter usage
- **Animation Performance**: 60fps target for all animations

### Image Handling
- **Compression**: Maintain quality while optimizing file size
- **Caching**: Smart caching strategy for artwork and frames
- **Memory Management**: Proper cleanup of full-screen images

This comprehensive design system ensures that every interaction in EphemeralArt feels premium, encouraging, and focused on celebrating student artwork through sophisticated visual design.