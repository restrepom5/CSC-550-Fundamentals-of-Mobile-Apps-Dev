import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';

import { LogBox } from 'react-native';
import { ThemeProvider, useThemeMode } from './src/context/ThemeContext';
import RootNavigator from './src/navigation/RootNavigator';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);


function AppContent() {
  const { theme, isDark } = useThemeMode();

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style={isDark ? "light" : "dark"} />
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
