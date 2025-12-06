// src/theme-dark.js
import { MD3DarkTheme } from 'react-native-paper';

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#3C6FF0',
    secondary: '#FEC857',
    background: '#000000',
    surface: '#111827',     
    text: '#FFFFFF',
    bottomBar: '#111827',   
  },
  fonts: {
    ...MD3DarkTheme.fonts,
    bodyLarge: { ...MD3DarkTheme.fonts.bodyLarge, fontFamily: 'PoppinsRegular' },
    titleLarge: { ...MD3DarkTheme.fonts.titleLarge, fontFamily: 'PoppinsSemiBold' },
  },
};

export default darkTheme;
