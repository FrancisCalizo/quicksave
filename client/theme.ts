import { extendTheme } from '@chakra-ui/react';

// Used https://maketintsandshades.com
// or https://smart-swatch.netlify.app/
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
    // Mainly for colorscheme on badges
    lime: {
      50: '#f2ffde',
      100: '#defcb2',
      200: '#caf884',
      300: '#b5f554',
      400: '#a1f226',
      500: '#88d90d',
      600: '#69a905',
      700: '#4a7801',
      800: '#2b4800',
      900: '#0b1900',
    },
    hotPink: {
      50: '#ffe2f4',
      100: '#ffb2da',
      200: '#ff80bf',
      300: '#fe4ea6',
      400: '#fd218c',
      500: '#e40d73',
      600: '#b20559',
      700: '#800040',
      800: '#4e0026',
      900: '#1f000f',
    },
    olive: {
      50: '#ffffdd',
      100: '#ffffb0',
      200: '#ffff80',
      300: '#ffff4f',
      400: '#ffff23',
      500: '#e5e611',
      600: '#b2b306',
      700: '#7f8000',
      800: '#4c4d00',
      900: '#191a00',
    },
    navy: {
      50: '#e4e4ff',
      100: '#b2b3ff',
      200: '#8080ff',
      300: '#4e4dfe',
      400: '#1f1bfd',
      500: '#0a02e4',
      600: '#0301b2',
      700: '#000080',
      800: '#00004f',
      900: '#00001f',
    },
  },
});
