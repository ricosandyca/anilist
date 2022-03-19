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

// blue colors
const primary = {
  50: '#ebf8ff',
  100: '#bee3f8',
  200: '#90cdf4',
  300: '#63b3ed',
  400: '#4299e1',
  500: '#3182ce',
  600: '#2b6cb0',
  700: '#2c5282',
  800: '#2a4365',
  900: '#1A365D',
};

// cyan colors
const secondary = {
  50: '#EDFDFD',
  100: '#C4F1F9',
  200: '#9DECF9',
  300: '#76E4F7',
  400: '#0BC5EA',
  500: '#00B5D8',
  600: '#00A3C4',
  700: '#0987A0',
  800: '#086F83',
  900: '#065666',
};

export default extendTheme({
  config: { initialColorMode: 'dark' },
  fonts: {
    heading: "Inter, 'sans-serif'",
    body: "Inter, 'sans-serif'",
  },
  colors: { primary, secondary },
  semanticTokens: {
    colors: {
      primary: {
        default: 'primary.500',
        _dark: 'primary.400',
      },
      primaryText: {
        default: 'white',
        _dark: 'white',
      },
      secondary: {
        default: 'secondary.400',
        _dark: 'secondary.500',
      },
      secondaryText: {
        default: 'gray.900',
        _dark: 'gray.50',
      },
      text: {
        default: 'gray.800',
        _dark: 'gray.50',
      },
      bg: {
        default: 'gray.50',
        _dark: 'gray.800',
      },
    },
  },
});
