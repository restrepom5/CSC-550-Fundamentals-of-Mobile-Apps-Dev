import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, ScrollView } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import FAQ from '../assets/data/FAQ.json'

const faq: { [key: string]: string } = FAQ;

export default function ModalScreen() {
  return (
    <>
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Help</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <View style={styles.subcontainer}>
          {Object.entries(faq).map(([question, answer], index) => (
                  <View key={index} style={styles.item}>
                    <Text style={styles.qtext}>{question}</Text>
                    <Text style={styles.atext}>{answer}</Text>
                  </View>
                ))}
          </View>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    paddingTop: 20,
    paddingBottome: 50
  },
    subcontainer: {
        alignItems: 'left',
        justifyContent: 'top',
        paddingLeft: 0,
        paddingTop: 20
    },
  qtext: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  atext: {
    fontSize: 12,
    paddingLeft: 30,
    marginVertical: 10
  },
    title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
