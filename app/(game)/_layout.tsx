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
    </Stack>
  );
}
