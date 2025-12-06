// app/_layout.tsx
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../state/store";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator />
          </View>
        }
        persistor={persistor}
      >
        <Stack
          initialRouteName="index"             // 👈 force app to start at / (index)
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="index" />        // 👈 our splash-with-useEffect
          <Stack.Screen name="tabs" />
          <Stack.Screen name="details" />
          {/* any other stacks you added */}
        </Stack>
      </PersistGate>
    </Provider>
  );
}
