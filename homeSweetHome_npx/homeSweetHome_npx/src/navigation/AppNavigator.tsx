import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import SpeciesScreen from '../screens/SpeciesScreen';
import BreedScreen from '../screens/BreedScreen';
import PetDetailScreen from '../screens/PetDetailScreen';
import AdoptFormScreen from '../screens/AdoptFormScreen';
import TabsScreen from '../screens/TabsScreen';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Species" component={SpeciesScreen} />
        <Stack.Screen name="Breed" component={BreedScreen} />
        <Stack.Screen name="PetDetail" component={PetDetailScreen} />
        <Stack.Screen name="AdoptForm" component={AdoptFormScreen} />
        <Stack.Screen name="Tabs" component={TabsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



