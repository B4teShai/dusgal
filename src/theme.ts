export const theme = {
  colors: {
    light: {
      primary: '#0ea5e9', // Sky blue
      secondary: '#64748b', // Slate
      background: '#f8fafc', // Slate 50
      surface: '#ffffff',
      text: {
        primary: '#0f172a', // Slate 900
        secondary: '#475569', // Slate 600
        light: '#94a3b8', // Slate 400
      },
      border: '#e2e8f0', // Slate 200
      success: '#22c55e', // Green 500
      error: '#ef4444', // Red 500
      warning: '#f59e0b', // Amber 500
      accent: {
        blue: '#3b82f6', // Blue 500
        purple: '#8b5cf6', // Violet 500
        green: '#10b981', // Emerald 500
      },
      opacity: {
        primary: '#0ea5e915',
      },
    },
    dark: {
      primary: '#38bdf8', // Sky blue 400
      secondary: '#94a3b8', // Slate 400
      background: '#0f172a', // Slate 900
      surface: '#1e293b', // Slate 800
      text: {
        primary: '#f8fafc', // Slate 50
        secondary: '#cbd5e1', // Slate 300
        light: '#94a3b8', // Slate 400
      },
      border: '#334155', // Slate 700
      success: '#4ade80', // Green 400
      error: '#f87171', // Red 400
      warning: '#fbbf24', // Amber 400
      accent: {
        blue: '#60a5fa', // Blue 400
        purple: '#a78bfa', // Violet 400
        green: '#34d399', // Emerald 400
      },
      opacity: {
        primary: '#ffffff15',
      },
    },
  },
  fonts: {
    regular: 'SpaceMono',
    bold: 'SpaceMono',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
} as const;

// Tailwind classes for common components
export const commonStyles = {
  container: 'flex-1',
  card: 'rounded-2xl p-6',
  input: 'flex-row items-center border rounded-xl px-4 py-3',
  button: {
    primary: 'rounded-xl py-4 shadow-sm',
    secondary: 'rounded-xl py-4',
    text: {
      primary: 'text-center font-semibold text-lg',
      secondary: 'text-center font-semibold text-lg',
    },
  },
  text: {
    title: 'text-4xl font-bold',
    subtitle: 'mt-2 text-lg',
    label: 'mb-2 font-medium',
    link: 'text-center font-medium',
  },
  header: {
    container: 'px-6 py-8',
    title: 'text-3xl font-bold',
    subtitle: 'mt-1',
  },
  section: {
    container: 'px-6 py-4',
    title: 'text-xl font-semibold mb-4',
  },
} as const; 