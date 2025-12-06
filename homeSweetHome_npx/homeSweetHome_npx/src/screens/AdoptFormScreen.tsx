import React, { useState } from 'react';
import { View, ScrollView, TextInput, StyleSheet } from 'react-native';
import { Button, Text, Checkbox } from 'react-native-paper'; // React Native Paper
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, AdoptionForm } from '../types';
import * as ImagePicker from 'expo-image-picker'; // Expo image picker
import { submitAdoption } from '../api/shelters';

type Props = NativeStackScreenProps<RootStackParamList, 'AdoptForm'>;

export default function AdoptFormScreen({ route, navigation }: Props) {
  const { pet } = route.params;
  const [form, setForm] = useState<AdoptionForm>({
    petId: pet.id,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    job: '',
    haveKids: false,
    why: '',
    photoUri: undefined,
  });

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) setForm({ ...form, photoUri: result.assets[0].uri });
  };

  const handleSubmit = async () => {
    await submitAdoption(form);
    navigation.navigate('Tabs');
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput placeholder="First Name" value={form.firstName} onChangeText={(t) => setForm({ ...form, firstName: t })} style={styles.input} />
      <TextInput placeholder="Last Name" value={form.lastName} onChangeText={(t) => setForm({ ...form, lastName: t })} style={styles.input} />
      <TextInput placeholder="Email" value={form.email} onChangeText={(t) => setForm({ ...form, email: t })} style={styles.input} />
      <TextInput placeholder="Phone" value={form.phone} onChangeText={(t) => setForm({ ...form, phone: t })} style={styles.input} />
      <TextInput placeholder="Address" value={form.address} onChangeText={(t) => setForm({ ...form, address: t })} style={styles.input} />
      <TextInput placeholder="Job" value={form.job} onChangeText={(t) => setForm({ ...form, job: t })} style={styles.input} />
      <View style={styles.checkboxRow}>
        <Checkbox.Android status={form.haveKids ? 'checked' : 'unchecked'} onPress={() => setForm({ ...form, haveKids: !form.haveKids })} />
        <Text>Have kids?</Text>
      </View>
      <TextInput placeholder={`Why do you want to adopt ${pet.name}?`} value={form.why} onChangeText={(t) => setForm({ ...form, why: t })} style={styles.input} multiline />
      <Button mode="outlined" onPress={handlePickImage}>Pick/Take Photo</Button>
      <Button mode="contained" onPress={handleSubmit} style={{ marginTop: 12 }}>Submit</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 12 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
});
