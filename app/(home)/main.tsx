import { Colors } from "@/constants/Colors";
import { GameType } from "@/constants/Schema";
import useGameData from "@/hooks/useGameData";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Main = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const { getAllGameData } = useGameData();
  const [gameList, setGameList] = React.useState<GameType[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      setGameList(await getAllGameData());
      setRefreshing(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing]);

  return (
    <View className={"flex-1"}>
      <Header />
      <FlatList
        data={gameList}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(item) => item.gameId.toString()}
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
      />
    </View>
  );
};

const Item = ({ gameName, gameId }: GameType) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/(game)/[gameId]",
          params: { gameId: gameId.toString() },
        })
      }
      className="p-4 bg-white/10 rounded-lg m-2"
      style={{ borderColor: "#fff5", borderWidth: 1 }}
      android_ripple={{ color: "#fff5" }}
    >
      <Text className="text-white text-2xl">{gameName}</Text>
    </Pressable>
  );
};

const Header = () => {
  return (
    <LinearGradient
      colors={["#5D1DC1", "#396197"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
    >
      <View>
        <SafeAreaView>
          <Text className={"text-white text-lg font-bold"}>Header</Text>
        </SafeAreaView>
      </View>
    </LinearGradient>
  );
};
export default Main;
