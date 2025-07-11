import { Stack } from "expo-router";

export default function GameLayout() {
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
      <Stack.Screen name="[gameId]" />
      <Stack.Screen name="update/[gameId]" />
      <Stack.Screen
        name="addscore/[gameId]"
        options={{
          presentation: "modal",
          animation: "slide_from_right",
          headerShown: true,
          headerTitle: "Add Score",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTintColor: "#ffffff",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
