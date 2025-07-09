import { Stack } from "expo-router";
import "react-native-reanimated";

import { LinearGradient } from "expo-linear-gradient";
import { Image, StatusBar, View } from "react-native";
import "./global.css";
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Uncomment the following lines if you want to use custom fonts
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

  // Set the status bar style and background color
  StatusBar.setBarStyle("light-content", true);
  StatusBar.setBackgroundColor("transparent", true);
  StatusBar.setTranslucent(true);

  return (
    <LinearGradient
      colors={["#9424BA", "#090030"]}
      start={{ x: -0.7, y: -0.4 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, position: "relative" }}
    >
      <LinearGradient
        colors={["#9424BA", "#09003090"]}
        start={{ x: 1, y: 1.4 }}
        end={{ x: 0, y: 0.9 }}
        style={{ flex: 1, position: "relative" }}
      >
        <Image
          source={require("@/assets/icons/dot.png")}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 0,
            opacity: 0.05,
          }}
          resizeMode="repeat"
        />
        <View className="flex-1 z-1">
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
            <Stack.Screen name="hello" />
            <Stack.Screen name="+not-found" />
          </Stack>
        </View>
      </LinearGradient>
    </LinearGradient>
  );
}
