import { StatusBar } from 'expo-status-bar';
import { NativeModules, View, Button, StyleSheet } from 'react-native';

const { ContentViewMarina } = NativeModules;

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        title="Show SwiftUI View"
        // This calls the Swift function 'showSwiftUIView()' 
        // exposed through my native module in the object 'ContentViewMarina' using NativeModules.
        onPress={() => ContentViewMarina.showSwiftUIView()} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
