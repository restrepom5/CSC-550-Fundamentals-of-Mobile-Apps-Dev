import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
  query: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function SearchBar({ query, onChangeText, placeholder }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={onChangeText}
        placeholder={placeholder || 'Search...'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 6 },
  input: {
    backgroundColor: '#b0b1b0ff',
    padding: 10,
    borderRadius: 8,
  },
});
