export const Colors = {
  // Brand
  primary: '#3AADA8',       // teal
  primaryDark: '#2E8E8A',
  primaryForeground: '#FFFFFF',
  secondary: '#F4845F',     // coral
  secondaryForeground: '#FFFFFF',
  accent: '#F5C842',        // yellow (stars)

  // Backgrounds
  background: '#FAF9F6',
  card: '#FFFFFF',
  muted: '#F0EDE8',

  // Text
  foreground: '#1A2235',
  mutedForeground: '#8A8A9A',

  // Semantic
  destructive: '#E53E3E',
  border: '#E8E5E0',
  success: '#38A169',

  // Gradient stops
  gradientStart: '#3AADA8',
  gradientEnd: '#6BBCD4',

  // TEA palette
  cream: '#FAF9F6',
  warm: '#F5C842',
  sage: '#7BAE7F',
  lavender: '#A78BC2',
  sky: '#6BBCD4',
} as const;

export const Fonts = {
  display: 'System',   // Quicksand not bundled; use system bold
  body: 'System',
  bold: 'System',
  sizes: {
    xs: 11,
    sm: 13,
    base: 15,
    lg: 17,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
  },
  weights: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
} as const;

export const Radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
} as const;

export const Shadows = {
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;
