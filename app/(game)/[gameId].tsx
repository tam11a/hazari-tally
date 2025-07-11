import { Colors } from "@/constants/Colors";
import { GameType } from "@/constants/Schema";
import useGameData from "@/hooks/useGameData";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function GameDetailsPage() {
  const [refreshing, setRefreshing] = useState(false);
  const { gameId } = useLocalSearchParams();
  const { getGameData } = useGameData();
  const [data, setData] = useState<GameType | null>(null);
  const insets = useSafeAreaInsets();

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

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentPress = () => bottomSheetModalRef?.current?.present();

  const AddSheetModal = ({
    ref,
  }: {
    ref: React.RefObject<BottomSheetModal | null>;
  }) => {
    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={["50%"]}
        backgroundStyle={{
          backgroundColor: Colors.dark.paper,
        }}
        handleIndicatorStyle={{ backgroundColor: Colors.dark.shadowText }}
        handleStyle={{
          backgroundColor: Colors.dark.paper,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <BottomSheetView
          className="flex-1 items-center justify-center"
          style={{
            paddingBottom: insets.bottom + 20,
          }}
        >
          <Text className="text-white font-outfit-bold text-2xl">
            Add Score
          </Text>
          <Text className="text-white font-outfit text-lg">Coming Soon!</Text>
          <Pressable
            onPress={() => bottomSheetModalRef?.current?.dismiss()}
            className="mt-4 px-6 py-2 bg-white/10 rounded-lg"
            style={{ borderColor: "#fff5", borderWidth: 1 }}
          >
            <Text className="text-white font-outfit-bold">Close</Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheetModal>
    );
  };

  return !data ? (
    <SafeAreaView className="flex-1 items-center justify-center">
      <ActivityIndicator color="#ffffff77" size={"large"} />
    </SafeAreaView>
  ) : (
    <GestureHandlerRootView className="flex-1">
      <BottomSheetModalProvider>
        <SafeAreaView className="flex-1">
          <AddSheetModal ref={bottomSheetModalRef} />
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
              <Ionicons name="chevron-back-outline" size={24} color="#ffffff" />
            </Pressable>

            <Text className="text-white text-2xl flex-1 text-center !font-righteous">
              Game # {data.gameId}
            </Text>
            <Pressable
              onPress={() =>
                router.push({
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
              <MaterialCommunityIcons name="pen" size={24} color="white" />
            </Pressable>
            {/* <View className="w-10" /> */}
          </View>
          <ScrollView
            className="m-5"
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                colors={[Colors.dark.text]}
                progressBackgroundColor={Colors.dark.primary}
                onRefresh={() => {
                  setRefreshing(true);
                }}
              />
            }
          >
            <View
              className="rounded-2xl p-2 mt-5"
              style={{
                backgroundColor: "#fff2",
              }}
            >
              <View className="flex-col items-start justify-center p-4  gap-2">
                <Text
                  style={{ color: Colors.dark.shadowText }}
                  className="font-outfit"
                >
                  Game Name
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-white text-xl font-outfit-bold"
                >
                  {data.gameName}
                </Text>
              </View>

              <View className="border-t-2" style={{ borderColor: "#fff2" }} />

              <View className="flex-row items-center justify-between">
                <View className="flex-col w-1/3 items-center justify-center p-4 gap-2">
                  <Text
                    style={{ color: Colors.dark.shadowText }}
                    className="font-outfit"
                  >
                    Target Score
                  </Text>
                  <Text
                    numberOfLines={1}
                    className="text-white font-outfit-bold text-xl"
                  >
                    {data.targetScore}
                  </Text>
                </View>
                <View className="flex-col w-1/3 items-center justify-center p-4 gap-2">
                  <Text
                    style={{ color: Colors.dark.shadowText }}
                    className="font-outfit"
                  >
                    Round Score
                  </Text>
                  <Text
                    numberOfLines={1}
                    className="text-white font-outfit-bold text-xl"
                  >
                    {data.maxRoundScore}
                  </Text>
                </View>
                <View className=" flex-col w-1/3 items-center justify-center p-4 gap-2">
                  <Text
                    style={{ color: Colors.dark.shadowText }}
                    className="font-outfit"
                  >
                    Round
                  </Text>
                  <Text
                    numberOfLines={1}
                    className="text-white font-outfit-bold text-xl"
                  >
                    {data.rounds.length}
                  </Text>
                </View>
              </View>
            </View>

            <View className="mt-7 flex-1 gap-5">
              <View className="flex-row items-center justify-between">
                <Text
                  className="font-righteous text-2xl ml-3"
                  style={{ color: Colors.dark.text }}
                >
                  Leaderboard
                </Text>
                <Pressable
                  onPress={handlePresentPress}
                  className="flex-row items-center gap-2 rounded-full px-4 py-2"
                  style={{
                    backgroundColor: "#fff2",
                  }}
                >
                  <Ionicons name="add" size={20} color="#ffffff" />
                  <Text className="text-white font-outfit-bold">Add Score</Text>
                </Pressable>
              </View>
              <View
                className="rounded-2xl px-2"
                style={{
                  backgroundColor: "#fff2",
                }}
              >
                {playerData?.map((player, index) => (
                  <View
                    key={player.id}
                    className={`flex-row items-center justify-between p-4  ${
                      index === 0 ? "border-t-0" : "border-t-2"
                    }`}
                    style={{ borderColor: "#fff2" }}
                  >
                    <View className="flex-row items-center gap-4">
                      <Text
                        className="text-white text-lg font-outfit-bold"
                        style={{ color: Colors.dark.tint }}
                      >
                        {`#${player.position}`}
                      </Text>
                      <Text
                        className="text-white text-lg font-outfit-bold"
                        style={{ color: Colors.dark.text }}
                        numberOfLines={1}
                      >
                        {player.name}
                      </Text>
                    </View>
                    <Text
                      className="text-white text-lg font-outfit-bold"
                      style={{ color: Colors.dark.tint }}
                    >
                      {player.totalScore}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  ); // Placeholder for the game details page
}
