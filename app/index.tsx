import { Platform, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text
        className="text-xl font-bold text-red-500"
        style={{
          fontFamily: Platform.select({
            android: "Outfit_400Regular",
            ios: "Outfit_400Regular",
            native: "Outfit_400Regular",
          }),
        }}
      >
        Welcome to Nativewind!
      </Text>
    </SafeAreaView>
  );
}
