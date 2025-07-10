import { Colors } from "@/constants/Colors";
import { GameType } from "@/constants/Schema";
import useGameData from "@/hooks/useGameData";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GameDetailsPage() {
  const [refreshing, setRefreshing] = useState(false);
  const { gameId } = useLocalSearchParams();
  const { getGameData } = useGameData();
  const [data, setData] = useState<GameType | null>(null);

  const [playerData, setPlayerData] = useState<
    { id: number; name: string; totalScore: number; position: number }[] | null
  >(null);

  const router = useRouter();
  const loadGameData = async () => {
    if (gameId) {
      const gameData = await getGameData(Number(gameId));
      setData(gameData);

      if (gameData) {
        // Calculate total scores for each player
        const playersWithScores = gameData.players.map((player) => ({
          originalId: player.id,
          name: player.name,
          totalScore: gameData.rounds.reduce(
            (acc, round) =>
              acc +
              (round.scores.find((score) => score.playerId === player.id)
                ?.score || 0),
            0
          ),
        }));

        // Sort players by totalScore descending
        playersWithScores.sort((a, b) => b.totalScore - a.totalScore);

        // Assign rank (id) based on position, same rank for same score
        let lastScore: number | null = null;
        let lastRank = 0;
        let currentRank = 1;
        const rankedPlayers = playersWithScores.map((player, idx) => {
          if (lastScore === player.totalScore) {
            // Same score as previous, same rank
            currentRank = lastRank;
          } else {
            // New score, rank is idx+1
            currentRank = idx + 1;
            lastScore = player.totalScore;
            lastRank = currentRank;
          }
          return {
            id: player.originalId,
            position: currentRank,
            name: player.name,
            totalScore: player.totalScore,
          };
        });

        setPlayerData(rankedPlayers);
      }
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
    <SafeAreaView className="flex-1 ">
      <View
        className="flex-row items-center justify-between"
        style={{ paddingTop: 20 }}
      >
        <Pressable
          onPress={() =>
            router.replace({
              pathname: "/(home)/main",
            })
          }
          style={{
            marginLeft: 20,
            padding: 5,
            borderRadius: 20,
            backgroundColor: "#fff2",
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>

        <Text className="text-white text-2xl font-bold flex-1 text-center font-righteous">
          #{data.gameId}
        </Text>
        <Pressable
          onPress={() =>
            router.replace({
              pathname: "/(game)/update/[gameId]",
              params: { gameId: gameId.toString() },
            })
          }
          style={{
            marginRight: 20,
            padding: 5,
            borderRadius: 20,
            backgroundColor: "#fff2",
          }}
        >
          <Feather name="edit" size={24} color="white" />
        </Pressable>
        {/* <View className="w-10" /> */}
      </View>
      <ScrollView
        className="m-5"
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
        <View
          className="border-2 rounded-2xl p-2"
          style={{
            borderColor: Colors.dark.text,
            backgroundColor: Colors.dark.paper,
          }}
        >
          <View className="flex-col items-start justify-center p-4 font-outfit gap-2">
            <Text style={{ color: Colors.dark.shadowText }}>Game Name</Text>
            <Text numberOfLines={1} className="text-white font-outfit-bold">
              {data.gameName}
            </Text>
          </View>

          <View
            className="border-t-2"
            style={{ borderColor: Colors.dark.text }}
          ></View>

          <View className="flex-row items-center justify-between">
            <View className="flex-col items-center justify-center p-4 font-outfit gap-2">
              <Text style={{ color: Colors.dark.shadowText }}>
                Target Score
              </Text>
              <Text numberOfLines={1} className="text-white font-outfit-bold">
                {data.targetScore}
              </Text>
            </View>
            <View className="flex-col items-center justify-center p-4 font-outfit gap-2">
              <Text style={{ color: Colors.dark.shadowText }}>Round Score</Text>
              <Text numberOfLines={1} className="text-white font-outfit-bold">
                {data.maxRoundScore}
              </Text>
            </View>
            <View className=" flex-col items-center justify-center p-4 font-outfit gap-2">
              <Text style={{ color: Colors.dark.shadowText }}>Round</Text>
              <Text numberOfLines={1} className="text-white font-outfit-bold">
                {data.rounds.length}
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-7 flex-1 gap-5">
          <Text
            className="font-righteous text-3xl"
            style={{ color: Colors.dark.text }}
          >
            Leaderboard
          </Text>
          <View
            className="border-2 rounded-2xl p-2"
            style={{
              borderColor: Colors.dark.paper,
              backgroundColor: Colors.dark.paper,
            }}
          >
            {playerData?.map((player, index) => (
              <View
                key={player.id}
                className={`flex-row items-center justify-between p-4 border-t-2 ${
                  index === 0 ? "border-t-0" : ""
                }`}
                style={{ borderColor: Colors.dark.text }}
              >
                <View className="flex-row items-center gap-3">
                  <Text
                    className="text-white font-outfit-bold"
                    style={{ color: Colors.dark.primary }}
                  >
                    {`#${player.position}`}
                  </Text>
                  <Text
                    className="text-white font-outfit-bold"
                    style={{ color: Colors.dark.text }}
                  >
                    {player.name}
                  </Text>
                </View>
                <Text
                  className="text-white font-outfit-bold"
                  style={{ color: Colors.dark.primary }}
                >
                  {player.totalScore}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  ); // Placeholder for the game details page
}
