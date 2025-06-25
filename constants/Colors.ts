/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

/**
 * Draft Design System Colors
 * 
 * Implements the monochromatic elegance specified in the PRD:
 * - White backgrounds with charcoal text (#2C2C2C)
 * - Single accent color for critical actions
 * - Soft gray surfaces for subtle differentiation
 * - Anxiety-reducing, clean visual hierarchy
 */

// Draft Primary Colors - Monochromatic Elegance
const draftCharcoal = '#2C2C2C';      // Primary text color
const draftWhite = '#FFFFFF';         // Primary background
const draftAccent = '#4A90E2';        // Single accent for critical actions (calming blue)

// Draft Grayscale Palette
const draftGray100 = '#F8F9FA';       // Subtle background surfaces
const draftGray200 = '#E9ECEF';       // Borders and dividers
const draftGray300 = '#DEE2E6';       // Disabled states
const draftGray400 = '#CED4DA';       // Placeholder text
const draftGray500 = '#ADB5BD';       // Secondary text
const draftGray600 = '#6C757D';       // Metadata text
const draftGray700 = '#495057';       // Emphasized secondary text

export const Colors = {
  light: {
    // Draft Light Mode (Primary)
    text: draftCharcoal,              // #2C2C2C - Primary text
    background: draftWhite,           // #FFFFFF - Primary background
    tint: draftAccent,                // #4A90E2 - Accent for critical actions
    
    // UI Elements
    icon: draftGray600,               // Icons and symbols
    tabIconDefault: draftGray500,     // Inactive tab icons
    tabIconSelected: draftAccent,     // Active tab icons
    border: draftGray200,             // Borders and dividers
    card: draftGray100,               // Card/surface backgrounds
    
    // Draft-specific semantic colors
    surface: draftGray100,            // Subtle surface backgrounds
    surfaceElevated: draftWhite,      // Elevated card backgrounds
    textSecondary: draftGray600,      // Secondary text (metadata, timestamps)
    textTertiary: draftGray500,       // Tertiary text (placeholders, hints)
    textDisabled: draftGray400,       // Disabled text
    accent: draftAccent,              // Single accent color for CTAs
    accentSoft: '#EBF4FD',           // Soft accent background
  },
  dark: {
    // Draft Dark Mode (Maintains monochromatic approach)
    text: '#F1F3F4',                 // Light text on dark
    background: '#1A1D21',           // Dark background
    tint: '#6AB7FF',                 // Brighter accent for dark mode
    
    // UI Elements
    icon: '#8F959E',                 // Icons and symbols
    tabIconDefault: '#70787F',       // Inactive tab icons
    tabIconSelected: '#6AB7FF',      // Active tab icons
    border: '#2F3339',              // Borders and dividers
    card: '#242831',                // Card/surface backgrounds
    
    // Draft-specific semantic colors
    surface: '#242831',              // Subtle surface backgrounds
    surfaceElevated: '#2A2F38',      // Elevated card backgrounds
    textSecondary: '#A1A7B0',        // Secondary text
    textTertiary: '#8F959E',         // Tertiary text
    textDisabled: '#5F666D',         // Disabled text
    accent: '#6AB7FF',               // Accent for CTAs
    accentSoft: '#1A2B3D',          // Soft accent background
  },
};
