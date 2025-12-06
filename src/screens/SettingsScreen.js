// src/screens/SettingsScreen.js
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { List, Switch, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeMode } from '../context/ThemeContext';

export default function SettingsScreen() {
  const { isDark, toggleTheme } = useThemeMode();
  const theme = useTheme();
  const [showWaits, setShowWaits] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        
        <Text style={[styles.title, { color: theme.colors.text }]}>Settings</Text>

        <List.Section>
          <List.Item
            title="Show Wait Time Hints on Parks Tab"
            titleStyle={{ color: theme.colors.text }}
            right={() => (
              <Switch value={showWaits} onValueChange={setShowWaits} />
            )}
            style={{ backgroundColor: theme.colors.surface }}
          />

          <List.Item
            title="Enable Dark Mode"
            titleStyle={{ color: theme.colors.text }}
            right={() => (
              <Switch value={isDark} onValueChange={toggleTheme} />
            )}
            style={{ backgroundColor: theme.colors.surface }}
          />
        </List.Section>

        <Text style={[styles.attribution, { color: theme.colors.text }]}>
          Data from Queue-Times.com and ThrillData.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 28,
    marginBottom: 12,
  },
  attribution: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 24,
    lineHeight: 16,
  },
});
