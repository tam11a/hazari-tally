import { CustomTabButton } from "@/components/home/CustomTabButton";
import { Colors } from "@/constants/Colors";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Icons
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

function TabsLayout() {
  // get safe area insets for bottom tab bar
  const insets = useSafeAreaInsets();
  // adjust styles for the tab list to account for safe area insets

  return (
    <View className="flex-1">
      <Tabs
        options={{
          initialRouteName: "home",
        }}
      >
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
      </Tabs>
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
