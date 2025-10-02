import * as React from 'react';
import {SafeAreaView, Text, Button, StyleSheet} from 'react-native';
import NativeLocalStorage from './src/specs/NativeLocalStorage';

export default function App() {
  const [val, setVal] = React.useState<string | null>(null);

  React.useEffect(() => {
    NativeLocalStorage.setItem('Hello from Turbo!', 'greeting');
    setVal(NativeLocalStorage.getItem('greeting'));
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>{val ?? 'no value yet'}</Text>
      <Button
        title="Clear"
        onPress={() => {
          NativeLocalStorage.removeItem('greeting');
          setVal(NativeLocalStorage.getItem('greeting'));
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  title: {fontSize: 18, marginBottom: 12},
});

