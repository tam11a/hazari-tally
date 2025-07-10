import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Main = () => {
  return (
    <View className={"flex-1"}>
      <Header />
    </View>
  );
};

const Header = () => {
  return (
    <LinearGradient
      colors={["#5D1DC1", "#396197"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
    >
      <View>
        <SafeAreaView>
          <Text className={"text-white text-lg font-bold"}>Header</Text>
        </SafeAreaView>
      </View>
    </LinearGradient>
  );
};
export default Main;
