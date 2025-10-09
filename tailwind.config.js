/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          // Base colors
          background: {
            DEFAULT: 'hsl(0, 0%, 100%)',
            dark: 'hsl(0, 0%, 0%)',
          },
          foreground: {
            DEFAULT: 'hsl(210, 25%, 7.84%)',
            dark: 'hsl(200, 6.67%, 91.18%)',
          },
          
          // Border colors
          border: {
            DEFAULT: 'hsl(201.43, 30.43%, 90.98%)',
            dark: 'hsl(210, 5.26%, 14.90%)',
          },
          
          // Card colors
          card: {
            DEFAULT: 'hsl(180, 6.67%, 97.06%)',
            foreground: 'hsl(210, 25%, 7.84%)',
            border: 'hsl(220, 9%, 90%)',
            dark: 'hsl(228, 9.80%, 10%)',
            'foreground-dark': 'hsl(0, 0%, 85.10%)',
            'border-dark': 'hsl(220, 20%, 20%)',
          },
          
          // Primary - Blue
          primary: {
            DEFAULT: 'hsl(203.89, 88.28%, 53.14%)',
            foreground: 'hsl(0, 0%, 100%)',
            dark: 'hsl(203.77, 87.60%, 52.55%)',
          },
          
          // Secondary
          secondary: {
            DEFAULT: 'hsl(210, 25%, 7.84%)',
            foreground: 'hsl(0, 0%, 100%)',
            dark: 'hsl(195, 15.38%, 94.90%)',
            'foreground-dark': 'hsl(210, 25%, 7.84%)',
          },
          
          // Muted
          muted: {
            DEFAULT: 'hsl(216, 33.33%, 97.06%)',
            foreground: 'hsl(208.24, 7.3%, 45.69%)',
            dark: 'hsl(0, 0%, 9.41%)',
            'foreground-dark': 'hsl(210, 3.39%, 46.27%)',
          },
          
          // Accent - Green
          accent: {
            DEFAULT: 'hsl(160.22, 100%, 35.69%)',
            foreground: 'hsl(203.89, 88.28%, 53.14%)',
            dark: 'hsl(205.71, 70%, 7.84%)',
            'foreground-dark': 'hsl(203.77, 87.60%, 52.55%)',
          },
          
          // Destructive - Red
          destructive: {
            DEFAULT: 'hsl(356.3, 90.56%, 54.31%)',
            foreground: 'hsl(0, 0%, 100%)',
          },
          
          // CTA Button - Yellow/Orange
          cta: {
            DEFAULT: 'hsl(42.03, 92.83%, 56.27%)',
            hover: 'hsl(42.03, 92.83%, 50%)',
          },
          
          // Chart colors
          chart: {
            1: 'hsl(203.89, 88.28%, 53.14%)',
            2: 'hsl(159.78, 100%, 36.08%)',
            3: 'hsl(42.03, 92.83%, 56.27%)',
            4: 'hsl(147.14, 78.50%, 41.96%)',
            5: 'hsl(341.49, 75.2%, 50.98%)',
          },
          
          // Sidebar colors
          sidebar: {
            DEFAULT: 'hsl(180, 6.67%, 97.06%)',
            foreground: 'hsl(210, 25%, 7.84%)',
            border: 'hsl(205, 25%, 90.59%)',
            primary: 'hsl(203.89, 88.28%, 53.14%)',
            'primary-foreground': 'hsl(0, 0%, 100%)',
            accent: 'hsl(211.58, 51.35%, 92.75%)',
            'accent-foreground': 'hsl(203.89, 88.28%, 53.14%)',
            dark: 'hsl(228, 9.80%, 10%)',
            'foreground-dark': 'hsl(0, 0%, 85.10%)',
            'border-dark': 'hsl(205.71, 15.79%, 26.08%)',
            'primary-dark': 'hsl(202.82, 89.12%, 53.14%)',
            'accent-dark': 'hsl(205.71, 70%, 7.84%)',
            'accent-foreground-dark': 'hsl(203.77, 87.60%, 52.55%)',
          },
          
          // Popover colors
          popover: {
            DEFAULT: 'hsl(0, 0%, 100%)',
            foreground: 'hsl(210, 25%, 7.84%)',
            border: 'hsl(220, 9%, 85%)',
            dark: 'hsl(0, 0%, 0%)',
            'foreground-dark': 'hsl(200, 6.67%, 91.18%)',
            'border-dark': 'hsl(220, 20%, 22%)',
          },
          
          // Input colors
          input: {
            DEFAULT: 'hsl(200, 23.08%, 97.45%)',
            dark: 'hsl(207.69, 27.66%, 18.43%)',
          },
          
          // Ring colors
          ring: {
            DEFAULT: 'hsl(202.82, 89.12%, 53.14%)',
          },
        },
        
        borderRadius: {
          lg: '1.3rem',
          md: 'calc(1.3rem - 2px)',
          sm: 'calc(1.3rem - 4px)',
        },
        
        fontFamily: {
          sans: ['Open Sans', 'sans-serif'],
          serif: ['Merriweather', 'serif'],
          mono: ['Roboto Mono', 'monospace'],
        },
        
        letterSpacing: {
          normal: '0em',
        },
        
        spacing: {
          base: '0.25rem',
        },
        
        boxShadow: {
          '2xs': '0px 2px 0px 0px rgba(0, 0, 0, 0)',
          xs: '0px 2px 0px 0px rgba(0, 0, 0, 0)',
          sm: '0px 2px 0px 0px rgba(0, 0, 0, 0), 0px 1px 2px -1px rgba(0, 0, 0, 0)',
          DEFAULT: '0px 2px 0px 0px rgba(0, 0, 0, 0), 0px 1px 2px -1px rgba(0, 0, 0, 0)',
          md: '0px 2px 0px 0px rgba(0, 0, 0, 0), 0px 2px 4px -1px rgba(0, 0, 0, 0)',
          lg: '0px 2px 0px 0px rgba(0, 0, 0, 0), 0px 4px 6px -1px rgba(0, 0, 0, 0)',
          xl: '0px 2px 0px 0px rgba(0, 0, 0, 0), 0px 8px 10px -1px rgba(0, 0, 0, 0)',
          '2xl': '0px 2px 0px 0px rgba(0, 0, 0, 0)',
        },
        
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          slideDown: {
            '0%': { transform: 'translateY(-20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
        },
        
        animation: {
          fadeIn: 'fadeIn 0.5s ease-out',
          slideUp: 'slideUp 0.5s ease-out',
          slideDown: 'slideDown 0.5s ease-out',
        },
      },
    },
    plugins: [],
  }