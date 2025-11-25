import React, { useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addMood, Mood } from '../src/store/moodsSlice'; 

// FIX: Define the MoodButton props interface to fix 'any' type errors
interface MoodButtonProps {
    mood: string;
    icon: string;
    isSelected: boolean;
    onPress: (mood: string) => void;
}

// FIX: Apply the interface to the component definition
const MoodButton: React.FC<MoodButtonProps> = ({ mood, icon, isSelected, onPress }) => (
    <TouchableOpacity 
        style={[styles.moodButton, isSelected && styles.moodButtonSelected]}
        onPress={() => onPress(mood)}
    >
        {/* Type assertion (as any) is sometimes needed for FontAwesome5 names */}
        <FontAwesome5 name={icon as any} size={24} color={isSelected ? '#1c1c1e' : '#90EE90'} />
        <Text style={[styles.moodText, isSelected && styles.moodTextSelected]}>{mood}</Text>
    </TouchableOpacity>
);

export default function AddMoodScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [selectedMood, setSelectedMood] = useState('');
    const [notes, setNotes] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // --- Header Configuration ---
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Log Your Mood',
            headerShown: true,
            headerStyle: styles.header,
            headerTintColor: '#4CAF50',
            headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()} style={{padding: 10}}>
                    <FontAwesome5 name="times" size={20} color="#90EE90" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity 
                    onPress={handleSaveMood} 
                    style={{padding: 10}}
                    disabled={!selectedMood || isSaving}
                >
                    <Text style={[styles.saveButtonText, (!selectedMood || isSaving) && {opacity: 0.5}]}>Save</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation, selectedMood, notes, isSaving]);


    const handleSaveMood = () => {
        if (!selectedMood) return;

        setIsSaving(true);
        
        const today = new Date().toLocaleDateString('en-US', {
             month: 'short', day: 'numeric', year: 'numeric'
        }).replace(/,/g, ''); 

        // Use the Mood interface imported from the slice file
        const newMood: Mood = {
            id: Date.now().toString(), 
            date: today,
            mood: selectedMood,
            note: notes.trim(), 
        };

        dispatch(addMood(newMood)); 
        
        router.back();
    };

    const moodOptions = [
        { mood: 'Great', icon: 'smile' },
        { mood: 'Good', icon: 'meh' },
        { mood: 'Neutral', icon: 'frown' },
        { mood: 'Bad', icon: 'sad-tear' },
        { mood: 'Awful', icon: 'dizzy' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.sectionTitle}>How are you feeling right now?</Text>
                
                <View style={styles.moodGrid}>
                    {moodOptions.map((item) => (
                        <MoodButton
                            key={item.mood}
                            mood={item.mood}
                            icon={item.icon}
                            isSelected={selectedMood === item.mood}
                            onPress={setSelectedMood}
                        />
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Notes (Optional)</Text>
                <TextInput
                    style={styles.notesInput}
                    placeholder="What contributed to this mood? How was your day?"
                    placeholderTextColor="#777"
                    multiline
                    numberOfLines={4}
                    value={notes}
                    onChangeText={setNotes}
                />

                <Text style={styles.hintText}>
                    Logging your moods helps identify patterns over time.
                </Text>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1c1c1e',
    },
    header: {
        backgroundColor: '#1c1c1e',
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
    },
    contentContainer: {
        padding: 20,
        paddingTop: Platform.OS === 'android' ? 20 : 0,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginTop: 20,
        marginBottom: 10,
    },
    moodGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    moodButton: {
        width: '30%', 
        aspectRatio: 1,
        backgroundColor: '#2c2c2e',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        borderWidth: 2,
        borderColor: '#2c2c2e',
    },
    moodButtonSelected: {
        backgroundColor: '#4CAF50',
        borderColor: '#90EE90',
    },
    moodText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginTop: 8,
    },
    moodTextSelected: {
        color: '#1c1c1e',
    },
    notesInput: {
        backgroundColor: '#2c2c2e',
        color: '#fff',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        minHeight: 120,
        textAlignVertical: 'top',
        lineHeight: 22,
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#4CAF50',
    },
    hintText: {
        color: '#888',
        fontSize: 13,
        marginTop: 15,
        textAlign: 'center',
    }
});