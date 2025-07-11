import { SplashScreen, Stack } from "expo-router";
import "react-native-reanimated";

import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, View } from "react-native";
import "./global.css";

import Dotted from "@/components/Dotted";
import {
  Outfit_100Thin,
  Outfit_400Regular,
  Outfit_700Bold,
  useFonts as useOutfit,
} from "@expo-google-fonts/outfit";
import {
  Righteous_400Regular,
  useFonts as useRighteous,
} from "@expo-google-fonts/righteous";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Load the fonts
  // Using the Expo Google Fonts package for Outfit and Righteous fonts
  // This will ensure the fonts are loaded before the app is displayed
  // If you want to use other fonts, you can import them similarly
  // and add them to the useFonts hook.
  const [outfitLoaded] = useOutfit({
    Outfit_400Regular,
    Outfit_700Bold,
    Outfit_100Thin,
  });
  const [righteousLoaded] = useRighteous({ Righteous_400Regular });

  useEffect(() => {
    if (outfitLoaded || righteousLoaded) {
      SplashScreen.hideAsync();
    }
  }, [outfitLoaded, righteousLoaded]);

  if (!outfitLoaded || !righteousLoaded) {
    return null; // or <AppLoading />
  }

  // Set the status bar style and background color
  StatusBar.setBarStyle("light-content", true);
  StatusBar.setBackgroundColor("transparent", true);
  StatusBar.setTranslucent(true);

  return (
    <>
      {/* <LinearGradient
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
          <LinearGradient
            colors={["#E73C7281", "#09003010"]}
            start={{ x: -0.7, y: -0.4 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1, position: "relative" }}
          > */}
      <LinearGradient
        colors={["#2F073C", "#090030"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, position: "relative" }}
      >
        <Dotted />
        <View className="flex-1 z-1">
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: "transparent",
              },
              animation: "slide_from_right",
            }}
          >
            <Stack.Screen name="(onboarding)" />
            <Stack.Screen name="+not-found" />
          </Stack>
        </View>
      </LinearGradient>
      {/* </LinearGradient>
        </LinearGradient>
      </LinearGradient> */}
    </>
  );
}
