import { DarkTheme, ThemeProvider } from "@react-navigation/native";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

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

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar translucent backgroundColor="transparent" />
      {/* <View style={[styles.statusBarBackground, { height: insets.top, backgroundColor: 'blue' }]} /> */}
    </ThemeProvider>
  );
}
