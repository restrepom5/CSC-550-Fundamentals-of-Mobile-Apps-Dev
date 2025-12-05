import { Redirect } from 'expo-router';
import { useApp } from '@/src/context/provider';

export default function Index() {
  const { isLoggedIn } = useApp();

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/(tabs)" />;
}
