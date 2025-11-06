import { Image } from 'expo-image';
import { StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React, { useState } from 'react';

export default function HomeScreen() {
    const [text, setText] = useState('');
    return (

    <SafeAreaView style={styles.viewContainer}>
        <ThemedView>
        <ThemedText type="title">Your Profile</ThemedText>
        </ThemedView>
        <ThemedView style={styles.profileImage}>
            <Image
                source = {require('@/assets/images/profile.png')}
                style={styles.image}
            ></Image>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>

        <ThemedText>
            {`Bio: `}
        </ThemedText>
        <TextInput
            multiline={true}         
            numberOfLines={4}        
            placeholder="Edit bio here..."
            value={text}
            onChangeText={setText} 
            style={styles.textInput}
        />
        </ThemedView>
    </SafeAreaView>    
  );
}

const styles = StyleSheet.create({
  viewContainer:{
    flex:1,
    padding:20,
    alignItems:'center',
    backgroundColor: '#ffffffff'
  },
  profileImage:{
    alignItems:'center'
  },
  image: {
    width: 150,   
    height: 150,  
    borderRadius: 75,
    overflow:'hidden', 
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  textInput: {
    alignSelf: 'flex-start',
  },
});