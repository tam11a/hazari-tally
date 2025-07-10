import { Colors } from "@/constants/Colors";
import { GameType } from "@/constants/Schema";
import useGameData from "@/hooks/useGameData";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GameDetailsPage() {
  const [refreshing, setRefreshing] = useState(false);
  const { gameId } = useLocalSearchParams();
  const { getGameData } = useGameData();
  const [data, setData] = useState<GameType | null>(null);
  const router = useRouter();
  const loadGameData = async () => {
    if (gameId) {
      const gameData = await getGameData(Number(gameId));
      setData(gameData);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    loadGameData();
    // Reload game data when the gameId changes

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId, refreshing]);

  console.log(data);

  return !data ? (
    <SafeAreaView className="flex-1 items-center justify-center">
      <ActivityIndicator color="#ffffff77" size={"large"} />
    </SafeAreaView>
  ) : (
    <SafeAreaView className="flex-1">
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={[Colors.dark.primary, Colors.dark.tint, Colors.dark.text]}
            progressBackgroundColor={Colors.dark.paper}
            onRefresh={() => {
              setRefreshing(true);
            }}
          />
        }
      >
        {/* Game details page content goes here */}

        <Text>Game Details Page # {gameId}</Text>
        <Pressable
          onPress={() =>
            router.replace({
              pathname: "/(game)/update/[gameId]",
              params: { gameId: gameId.toString() },
            })
          }
          className="p-4 bg-white/10 rounded-lg m-2"
          style={{ borderColor: "#fff5", borderWidth: 1 }}
          android_ripple={{ color: "#fff5" }}
        >
          <Text className="text-blue-500">Update</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  ); // Placeholder for the game details page
}
