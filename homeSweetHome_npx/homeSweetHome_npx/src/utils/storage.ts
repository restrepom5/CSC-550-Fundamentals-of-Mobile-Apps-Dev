import AsyncStorage from '@react-native-async-storage/async-storage'; // react-native-async-storage library

export async function saveJSON(key: string, value: any) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function loadJSON(key: string) {
  const raw = await AsyncStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}
