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

// in rgb format
const bgColor = '13, 14, 34';
const bgAlpha = {
  300: `rgba(${bgColor}, 0.3)`,
  500: `rgba(${bgColor}, 0.5)`,
  700: `rgba(${bgColor}, 0.7)`,
  1000: `rgba(${bgColor}, 1)`,
};

// purple colors
const primary = {
  300: '#B794F4',
  500: '#805AD5',
  700: '#553C9A',
};

// pink colors
const secondary = {
  300: '#F687B3',
  500: '#D53F8C',
  700: '#97266D',
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
    heading: "Inter, 'sans-serif'",
    body: "Inter, 'sans-serif'",
  },
  colors: { primary, secondary, bgAlpha },
  semanticTokens: {
    colors: {
      bg: 'bgAlpha.1000',
      primary: 'primary.500',
      secondary: 'secondary.500',
    },
  },
});
