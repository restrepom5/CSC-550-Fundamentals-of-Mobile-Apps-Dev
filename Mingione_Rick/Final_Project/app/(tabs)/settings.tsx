// app/(tabs)/settings.tsx
import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useSearchStore } from '@/stores/searchStore';

export default function SettingsScreen() {
  const {
    originalPrintingOnly,
    uniqueCardsOnly,
    setOriginalPrinting,
    setUniqueCards,
  } = useSearchStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Settings</Text>

      {/* Toggle 1 */}
      <View style={styles.row}>
        <View style={styles.text}>
          <Text style={styles.label}>Original printing only</Text>
          <Text style={styles.desc}>Show only the very first printing of each card</Text>
        </View>
        <Switch
          value={originalPrintingOnly}
          onValueChange={setOriginalPrinting}
          trackColor={{ false: '#333', true: '#9333ea' }}
          thumbColor={originalPrintingOnly ? '#fff' : '#aaa'}
        />
      </View>

      {/* Toggle 2 – NEW */}
      <View style={styles.row}>
        <View style={styles.text}>
          <Text style={styles.label}>One result per card</Text>
          <Text style={styles.desc}>
            Hide reprints and alternate arts{'\n'}
            (shows only one version per unique card name)
          </Text>
        </View>
        <Switch
          value={uniqueCardsOnly}
          onValueChange={setUniqueCards}
          trackColor={{ false: '#333', true: '#9333ea' }}
          thumbColor={uniqueCardsOnly ? '#fff' : '#aaa'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { fontSize: 20, fontWeight: '600', color: '#fff', marginTop: 20, marginBottom: 30 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#111', padding: 16, borderRadius: 12, marginBottom: 16 },
  text: { flex: 1, marginRight: 16 },
  label: { color: '#fff', fontSize: 17, fontWeight: '600' },
  desc: { color: '#999', fontSize: 13, marginTop: 4, lineHeight: 18 },
});