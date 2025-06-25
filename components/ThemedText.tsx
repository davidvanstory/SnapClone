/**
 * Draft Typography System - ThemedText Component
 * 
 * Implements the Draft typography hierarchy:
 * - Instrument Serif: Headers, user names, emphasis (warmth for personal elements)
 * - Montserrat: UI elements, body text, labels (clarity for functional text)
 * - Generous line spacing (1.5-1.6x) for anxiety-reducing readability
 */

import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 
    | 'default'           // Montserrat body text
    | 'body'              // Montserrat body text (alias)
    | 'title'             // Instrument Serif large header
    | 'heading'           // Instrument Serif medium header
    | 'subheading'        // Instrument Serif small header
    | 'username'          // Instrument Serif for personal touch
    | 'label'             // Montserrat UI labels
    | 'caption'           // Montserrat small text
    | 'button'            // Montserrat button text
    | 'link'              // Montserrat link text
    | 'metadata';         // Montserrat metadata/timestamps
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  
  // Use semantic color mapping for different text types
  const getSemanticColor = () => {
    switch (type) {
      case 'metadata':
      case 'caption':
        return useThemeColor({ light: lightColor, dark: darkColor }, 'textSecondary');
      case 'link':
        return useThemeColor({ light: lightColor, dark: darkColor }, 'accent');
      default:
        return color;
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
  // Montserrat - UI and Body Text
  default: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
    lineHeight: 24,            // 1.5x spacing for readability
  },
  body: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  label: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 12,
    lineHeight: 18,
  },
  button: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 16,
    lineHeight: 20,
  },
  link: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 16,
    lineHeight: 24,
  },
  metadata: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 13,
    lineHeight: 18,
  },
  
  // Instrument Serif - Headers and Personal Elements
  title: {
    fontFamily: 'InstrumentSerif_400Regular',
    fontSize: 32,
    lineHeight: 40,            // 1.25x for headers
    fontWeight: '400',         // Instrument Serif has built-in weight
  },
  heading: {
    fontFamily: 'InstrumentSerif_400Regular',
    fontSize: 24,
    lineHeight: 32,
  },
  subheading: {
    fontFamily: 'InstrumentSerif_400Regular',
    fontSize: 20,
    lineHeight: 28,
  },
  username: {
    fontFamily: 'InstrumentSerif_400Regular',
    fontSize: 18,
    lineHeight: 24,
  },
});
