import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: "#111", borderTopColor: "#222" },
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "#777",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                        tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                        ),
                    }}
            />
            <Tabs.Screen
                name="camera"
                options={{
                    title: "Camera",
                        tabBarIcon: ({ color, size }) => (
                        <Ionicons name="camera" color={color} size={size} />
                        ),
                    }}
            />
            <Tabs.Screen
                name="wheel"
                options={{
                    title: "Wheel",
                        tabBarIcon: ({ color, size }) => (
                        <Ionicons name="color-palette" color={color} size={size} />
                        ),
                    }}
            />
        </Tabs>
        )
    }