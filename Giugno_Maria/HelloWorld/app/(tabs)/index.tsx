import React from 'react';
import { Platform, StyleSheet, Text, View, Pressable } from 'react-native';
import NativeAppearance from '../../specs/NativeAppearance';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.code}>
        <Text style={styles.keyword}>const </Text>
        <Text style={styles.ident}>hello</Text>
        <Text> = </Text>
        <Text style={styles.string}>"World!"</Text>
        <Text>;</Text>
      </Text>

      <View style={styles.row}>
        <Pressable style={styles.btn} onPress={() => NativeAppearance.setStyle('light')}>
          <Text style={styles.btnText}>Light</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => NativeAppearance.setStyle('dark')}>
          <Text style={styles.btnText}>Dark</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => NativeAppearance.setStyle('unspecified')}>
          <Text style={styles.btnText}>System</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e1e' },
  code: {
    fontSize: 28,
    color: '#dcdcaa',
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
  },
  keyword: { color: '#dcdcaa' },
  ident: { color: '#569cd6' },
  string: { color: '#ce9178' },
  row: { flexDirection: 'row', gap: 12, marginTop: 16 },
  btn: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10, backgroundColor: '#333' },
  btnText: { color: '#dcdcaa', fontSize: 16 },
});
