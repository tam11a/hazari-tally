import { Colors } from "@/constants/Colors";
import { Feather, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Icons
// import Feather from "@expo/vector-icons/Feather";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

function TabsLayout() {
  // get safe area insets for bottom tab bar
  const insets = useSafeAreaInsets();
  const router = useRouter();
  // adjust styles for the tab list to account for safe area insets

  // const { NavigationContent } = useTabsWithChildren({
  //   children: <NavigationTabs />,
  // });

  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          animation: "fade",
          tabBarActiveTintColor: Colors.dark.tint,
          tabBarInactiveTintColor: Colors.dark.text,
          tabBarStyle: {
            backgroundColor: Colors.dark.paper,
            borderRadius: 1000,
            width: "70%",
            borderTopWidth: 0,
            bottom: insets.bottom + 10,
            alignSelf: "center",
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          headerStyle: {
            backgroundColor: "transparent",
            elevation: 0, // Remove shadow on Android
            shadowOpacity: 0, // Remove shadow on iOS
            borderBottomWidth: 0, // Remove bottom border
          },
          headerTitle(props) {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  {...props}
                  style={{}}
                  className="text-white font-outfit-bold text-2xl"
                >
                  {props.children}
                </Text>
              </View>
            );
          },
          tabBarButton(props) {
            return (
              <Pressable
                onPress={props.onPress}
                className="flex flex-row items-center justify-center flex-grow gap-2"
              >
                {props.children}
              </Pressable>
            );
          },
          headerTitleAlign: "center", // Center the title
          headerLeft: () => (
            <Pressable
              onPress={() => router.push("/")}
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
            tabBarIcon: ({ color, size }) => (
              <SimpleLineIcons name="home" size={size} color={color} />
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
              <Ionicons name="create-outline" size={size} color={color} />
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
              <Feather name="settings" size={size} color={color} />
            ),
            headerTitleAlign: "center",
          }}
        />
      </Tabs>
      {/* <Tabs>
        <TabSlot />
        <TabList
          style={[
            styles.tabList,
            {
              bottom: insets.bottom + 10, // add padding for bottom safe area
            },
          ]}
        >
          <TabTrigger name="home" href="/(home)/main" asChild>
            <CustomTabButton
              Icon={<SimpleLineIcons name="home" size={20} color={"#fff"} />}
            >
              Home
            </CustomTabButton>
          </TabTrigger>
          <TabTrigger name="Create" href="/(home)/create" asChild>
            <CustomTabButton
              Icon={<Ionicons name="create-outline" size={24} color={"#fff"} />}
            >
              New
            </CustomTabButton>
          </TabTrigger>
          <TabTrigger name="settings" href="/(home)/settings" asChild>
            <CustomTabButton
              Icon={<Feather name="settings" size={20} color={"#fff"} />}
            >
              Settings
            </CustomTabButton>
          </TabTrigger>
        </TabList>
      </Tabs> */}
    </View>
  );
}

export default TabsLayout;

const styles = StyleSheet.create({
  tabList: {
    display: "flex",
    position: "absolute",
    left: "50%",
    transform: [{ translateX: "-50%" }],
    borderRadius: 1000,
    backgroundColor: Colors.dark.paper,
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    padding: 8,
  },
});
