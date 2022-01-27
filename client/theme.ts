import { extendTheme } from '@chakra-ui/react';

// Used https://maketintsandshades.com
// to generate the color shades
export const theme = extendTheme({
  colors: {
    primary: {
      100: '#95e7e4',
      200: '#6bddd9',
      300: '#55d9d3',
      400: '#40d4ce',
      500: '#2BCFC8',
      600: '#27bab4	',
      700: '#22a6a0',
      800: '#1e918c',
      900: '#1a7c78',
    },
    secondary: {
      100: '#85a0cd',
      200: '#7190c5',
      300: '#5d81bd',
      400: '#4871b4',
      500: '#3461AC',
      600: '#2f579b',
      700: '#2a4e8a',
      800: '#244478',
      900: '#1f3a67',
    },
    tertiary: {
      100: '#be95f2',
      200: '#b384f0',
      300: '#a972ee',
      400: '#9e61ec',
      500: '#934FEA',
      600: '#8447d3',
      700: '#763fbb',
      800: '#6737a4',
      900: '#582f8c',
    },
  },
});
