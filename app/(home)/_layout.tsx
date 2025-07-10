import TabBarButton from "@/components/CustomTabBar/tabBarButton";
import TabBarLabel from "@/components/CustomTabBar/tabBarLabel";
import Dotted from "@/components/Dotted";
import { Colors } from "@/constants/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function TabsLayout() {
  // get safe area insets for bottom tab bar
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#2F073C", "#090030"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, position: "relative" }}
    >
      <Dotted />
      <View className="flex-1">
        <Tabs
          screenOptions={{
            animation: "shift",
            // Use a custom header style
            headerStyle: {
              backgroundColor: "transparent",
              elevation: 0, // Remove shadow on Android
              shadowOpacity: 0, // Remove shadow on iOS
              borderBottomWidth: 0, // Remove bottom border
            },
            headerTitle(props) {
              return (
                <Text
                  {...props}
                  style={{}}
                  className="text-white font-outfit-bold text-2xl"
                >
                  {props.children}
                </Text>
              );
            },
            headerBackButtonDisplayMode: "default",
            headerLeft: () => (
              <Pressable
                onPress={() => router.back()}
                style={{
                  marginLeft: 20,
                  padding: 5,
                  borderRadius: 20,
                  backgroundColor: "#fff2",
                }}
              >
                <Ionicons name="arrow-back" size={24} color="#ffffff" />
              </Pressable>
            ),
            headerTitleAlign: "center", // Center the title
            // Use a custom tab bar style
            tabBarActiveTintColor: Colors.dark.tabIconSelected,
            tabBarInactiveTintColor: Colors.dark.tabIconDefault,
            tabBarStyle: {
              width: "100%",
              backgroundColor: Colors.dark.background,
              borderTopWidth: 0,
              alignSelf: "center",
              paddingBottom: insets.bottom + 10,
              paddingTop: 10,
              paddingLeft: 10,
              paddingRight: 10,
              height: insets.bottom + 70,
            },
            tabBarHideOnKeyboard: true,
            tabBarLabel: TabBarLabel,
            tabBarButton: TabBarButton,

            // Background color for the scene transparent
            sceneStyle: {
              backgroundColor: "transparent",
            },
          }}
        >
          <Tabs.Screen
            name="main"
            options={{
              title: "Home",
              headerShown: false,
              tabBarIcon: ({ color, focused, size }) => (
                <MaterialCommunityIcons
                  name={focused ? "home-variant" : "home-variant-outline"}
                  size={size}
                  color={color}
                  className="relative"
                  style={{ zIndex: 1 }}
                />
              ),
              headerTitleAlign: "center",
            }}
          />
          <Tabs.Screen
            name="create"
            options={{
              title: "Create",
              headerShown: true,
              tabBarIcon: ({ color, focused, size }) => (
                <Ionicons
                  name={focused ? "create" : "create-outline"}
                  size={size}
                  color={color}
                  className="relative"
                  style={{ zIndex: 1 }}
                />
              ),
              headerTitleAlign: "center",
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: "Settings",
              headerShown: true,
              tabBarIcon: ({ color, focused, size }) => (
                <Ionicons
                  name={focused ? "settings-sharp" : "settings-outline"}
                  size={size}
                  color={color}
                  className="relative"
                  style={{ zIndex: 1 }}
                />
              ),
              headerTitleAlign: "center",
            }}
          />
        </Tabs>
      </View>
    </LinearGradient>
  );
}

export default TabsLayout;
