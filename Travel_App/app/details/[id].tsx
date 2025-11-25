import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams, router } from 'expo-router';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';

// Assuming you have your data source imported here:
import { healthProblems } from '../../src/data/diseases';

export default function DetailsScreen() {
    const navigation = useNavigation();
    const { id, backTitle } = useLocalSearchParams();
    const problemId = parseInt(id as string);
    
    const problem = healthProblems.find(p => p.id === problemId);

    // --- 1. Set Custom Header Options ---
    useLayoutEffect(() => {
        navigation.setOptions({
            // Ensure the title is set
            headerTitle: problem?.disease || 'Remedy Details', 

            // Explicitly set visibility and background color
            headerShown: true, // Should be true if you see the header bar
            headerStyle: {
                backgroundColor: '#1c1c1e', // Dark background to contrast button
            },
            
            // Hide the default system back button
            headerBackVisible: false, 
            
            // Set the custom header button component
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {
                        // FIX: Prioritize goBack() for animation, but ensure it works.
                        // We use goBack() which should pop the screen off the stack.
                        // If that fails (which it shouldn't here), the router will try to navigate.
                        router.back();
                    }}
                    style={styles.backButton}
                    // Add hitSlop to increase the tappable area for better touch responsiveness
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    {/* The icon and text which compose the back button */}
                    <FontAwesome5 name="chevron-left" size={24} color="#4CAF50" />
                    <Text style={styles.backButtonText}>{backTitle || 'Back'}</Text>
                </TouchableOpacity>
            ),
            // Important: We need to ensure the header is accessible if it was previously hidden
        });
    }, [navigation, problem?.disease, backTitle]);

    if (!problem) {
        return (
            <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundText}>Error: Problem not found.</Text>
            </View>
        );
    }

    // ... (rest of the component JSX)
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentPadding}>
                <Text style={styles.title}>{problem.disease}</Text>
                
                <Text style={styles.remedyHeader}>Recommended Remedy</Text>
                <Text style={styles.remedyText}>{problem.remedy}</Text>
                
                <Text style={styles.descriptionHeader}>Symptoms</Text>
                <Text style={styles.descriptionText}>{problem.symptoms}</Text>

                <Text style={styles.descriptionHeader}>Prevention</Text>
                <Text style={styles.descriptionText}>{problem.explanation}</Text>

            </ScrollView>
        </SafeAreaView>
    );
}

// NOTE: You must include all the styles used in this file
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1c1e', // Dark background
    },
    contentPadding: {
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 80, // Extra padding for safe area
    },
    title: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    remedyHeader: {
        color: '#4CAF50', // Health green accent
        fontSize: 18,
        fontWeight: '700',
        marginTop: 20,
        marginBottom: 4,
    },
    remedyText: {
        color: '#90EE90', // Lighter green for remedy
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
    },
    descriptionHeader: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
        marginTop: 15,
        marginBottom: 5,
    },
    descriptionText: {
        color: '#aaa',
        fontSize: 16,
        lineHeight: 24,
    },
    notFoundContainer: {
        flex: 1,
        backgroundColor: '#1c1c1e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    notFoundText: {
        color: 'white',
        fontSize: 20,
    },
    // Styles for the custom back button
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        // Increased padding to ensure it's clickable
        paddingVertical: 10, 
        paddingRight: 15,
    },
    backButtonText: {
        color: '#4CAF50',
        fontSize: 17,
        marginLeft: 4,
    }
});