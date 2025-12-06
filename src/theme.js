// src/theme.js
import { MD3LightTheme } from 'react-native-paper';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#3C6FF0',
    secondary: '#FEC857',
    background: '#F7F9FC',
    surface: '#FFFFFF',
    text: '#1A1A1A',
    bottomBar: '#FFFFFF',     
  },
  fonts: {
    ...MD3LightTheme.fonts,
    bodyLarge: { ...MD3LightTheme.fonts.bodyLarge, fontFamily: 'PoppinsRegular' },
    titleLarge: { ...MD3LightTheme.fonts.titleLarge, fontFamily: 'PoppinsSemiBold' },
  },
};

export default theme;
