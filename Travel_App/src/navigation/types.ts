// Define the types for your route parameters.
// This tells TypeScript which screens exist and what params they accept.

// 1. Define the types for the main stack (assuming a simple stack for now)
export type RootStackParamList = {
    // These are the screens in your primary navigator
    MoodTracker: undefined; // Screen accepts no parameters
    AddMood: undefined;     // Screen accepts no parameters
    // Add other screens here as needed: e.g., DetailScreen: { id: string };
};

// 2. Define the type for the navigation prop used within components
import { NavigationProp } from '@react-navigation/native';

export type MoodTrackerNavigationProp = NavigationProp<RootStackParamList, 'MoodTracker'>;
export type AddMoodNavigationProp = NavigationProp<RootStackParamList, 'AddMood'>;