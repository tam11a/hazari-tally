import { GameType } from "@/constants/Schema";
import useGameData from "@/hooks/useGameData";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GameDetailsPage() {
  const { gameId } = useLocalSearchParams();
  const { getGameData } = useGameData();
  const [data, setData] = useState<GameType | null>(null);

  const loadGameData = async () => {
    if (gameId) {
      const gameData = await getGameData(Number(gameId));
      setData(gameData);
    }
  };

  useEffect(() => {
    loadGameData();
    // Reload game data when the gameId changes

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);

  console.log(data);

  return !data ? (
    <SafeAreaView>
      <Text>No Data With # {gameId}</Text>
    </SafeAreaView>
  ) : (
    <SafeAreaView>
      {/* Game details page content goes here */}
      <Text>Game Details Page # {gameId}</Text>
    </SafeAreaView>
  ); // Placeholder for the game details page
}
