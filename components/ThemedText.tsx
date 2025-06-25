/**
 * EphemeralArt Typography System - ThemedText Component
 * 
 * Implements the complete typography hierarchy from UIDesign.md:
 * - Instrument Serif: App name/headers (32-42pt), screen titles (24-28pt), user names (16-18pt), decorative elements (14-16pt)
 * - Montserrat: Primary headers (20-24pt), body text (14-16pt), button text (14-16pt), labels (12-14pt), metadata (11-12pt), small details (10-11pt)
 * - Line heights: 1.4-1.5x for body text, 1.2-1.3x for headers
 * - Supports both solid background text and glass morphism overlay text
 */

import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 
    // Instrument Serif - Headers and Personal Elements (Per UIDesign.md)
    | 'appName'           // Instrument Serif 42pt - App name/large headers
    | 'screenTitle'       // Instrument Serif 28pt - Screen titles
    | 'heading'           // Instrument Serif 24pt - Medium headers (compatibility)
    | 'username'          // Instrument Serif 18pt - User names/artist credits
    | 'decorative'        // Instrument Serif 16pt - Decorative elements
    
    // Montserrat - UI Typography (Per UIDesign.md)
    | 'primaryHeader'     // Montserrat 24pt - Primary headers
    | 'bodyText'          // Montserrat 16pt - Body text/comments
    | 'button'            // Montserrat 16pt - Button text
    | 'label'             // Montserrat 14pt - Labels
    | 'metadata'          // Montserrat 12pt - Metadata/timestamps
    | 'smallDetail'       // Montserrat 11pt - Small details
    
    // Legacy/Compatibility Types
    | 'default'           // Montserrat body text (alias for bodyText)
    | 'body'              // Montserrat body text (alias for bodyText)
    | 'title'             // Instrument Serif large header (alias for appName)
    | 'subheading'        // Instrument Serif small header (alias for decorative)
    | 'caption'           // Montserrat small text (alias for smallDetail)
    | 'link';             // Montserrat link text (same as bodyText)
  
  // Glass morphism text support
  glassText?: boolean;    // Use glass morphism text colors (white over artwork)
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  glassText = false,
  ...rest
}: ThemedTextProps) {
  
  // Get semantic color based on text type and glass morphism usage
  const getSemanticColor = () => {
    if (glassText) {
      // Glass morphism text colors (white over artwork backgrounds)
      switch (type) {
        case 'metadata':
        case 'smallDetail':
        case 'caption':
          return useThemeColor({ light: lightColor, dark: darkColor }, 'glassTextSubtle');
        case 'label':
        case 'decorative':
          return useThemeColor({ light: lightColor, dark: darkColor }, 'glassTextSecondary');
        default:
          return useThemeColor({ light: lightColor, dark: darkColor }, 'glassText');
      }
    } else {
      // Standard text colors (charcoal on solid backgrounds)
      switch (type) {
        case 'metadata':
        case 'smallDetail':
        case 'caption':
          return useThemeColor({ light: lightColor, dark: darkColor }, 'textTertiary');
        case 'label':
        case 'decorative':
          return useThemeColor({ light: lightColor, dark: darkColor }, 'textSecondary');
        case 'link':
          return useThemeColor({ light: lightColor, dark: darkColor }, 'accent');
        default:
          return useThemeColor({ light: lightColor, dark: darkColor }, 'text');
      }
    }
  };

  const textColor = getSemanticColor();

  return (
    <Text
      style={[
        { color: textColor },
        styles[type],
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  // Instrument Serif - Headers and Personal Elements (Per UIDesign.md Exact Specs)
  appName: {
    fontFamily: 'InstrumentSerif_400Regular',
    fontSize: 42,              // 42pt - App name/large headers
    lineHeight: 50,            // 1.2x for headers
    fontWeight: '500',         // Medium weight per UIDesign.md
    letterSpacing: -0.02 * 42, // -0.02em for large headers
  },
  screenTitle: {
    fontFamily: 'InstrumentSerif_400Regular',
    fontSize: 28,              // 28pt - Screen titles
    lineHeight: 34,            // 1.2x for headers
    fontWeight: '500',         // Medium weight per UIDesign.md
    letterSpacing: -0.02 * 28, // -0.02em for large headers
  },
  heading: {
    fontFamily: 'InstrumentSerif_400Regular',
    fontSize: 24,              // 24pt - Medium headers
    lineHeight: 30,            // 1.25x for headers
    fontWeight: '400',         // Regular weight
  },
  username: {
    fontFamily: 'InstrumentSerif_400Regular',
    fontSize: 18,              // 18pt - User names/artist credits
    lineHeight: 24,            // 1.3x for readability
    fontWeight: '400',         // Regular weight
  },
  decorative: {
    fontFamily: 'InstrumentSerif_400Regular',
    fontSize: 16,              // 16pt - Decorative elements
    lineHeight: 22,            // 1.4x for readability
    fontWeight: '400',         // Regular weight
  },
  
  // Montserrat - UI Typography (Per UIDesign.md Exact Specs)
  primaryHeader: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 24,              // 24pt - Primary headers
    lineHeight: 30,            // 1.25x for headers
    fontWeight: '500',         // Medium weight
  },
  bodyText: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,              // 16pt - Body text/comments
    lineHeight: 24,            // 1.5x for body text readability
    fontWeight: '400',         // Regular weight
  },
  button: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 16,              // 16pt - Button text
    lineHeight: 20,            // Tighter line height for buttons
    fontWeight: '500',         // Medium weight for emphasis
  },
  label: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 14,              // 14pt - Labels
    lineHeight: 20,            // 1.4x for readability
    fontWeight: '500',         // Medium weight
  },
  metadata: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 12,              // 12pt - Metadata/timestamps
    lineHeight: 16,            // 1.3x for small text
    fontWeight: '400',         // Regular weight
  },
  smallDetail: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 11,              // 11pt - Small details
    lineHeight: 15,            // 1.4x for readability
    fontWeight: '400',         // Regular weight
  },
  
  // Legacy/Compatibility Types (Map to new system)
  default: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,              // Same as bodyText
    lineHeight: 24,
    fontWeight: '400',
  },
  body: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,              // Same as bodyText
    lineHeight: 24,
    fontWeight: '400',
  },
  title: {
    fontFamily: 'InstrumentSerif_400Regular',
    fontSize: 42,              // Same as appName
    lineHeight: 50,
    fontWeight: '500',
    letterSpacing: -0.02 * 42,
  },
  subheading: {
    fontFamily: 'InstrumentSerif_400Regular',
    fontSize: 16,              // Same as decorative
    lineHeight: 22,
    fontWeight: '400',
  },
  caption: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 11,              // Same as smallDetail
    lineHeight: 15,
    fontWeight: '400',
  },
  link: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 16,              // Same as bodyText but medium weight
    lineHeight: 24,
    fontWeight: '500',
  },
});
