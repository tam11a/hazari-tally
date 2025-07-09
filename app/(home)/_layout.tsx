import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabsLayout() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1">
      <Tabs
        initialRouteName="main"
        screenOptions={{
          tabBarActiveTintColor: "#401988",
          tabBarInactiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: "#181232",
            borderTopWidth: 0,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          tabBarLabelStyle: {
            fontWeight: "bold",
          },
          headerStyle: {
            backgroundColor: "#181232",
          },
          headerTintColor: "#ffffff",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#ffffff",
          },

          headerTitleAlign: "center", // Center the title
          headerLeft: () => (
            <Pressable
              onPress={() => router.push("/")}
              style={{
                marginLeft: 10,
                marginRight: 10,
                padding: 5,
                borderRadius: 20,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </Pressable>
          ),
        }}
      >
        <Tabs.Screen
          name="main"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
            headerTitleAlign: "center",
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create Game",
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle" size={size} color={color} />
            ),
            headerTitleAlign: "center",
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
            headerTitleAlign: "center",
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
