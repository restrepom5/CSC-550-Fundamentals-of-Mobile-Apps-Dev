import { Button, FlatList, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function MoodScreen() {
  let moodHistory = useSelector((state: RootState) => state.mood.history)
  const router = useRouter();

  const moodImages: { [key: string]: any } = {
    angry: require('@/assets/images/Angry_Mood.png'),
    happy: require('@/assets/images/Happy_Mood.png'),
    soSo: require('@/assets/images/Meh_Mood.png'),
  };

    return (

    <SafeAreaView style = {styles.viewContainer}>
        <ThemedView>
            <ThemedText type="title">Mood</ThemedText>
        </ThemedView>
        <ThemedView>
          <FlatList
            data={moodHistory}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ThemedView style={styles.card}>
                <Image source={moodImages[item.mood]} style={styles.image} />
                <ThemedText>{item.date}</ThemedText>
              </ThemedView>
            )}
          />
          {//moodContent
          }
            

            <Button 
                title="Set Mood"
                onPress={() => router.push('/moodPicker')}
                color="#404040ff"
            ></Button>
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
    gap: 45,
  },
  card: {
    width: 200,
    height: 250,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});