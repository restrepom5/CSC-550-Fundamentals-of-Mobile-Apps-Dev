import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e', // dark charcoal
  },
  code: {
    fontSize: 28,
    color: '#dcdcaa',
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
  },
  keyword: { color: '#dcdcaa' },
  ident: { color: '#569cd6' },
  string: { color: '#ce9178' },
});
