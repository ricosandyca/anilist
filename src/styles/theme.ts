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
  300: `rgba(${bgColor}, 0.3)`,
  500: `rgba(${bgColor}, 0.5)`,
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
