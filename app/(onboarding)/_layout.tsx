import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";

export default function RootLayout() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  const isAppInitialized = async () => {
    try {
      const appInitialized = await AsyncStorage.getItem("appInitialized");
      setLoaded(true);
      if (appInitialized === "true") {
        // If the app is already initialized, navigate to the main screen
        router.replace("/(home)/main");
        return;
      }
    } catch (error) {
      console.error("Error loading games:", error);
    }
  };

  // Load games when component mounts
  useEffect(() => {
    isAppInitialized();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reload games when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      isAppInitialized();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  if (!loaded) {
    return null; // or a loading indicator
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "transparent",
        },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
    </Stack>
  );
}
