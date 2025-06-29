/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

/**
 * JUNI Glass Morphism Design System Colors
 * 
 * Implements the complete glass morphism color system from UIDesign.md:
 * - Pure white backgrounds with charcoal text
 * - Glass morphism colors with specific rgba values and opacity levels
 * - Warm accent colors used sparingly for encouraging actions
 * - Monochromatic + accent system for anxiety-reducing visual hierarchy
 */

// Primary Neutrals (Per UIDesign.md)
const pureWhite = '#FFFFFF';           // Primary text, key UI elements
const charcoalText = '#2C2C2C';        // High contrast text when needed
const softGraySurfaces = '#F8F8F8';    // Background cards, subtle separators
const mediumGray = '#E5E5E5';          // Inactive states, borders

// Glass Morphism Colors (Per UIDesign.md - Exact RGBA Values)
const primaryGlass = 'rgba(255, 255, 255, 0.15)';      // Main card backgrounds
const secondaryGlass = 'rgba(255, 255, 255, 0.25)';    // Active/hover states
const textGlass = 'rgba(255, 255, 255, 0.9)';          // Primary white text
const secondaryTextGlass = 'rgba(255, 255, 255, 0.7)'; // Metadata, timestamps
const subtleTextGlass = 'rgba(255, 255, 255, 0.5)';    // Disabled states

// Glass Morphism Input Colors (Per UIDesign.md)
const inputGlass = 'rgba(255, 255, 255, 0.2)';         // Input backgrounds
const inputBorderGlass = 'rgba(255, 255, 255, 0.3)';   // Input borders
const placeholderGlass = 'rgba(255, 255, 255, 0.5)';   // Placeholder text

// Accent Colors - Used Sparingly (Per UIDesign.md)
const warmSage = '#8B9D83';            // Encouraging actions (AI feedback, positive states)
const darkSage = '#4A5A44';            // Darker green for caption text (darker version of warmSage)
const softCoral = '#E67E50';           // Critical actions (delete, warnings)
const warmTan = '#B8956A';             // Special moments (first post, achievements)

// Glass Morphism Border Colors (Per UIDesign.md)
const primaryBorder = 'rgba(255, 255, 255, 0.2)';      // Primary glass card borders
const secondaryBorder = 'rgba(255, 255, 255, 0.15)';   // Secondary glass element borders

export const Colors = {
  light: {
    // Primary Neutrals
    text: charcoalText,                 // #2C2C2C - Primary text for solid backgrounds
    background: pureWhite,              // #FFFFFF - Primary background
    surface: softGraySurfaces,          // #F8F8F8 - Subtle surface backgrounds
    border: mediumGray,                 // #E5E5E5 - Standard borders
    
    // Glass Morphism Colors
    glassPrimary: primaryGlass,         // rgba(255,255,255,0.15) - Primary glass cards
    glassSecondary: secondaryGlass,     // rgba(255,255,255,0.25) - Secondary glass/hover states
    glassText: textGlass,               // rgba(255,255,255,0.9) - Text over glass/artwork
    glassTextSecondary: secondaryTextGlass, // rgba(255,255,255,0.7) - Secondary text over glass
    glassTextSubtle: subtleTextGlass,   // rgba(255,255,255,0.5) - Subtle text over glass
    
    // Glass Morphism Input Colors
    glassInput: inputGlass,             // rgba(255,255,255,0.2) - Input backgrounds
    glassInputBorder: inputBorderGlass, // rgba(255,255,255,0.3) - Input borders
    glassPlaceholder: placeholderGlass, // rgba(255,255,255,0.5) - Placeholder text
    
    // Glass Morphism Borders
    glassBorderPrimary: primaryBorder,  // rgba(255,255,255,0.2) - Primary glass borders
    glassBorderSecondary: secondaryBorder, // rgba(255,255,255,0.15) - Secondary glass borders
    
    // Accent Colors (Sparingly Used)
    accentSage: warmSage,              // #8B9D83 - Encouraging actions
    accentDarkSage: darkSage,          // #4A5A44 - Dark green for caption text
    accentCoral: softCoral,            // #E67E50 - Critical actions
    accentTan: warmTan,                // #B8956A - Special moments
    
    // Legacy Theme Colors (Maintain compatibility)
    tint: warmSage,                    // Primary accent
    icon: charcoalText,                // Icons and symbols
    tabIconDefault: mediumGray,        // Inactive tab icons
    tabIconSelected: warmSage,         // Active tab icons
    card: softGraySurfaces,            // Card backgrounds
    
    // Semantic Colors
    textSecondary: 'rgba(44, 44, 44, 0.7)',    // Secondary text on solid backgrounds
    textTertiary: 'rgba(44, 44, 44, 0.5)',     // Tertiary text on solid backgrounds
    textDisabled: 'rgba(44, 44, 44, 0.3)',     // Disabled text
    accent: warmSage,                           // Primary accent for CTAs
  },
  dark: {
    // Dark Mode Glass Morphism (Maintains same glass morphism approach)
    text: textGlass,                    // Light text on dark
    background: '#1A1D21',              // Dark background
    surface: '#242831',                 // Dark surface backgrounds
    border: '#2F3339',                  // Dark borders
    
    // Glass Morphism Colors (Same as light - overlay on dark artwork)
    glassPrimary: primaryGlass,         // rgba(255,255,255,0.15) - Works on dark backgrounds
    glassSecondary: secondaryGlass,     // rgba(255,255,255,0.25) - Works on dark backgrounds
    glassText: textGlass,               // rgba(255,255,255,0.9) - Text over glass/artwork
    glassTextSecondary: secondaryTextGlass, // rgba(255,255,255,0.7) - Secondary text
    glassTextSubtle: subtleTextGlass,   // rgba(255,255,255,0.5) - Subtle text
    
    // Glass Morphism Input Colors (Same - designed for overlay)
    glassInput: inputGlass,             // rgba(255,255,255,0.2)
    glassInputBorder: inputBorderGlass, // rgba(255,255,255,0.3)
    glassPlaceholder: placeholderGlass, // rgba(255,255,255,0.5)
    
    // Glass Morphism Borders (Same - designed for overlay)
    glassBorderPrimary: primaryBorder,  // rgba(255,255,255,0.2)
    glassBorderSecondary: secondaryBorder, // rgba(255,255,255,0.15)
    
    // Accent Colors (Same - work on both backgrounds)
    accentSage: warmSage,              // #8B9D83
    accentDarkSage: darkSage,          // #4A5A44 - Dark green for caption text
    accentCoral: softCoral,            // #E67E50
    accentTan: warmTan,                // #B8956A
    
    // Legacy Theme Colors
    tint: warmSage,                    // Primary accent
    icon: textGlass,                   // Icons and symbols
    tabIconDefault: subtleTextGlass,   // Inactive tab icons
    tabIconSelected: warmSage,         // Active tab icons
    card: '#242831',                   // Card backgrounds
    
    // Semantic Colors
    textSecondary: secondaryTextGlass, // Secondary text
    textTertiary: subtleTextGlass,     // Tertiary text
    textDisabled: 'rgba(255, 255, 255, 0.3)', // Disabled text
    accent: warmSage,                  // Primary accent for CTAs
  },
};
