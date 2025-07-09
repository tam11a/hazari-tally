import { Stack } from "expo-router";
import "react-native-reanimated";

import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, View } from "react-native";
import "./global.css";

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const [loaded, error] = useFonts({
  //   Righteous_400Regular,
  //   Outfit_400Regular,
  // });

  // useEffect(() => {
  //   if (loaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded, error]);

  // if (!loaded && !error) {
  //   // Async font loading only occurs in development.
  //   return null;
  // }

  StatusBar.setBarStyle("light-content", true);
  StatusBar.setBackgroundColor("transparent", true);
  StatusBar.setTranslucent(true);

  return (
    <LinearGradient
      colors={["#764985", "#090030"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View className="flex-1">
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "transparent",
            },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="welcome/onboarding" />
          <Stack.Screen name="hello" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </View>
    </LinearGradient>
  );
}
