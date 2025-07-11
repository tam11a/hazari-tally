import { Colors } from "@/constants/Colors";
import useGameData from "@/hooks/useGameData";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { BackHandler, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const { deleteAllGameData } = useGameData();
  return (
    <SafeAreaView className="flex-1 px-4">
      <SettingsButton
        onPress={() => {
          // Logic to clear all game data
          deleteAllGameData();
        }}
        icon={
          <MaterialCommunityIcons
            name="delete-empty"
            size={35}
            color={Colors.dark.error}
          />
        }
        label="Clear History"
        description="Deleting all tallies can't be undone"
      />
      <SettingsButton
        onPress={() => {
          // Logic to exit the app
          // This might not work on all platforms, consider using a navigation library
          // to navigate back to the home screen or close the app.
          // For Expo, you can use BackHandler or similar methods.
          BackHandler.exitApp();
        }}
        icon={<Feather name="x" size={35} color={Colors.dark.text} />}
        label="Exit"
        description="Close the app"
      />

      {/* App Version */}
      <View className="px-4 py-6 rounded-2xl m-2 flex flex-col items-center justify-start gap-1 mt-14">
        <Text
          className="text-sm font-outfit-bold"
          style={{ color: Colors.dark.shadowText }}
        >
          Hazari Tally
        </Text>
        <Text
          className="font-outfit text-xs"
          style={{ color: Colors.dark.shadowText }}
        >
          Version 1.0.0
        </Text>
      </View>
    </SafeAreaView>
  );
};

const SettingsButton = ({
  onPress,
  icon,
  label,
  description,
}: {
  onPress: () => void;
  icon: React.ReactNode;
  label: string;
  description?: string;
}) => {
  return (
    <Pressable
      onPress={onPress}
      className="px-4 py-6 rounded-2xl m-2 flex flex-row items-center justify-start gap-4"
      style={{ backgroundColor: "#fff2" }}
      android_ripple={{ color: "#0002" }}
    >
      <View>{icon}</View>
      <View>
        <Text
          className="text-xl font-outfit-bold"
          style={{ color: Colors.dark.text }}
        >
          {label}
        </Text>
        {description && (
          <Text
            className="font-outfit"
            style={{ color: Colors.dark.shadowText }}
          >
            {description}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default Settings;
