import { Button, Pressable, StyleSheet, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { changeMood, setMood } from './moodSlice';

export default function HomeScreen() {
    const router = useRouter()
    const [text, setText] = useState('');

    let dispatch = useDispatch()
    let moodName = useSelector((state: RootState) => state.mood.value)

    const saveMood = () => {
      dispatch(setMood(moodName))

      router.back()
    }

    return (

    <SafeAreaView style = {styles.viewContainer}>
        <ThemedView>
            <ThemedText type="title">Todays Mood</ThemedText>
        </ThemedView>
        <ThemedView>
            <ThemedView style={styles.moodRow}>
                <Pressable onPress={() => dispatch(changeMood("angry"))}
                    style={[moodName === "angry" && styles.selectedMood]}>
                <Image
                    source = {require('@/assets/images/Angry_Mood.png')}
                    style = {styles.image}
                ></Image>
                <Text style={styles.moodText}>Angry</Text>
                </Pressable>
                <Pressable onPress={() => dispatch(changeMood("soSo"))}
                    style={[moodName === "soSo" && styles.selectedMood]}>
                <Image
                    source = {require('@/assets/images/Meh_Mood.png')}
                    style = {styles.image}
                ></Image>
                <Text style={styles.moodText}>So-So</Text>
                </Pressable>
                <Pressable onPress={() => dispatch(changeMood("happy"))}
                    style={[moodName === "happy" && styles.selectedMood]}>
                <Image
                    source = {require('@/assets/images/Happy_Mood.png')}
                    style = {styles.image}
                ></Image>
                <Text style={styles.moodText}>Happy</Text>
                </Pressable>
            </ThemedView>

            <ThemedText style={{marginTop: 50}}>
                {`Note for today: `}
            </ThemedText>
            <TextInput
                multiline={true}         
                numberOfLines={4}        
                placeholder="Edit note here..."
                value={text}
                onChangeText={setText} 
                style={styles.textInput}
            />

            <ThemedView style={{marginTop: 150}}>
                <Button
                    title="Save Mood"
                    onPress={saveMood}
                ></Button>
            </ThemedView>
        </ThemedView>
    </SafeAreaView>    
  );
}

const styles = StyleSheet.create({
  viewContainer:{
    flex:1,
    padding:20,
    alignItems:'center',
    backgroundColor: '#ffffffff',
    gap: 100,
  },
  image: {
    width: 100,   
    height: 100,  
  },
  textInput: {
    alignSelf: 'flex-start',
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap:20,
  },
  moodText: {
    marginLeft: 30,
  },
  selectedMood:{
    borderWidth: 3,
    borderColor: '#007bffff',
  },
});