// Design System - Cohesive UI/UX for Parish Portal
// Inspired by hdgmvietnam.com style: Clean, Red-dominant, Modern

export const designSystem = {
  // Color Palette
  colors: {
    // Primary Red (main brand)
    primary: '#D32F2F',
    primaryLight: '#EF5350',
    primaryDark: '#B71C1C',

    // Grays (neutral)
    bg: '#FFFFFF',
    bgSecondary: '#F9FAFB',
    border: '#E5E7EB',
    text: '#111827',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',

    // Accents
    accent: '#2563EB', // Blue
    success: '#10B981', // Green
    warning: '#F59E0B', // Amber

    // Dark mode
    darkBg: '#0F172A',
    darkBgSecondary: '#1E293B',
    darkBorder: '#334155',
    darkText: '#F1F5F9',
    darkTextSecondary: '#CBD5E1'
  },

  // Typography
  fonts: {
    family: "'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', sans-serif",
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem'  // 36px
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    }
  },

  // Spacing (8px grid)
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
    '4xl': '64px'
  },

  // Border radius
  radius: {
    none: '0px',
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '16px',
    full: '9999px'
  },

  // Shadows
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.15)'
  },

  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    base: '300ms ease-in-out',
    slow: '500ms ease-in-out'
  },

  // Component styles (ready to use)
  components: {
    button: {
      primary: {
        light: {
          bg: '#D32F2F',
          color: '#FFFFFF',
          hover: '#B71C1C',
          active: '#9A0007'
        },
        dark: {
          bg: '#EF5350',
          color: '#FFFFFF',
          hover: '#D32F2F',
          active: '#B71C1C'
        }
      },
      secondary: {
        light: {
          bg: '#F9FAFB',
          color: '#111827',
          hover: '#F3F4F6',
          border: '#E5E7EB'
        },
        dark: {
          bg: '#1E293B',
          color: '#F1F5F9',
          hover: '#334155',
          border: '#334155'
        }
      }
    },

    card: {
      light: {
        bg: '#FFFFFF',
        border: '#E5E7EB',
        shadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      },
      dark: {
        bg: '#1E293B',
        border: '#334155',
        shadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
      }
    },

    input: {
      light: {
        bg: '#F9FAFB',
        border: '#E5E7EB',
        text: '#111827',
        placeholder: '#9CA3AF'
      },
      dark: {
        bg: '#1E293B',
        border: '#334155',
        text: '#F1F5F9',
        placeholder: '#64748B'
      }
    }
  }
};

// Helper function for theme-aware styles
export const getThemeStyle = (lightStyle: any, darkStyle: any) => {
  return `
    ${Object.entries(lightStyle).map(([key, value]) => `${key}: ${value};`).join(' ')}
    @media (prefers-color-scheme: dark) {
      ${Object.entries(darkStyle).map(([key, value]) => `${key}: ${value};`).join(' ')}
    }
  `;
};

// Quick style builders
export const styles = {
  text: (size: string, weight: number, color: string) => ({
    fontSize: designSystem.fonts.sizes[size as keyof typeof designSystem.fonts.sizes] || size,
    fontWeight: weight,
    color: color,
    fontFamily: designSystem.fonts.family
  }),

  card: (isDark: boolean) => ({
    backgroundColor: isDark ? designSystem.components.card.dark.bg : designSystem.components.card.light.bg,
    border: `1px solid ${isDark ? designSystem.components.card.dark.border : designSystem.components.card.light.border}`,
    boxShadow: isDark ? designSystem.components.card.dark.shadow : designSystem.components.card.light.shadow,
    borderRadius: designSystem.radius.lg,
    padding: designSystem.spacing.lg,
    transition: `all ${designSystem.transitions.base}`
  }),

  button: (variant: 'primary' | 'secondary', isDark: boolean) => {
    const scheme = designSystem.components.button[variant];
    const theme = isDark ? scheme.dark : scheme.light;
    return {
      padding: `${designSystem.spacing.md} ${designSystem.spacing.lg}`,
      borderRadius: designSystem.radius.md,
      border: variant === 'secondary' ? `1px solid ${theme.border}` : 'none',
      backgroundColor: theme.bg,
      color: theme.color,
      fontWeight: designSystem.fonts.weights.semibold,
      cursor: 'pointer',
      transition: `all ${designSystem.transitions.fast}`,
      fontSize: designSystem.fonts.sizes.base,
      fontFamily: designSystem.fonts.family
    };
  }
};
