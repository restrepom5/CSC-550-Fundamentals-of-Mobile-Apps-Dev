// app/(tabs)/index.tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Appearance,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import NativeAppearance from '../../specs/NativeAppearance';

type Mode = 'light' | 'dark' | 'unspecified';

export default function HomeScreen() {
  // initial mode from native; fall back safely
  const [mode, setMode] = React.useState<Mode>(() => {
    try { return NativeAppearance.getCurrentStyle() as Mode; } catch { return 'unspecified'; }
  });
  const [isSim, setIsSim] = React.useState(false);

  React.useEffect(() => {
    try { setIsSim(Boolean(NativeAppearance.isSimulator())); } catch {}
    // keep label in sync with system when "System" is selected
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      if (mode === 'unspecified') setMode((colorScheme as Mode) ?? 'unspecified');
    });
    return () => sub.remove();
  }, [mode]);

  const setNative = (next: Mode) => {
    NativeAppearance.setStyle(next);
    if (next === 'unspecified') {
      const sys = Appearance.getColorScheme() as Mode | null;
      setMode(sys ?? 'unspecified');
    } else {
      setMode(next);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.page}>
        {/* Header */}
        <ThemedText type="title" style={{ fontSize: 28, marginBottom: 4 }}>
          Native Module Integration - App theme toggle
        </ThemedText>
        <ThemedText style={{ opacity: 0.8, marginBottom: 18 }}>
          Toggle iOS Light/Dark via a Turbo Native Module.
        </ThemedText>

        {/* Status row */}
        <View style={styles.row}>
          <Chip icon="phone-portrait" label={`Current: ${pretty(mode)}`} />
          <Chip icon="information-circle-outline" label={`Simulator: ${isSim ? 'Yes' : 'No'}`} />
          {Platform.OS !== 'ios' && (
            <Chip icon="alert-circle" label="iOS-only toggle" />
          )}
        </View>

        {/* Big buttons */}
        <View style={styles.buttons}>
          <BigButton
            active={mode === 'light'}
            icon="sunny"
            title="Light"
            onPress={() => setNative('light')}
          />
          <BigButton
            active={mode === 'dark'}
            icon="moon"
            title="Dark"
            onPress={() => setNative('dark')}
          />
          <BigButton
            active={mode === 'unspecified'}
            icon="contrast-outline"
            title="System"
            onPress={() => setNative('unspecified')}
          />
        </View>

        {/* Live preview card */}
        <ThemedView style={styles.card}>
          <ThemedText type="subtitle" style={{ marginBottom: 8 }}>
            Live Preview
          </ThemedText>
          <ThemedText>
            This block reflects the app window appearance set by the native module. Tap the buttons
            above to switch modes.
          </ThemedText>
          <View style={styles.previewBar}>
            <ThemedText type="defaultSemiBold">Mode:</ThemedText>
            <ThemedText> {pretty(mode)}</ThemedText>
          </View>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

/* -------- small UI pieces -------- */

function pretty(m: Mode) {
  return m === 'unspecified' ? 'System' : m[0].toUpperCase() + m.slice(1);
}

function Chip({
  icon,
  label,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
}) {
  return (
    <View style={styles.chip}>
      <Ionicons name={icon} size={14} style={{ marginRight: 6 }} />
      <ThemedText style={{ fontSize: 12 }}>{label}</ThemedText>
    </View>
  );
}

function BigButton({
  active,
  icon,
  title,
  onPress,
}: {
  active: boolean;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.bigBtn,
        active && styles.bigBtnActive,
        pressed && { transform: [{ scale: 0.98 }] },
      ]}
      android_ripple={{ color: '#00000010' }}
    >
      <Ionicons
        name={icon}
        size={18}
        style={{ marginRight: 8, opacity: active ? 1 : 0.7 }}
      />
      <ThemedText
        style={[styles.bigBtnLabel, active && { fontWeight: '700', opacity: 1 }]}
      >
        {title}
      </ThemedText>
    </Pressable>
  );
}

/* -------- styles -------- */

const styles = StyleSheet.create({
  page: {
    padding: 18,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#00000010',
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
    marginBottom: 6,
  },
  bigBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#00000020',
  },
  bigBtnActive: {
    backgroundColor: '#00000012',
  },
  bigBtnLabel: {
    fontSize: 15,
    opacity: 0.85,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#00000020',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
    gap: 6,
    marginTop: 4,
  },
  previewBar: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
