import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addMood } from '../src/store/moodsSlice'; 
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

// --- LOCAL TYPE DEFINITION ---
export interface MoodEntry {
  id: string;
  date: string;
  mood: string;
  note: string; 
  location?: string;
}
// --- END LOCAL TYPE DEFINITION ---

// --- Mood Button Component ---
interface MoodButtonProps {
    mood: string; 
    icon: keyof typeof Ionicons.glyphMap; 
    isSelected: boolean;
    onPress: (mood: string) => void;
}

const MoodButton: React.FC<MoodButtonProps> = ({ mood, icon, isSelected, onPress }) => (
    <TouchableOpacity
        style={[styles.moodButton, isSelected && styles.moodButtonSelected]}
        onPress={() => onPress(mood)}
    >
        <Ionicons name={icon} size={32} color="white" /> 
        <Text style={styles.moodButtonText}>{mood}</Text>
    </TouchableOpacity>
);
// --- End Mood Button Component ---


const AddMoodScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [note, setNote] = useState(''); 
    const [locationStatus, setLocationStatus] = useState<'idle' | 'fetching' | 'success' | 'error'>('idle');
    const [currentLocation, setCurrentLocation] = useState<string>('');
    const [locationCoordinates, setLocationCoordinates] = useState<{ latitude: number, longitude: number } | null>(null);

    const moodOptions: { mood: string, icon: keyof typeof Ionicons.glyphMap }[] = [
        { mood: 'Great', icon: 'happy-sharp' },
        { mood: 'Good', icon: 'happy-outline' },
        { mood: 'Neutral', icon: 'ellipse-outline' },
        { mood: 'Bad', icon: 'sad-outline' },
        { mood: 'Awful', icon: 'sad-sharp' },
    ];

    useEffect(() => {
        handleGetLocation();
    }, []);

    const handleGetLocation = async () => {
        if (locationStatus === 'fetching') return;
        
        setLocationStatus('fetching');
        setCurrentLocation('Fetching Location...');
        
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocationStatus('error');
                setCurrentLocation('Permission Denied');
                Alert.alert("Permission Denied", "Location access is needed to log your current location.");
                return;
            }

            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            setLocationCoordinates({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            let geocode: Location.LocationGeocodedAddress[] = [];
            try {
                geocode = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            } catch (e) {
                console.error("Geocoding failed:", e);
            }
            

            if (geocode.length > 0) {
                const { city, region, country } = geocode[0];
                const locationString = `${city || region || 'Unknown City'}, ${country || 'Unknown Region'}`;
                setCurrentLocation(locationString);
                setLocationStatus('success');
            } else {
                setCurrentLocation(`Location Coordinates: ${location.coords.latitude.toFixed(2)}, ${location.coords.longitude.toFixed(2)}`);
                setLocationStatus('success');
            }

        } catch (error: any) {
            console.error("Error getting location:", error);
            let message = error.message || "Could not determine current location. Location services might be disabled.";
            setCurrentLocation('Failed to get location');
            setLocationStatus('error');
            Alert.alert("Location Error", message);
        }
    };
    
    const handleSave = () => {
        if (!selectedMood) {
            Alert.alert("Missing Mood", "Please select how you are feeling before saving.");
            return;
        }

        const newEntry: MoodEntry = { 
            id: Date.now().toString(),
            date: new Date().toISOString(), 
            mood: selectedMood,
            note: note.trim(), 
            location: locationStatus === 'success' ? currentLocation : 'Not Logged',
        };

        dispatch(addMood(newEntry)); 
        navigation.goBack();
    };

    const getLocationButtonStyle = () => {
        let computedBackgroundColor;
        
        if (locationStatus === 'fetching') {
            computedBackgroundColor = '#FFC107'; // Yellow for fetching
        } else if (locationStatus === 'success') {
            computedBackgroundColor = '#388E3C'; // Vibrant Green for success
        } else if (locationStatus === 'error') {
            computedBackgroundColor = '#DC3545'; // Red for error
        } else {
            // Default dark gray background if status is 'idle'
            computedBackgroundColor = '#333333'; 
        }
        
        // FIX: Spread the base styles first, then apply the dynamic background color.
        return { 
            ...styles.locationButton, 
            backgroundColor: computedBackgroundColor 
        };
    };

    const getLocationButtonText = () => {
        if (locationStatus === 'fetching') return <ActivityIndicator color="white" />;
        if (locationStatus === 'success') return currentLocation; 
        if (locationStatus === 'error') return 'Location Failed (Tap to retry)';
        return 'Log Current Location';
    };

    return (
        // 💡 FIX 1: Use a regular View as the main container
        <View style={styles.outerContainer}> 
            
            {/* 💡 FIX 2: Wrap the custom header in a SafeAreaView specifically for the top edge */}
            <SafeAreaView style={styles.headerSafeArea} edges={['top']}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                        <Ionicons name="close" size={28} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Log Your Mood</Text>
                    <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
                        <Text style={styles.headerSaveText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {/* Content ScrollView */}
            <ScrollView style={styles.contentScroll} contentContainerStyle={styles.contentContainer}>
                
                <Text style={styles.sectionTitle}>How are you feeling right now?</Text>
                <View style={styles.moodOptionsContainer}>
                    {moodOptions.map((option) => (
                        <MoodButton
                            key={option.mood}
                            mood={option.mood}
                            icon={option.icon}
                            isSelected={selectedMood === option.mood}
                            onPress={setSelectedMood}
                        />
                    ))}
                </View>

                {/* Location Section */}
                <Text style={styles.sectionTitle}>Current Location</Text>
                <TouchableOpacity
                    style={getLocationButtonStyle()}
                    onPress={handleGetLocation}
                    disabled={locationStatus === 'fetching'}
                >
                    <Ionicons name="location-sharp" size={18} color="white" style={styles.iconMarginRight} />
                    <Text style={styles.locationButtonText}>
                        {getLocationButtonText()}
                    </Text>
                </TouchableOpacity>

                {/* Notes Section */}
                <Text style={styles.sectionTitle}>Notes (Optional)</Text>
                <TextInput
                    style={styles.notesInput}
                    placeholder="What contributed to this mood? How was your day?"
                    placeholderTextColor="#A0A0A0" 
                    multiline
                    value={note}
                    onChangeText={setNote}
                    maxLength={500}
                />
                <Text style={styles.footerText}>
                    Logging your moods helps identify patterns over time.
                </Text>

            </ScrollView>
            
            {/* 💡 FIX 3: Add a SafeAreaView for the bottom edge padding (if needed) */}
            <SafeAreaView style={styles.bottomSafeArea} edges={['bottom']} />
        </View>
    );
};

// --- STYLESHEET ---

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#000000', // Deep black
    },
    headerSafeArea: {
        backgroundColor: '#000000', // Match header background
    },
    bottomSafeArea: {
        backgroundColor: '#1A1A1A', // Match content scroll background
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16, 
        paddingVertical: 10,
        backgroundColor: '#000000', 
        borderBottomWidth: 1,
        borderBottomColor: '#1E1E1E', 
    },
    headerButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    headerSaveText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50', 
    },
    contentScroll: {
        flex: 1,
        backgroundColor: '#1A1A1A', 
    },
    contentContainer: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        marginTop: 24,
        marginBottom: 8,
    },
    moodOptionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    moodButton: {
        width: '31%', 
        padding: 12,
        marginVertical: 4,
        marginHorizontal: 2,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#333333', 
    },
    moodButtonSelected: {
        backgroundColor: '#388E3C', 
    },
    moodButtonText: {
        color: '#FFFFFF',
        marginTop: 4,
        fontSize: 14,
        fontWeight: '500',
    },
    locationButton: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 30, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 8,
    },
    iconMarginRight: {
        marginRight: 8, 
    },
    notesInput: {
        height: 120,
        padding: 16,
        backgroundColor: '#1E1E1E', 
        color: '#FFFFFF',
        borderRadius: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#444444', 
        textAlignVertical: 'top', 
    },
    footerText: {
        fontSize: 12,
        color: '#888888',
        marginTop: 10,
        textAlign: 'center',
    }
});


export default AddMoodScreen;