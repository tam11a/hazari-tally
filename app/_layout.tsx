import { Stack } from "expo-router";
import "react-native-reanimated";

import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StatusBar, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
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

  const gap = 10;
  const dotSize = 2;
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const cols = Math.ceil(screenWidth / gap) + 1;
  const rows = Math.ceil(screenHeight / gap) + 1;
  return (
    <LinearGradient
      colors={["#764985", "#090030"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <Svg
        pointerEvents="none"
        style={{
          position: "absolute",
          width: screenWidth,
          height: screenHeight,
          zIndex: 1,
          top: 0,
          left: 0,
        }}
        width={screenWidth}
        height={screenHeight}
      >
        {Array.from({ length: rows }).map((_, row) =>
          Array.from({ length: cols }).map((_, col) => (
            <Circle
              key={`${row}-${col}`}
              cx={col * gap}
              cy={row * gap}
              r={dotSize / 2}
              fill="rgba(255,255,255,0.10)"
            />
          ))
        )}
      </Svg>
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
          <Stack.Screen name="welcome/onboarding" />
          <Stack.Screen name="hello" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </View>
    </LinearGradient>
  );
}
