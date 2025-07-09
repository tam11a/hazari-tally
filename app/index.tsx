import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const router = useRouter();

  return (
    <SafeAreaView
      style={
        {
          // backgroundColor: Colors.dark.background,
        }
      }
      className="flex-1 items-center justify-center"
    >
      <Pressable
        className="mb-8"
        android_ripple={{
          color: "#ffffff22",
          radius: 10000,
          foreground: true,
        }}
        onPress={() => {
          router.push("/welcome/onboarding");
        }}
      >
        <View className="bg-[#182D4D] px-16 py-4 rounded-full mx-auto">
          <Text className="text-white">Get Started</Text>
        </View>
      </Pressable>
      <Pressable
        className="mb-8"
        android_ripple={{
          color: "#ffffff22",
          radius: 10000,
          foreground: true,
        }}
        onPress={() => {
          router.push("/hello");
        }}
      >
        <View className="bg-[#182D4D] px-16 py-4 rounded-full mx-auto">
          <Text className="text-white">Hello</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
}
