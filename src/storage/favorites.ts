import AsyncStorage from "@react-native-async-storage/async-storage"; // This page is built to describe a form of 
// storage(memory) While the app is running. 

const KEY = "FAVORITES";

export const saveFavorite = async (city: string) => {
  const existing = await getFavorites();
  const updated = [...new Set([...existing, city])];
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
};

export const removeFavorite = async (city: string) => {
  const existing: string[] = await getFavorites();
  const updated = existing.filter(c => c !== city);
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
};


export const getFavorites = async () => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};
