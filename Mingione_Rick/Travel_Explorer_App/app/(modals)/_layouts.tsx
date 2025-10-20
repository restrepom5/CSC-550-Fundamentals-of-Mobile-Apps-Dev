import { Stack } from 'expo-router';

export default function DetailsLayout() {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ title: 'Destination Details' }} />
      <Stack.Screen name="pushed" options={{ title: 'Extra Info' }} />
      <Stack.Screen
        name="modal"
        options={{ presentation: 'modal', title: 'Travel Info' }}
      />
    </Stack>
  );
}