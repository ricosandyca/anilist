import { extendTheme } from '@chakra-ui/react';
import '@fontsource/inter/100.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';
import '@fontsource/poppins/100.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';

// in rgb format
const bgColor = '13, 14, 34';
const bgAlpha = {
  50: `rgba(${bgColor}, 0.05)`,
  100: `rgba(${bgColor}, 0.1)`,
  200: `rgba(${bgColor}, 0.2)`,
  300: `rgba(${bgColor}, 0.3)`,
  400: `rgba(${bgColor}, 0.4)`,
  500: `rgba(${bgColor}, 0.5)`,
  600: `rgba(${bgColor}, 0.6)`,
  700: `rgba(${bgColor}, 0.7)`,
  800: `rgba(${bgColor}, 0.8)`,
  900: `rgba(${bgColor}, 0.9)`,
  1000: `rgba(${bgColor}, 1)`,
};

export default extendTheme({
  config: { initialColorMode: 'dark' },
  // override background color
  styles: {
    global: () => ({
      body: {
        color: 'white',
        bg: 'bgAlpha.1000',
      },
      '::-webkit-scrollbar': {
        w: '10px',
        h: '10px',
        bg: 'transparent',
      },
      '::-webkit-scrollbar-thumb': {
        borderRadius: '100px',
        bg: 'purple.800',
        '&:hover': {
          bg: 'purple.900',
        },
      },
      '.small-content-scroll::-webkit-scrollbar': {
        w: '4px',
        h: '4px',
        bg: 'transparent',
      },
      '.small-content-scroll::-webkit-scrollbar-thumb': {
        borderRadius: '100px',
        bg: 'whiteAlpha.300',
        '&:hover': {
          bg: 'whiteAlpha.400',
        },
      },
    }),
  },
  fonts: {
    heading: "Poppins, 'sans-serif'",
    body: "Inter, 'sans-serif'",
  },
  colors: { bgAlpha },
  semanticTokens: {
    colors: {
      bg: 'bgAlpha.1000',
      primary: 'primary.500',
      secondary: 'secondary.500',
    },
  },
});
