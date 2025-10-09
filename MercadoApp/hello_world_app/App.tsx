/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Text, TextInput, Button} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import NativeLocalStorage from './specs/NativeLocalStorage'

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [value, setValue] = React.useState<string | null>(null);

  const [editingValue, setEditingValue] = React.useState<
    string | null
  >(null);
  
  React.useEffect(() => {
    const storedValue = NativeLocalStorage?.getItem('myKey');
    setValue(storedValue ?? '');
  }, []);

  function saveValue() {
    NativeLocalStorage?.setItem(editingValue ?? "", 'myKey');
    setValue(editingValue);
  }

  function clearAll() {
    NativeLocalStorage?.clear();
    setValue('');
  }

  function deleteValue() {
    NativeLocalStorage?.removeItem('myKey');
    setValue('');
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}> 
      <Text style={{fontSize: 50}}>Hello World!</Text>
      <Button title="Save" onPress={saveValue} />
      <Button title="Delete" onPress={deleteValue} />
      <Button title="Clear" onPress={clearAll} />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
