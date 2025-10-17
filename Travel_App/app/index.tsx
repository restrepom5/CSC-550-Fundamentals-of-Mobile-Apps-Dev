// app/index.tsx

import { Redirect } from 'expo-router';

export default function RootIndex() {
  // Redirects the user from the root path (/) to the /Home route
  return <Redirect href="/Home" />;
}