import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="myTrips/index" options={{ title: "My Trips", headerShown: false  }} />
      <Tabs.Screen name="book" options={{ title: "Book" }} />
    </Tabs>
  );
}
