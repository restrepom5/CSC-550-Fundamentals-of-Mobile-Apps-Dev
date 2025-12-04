import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
	const router = useRouter();

	function onPlay() {
		// Replace the splash with the tabs stack so back won't return here
		router.replace('/(tabs)');
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>My Clicker Game</Text>

			<Pressable onPress={onPlay} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
				<Text style={styles.buttonText}>Play</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 24,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 36,
		fontWeight: '700',
		marginBottom: 32,
	},
	button: {
		backgroundColor: '#1f6feb',
		paddingVertical: 14,
		paddingHorizontal: 28,
		borderRadius: 8,
	},
	buttonPressed: {
		opacity: 0.85,
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
	},
});
