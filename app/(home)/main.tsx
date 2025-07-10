import Dotted from "@/components/Dotted";
import { Colors } from "@/constants/Colors";
import { GameType } from "@/constants/Schema";
import useGameData from "@/hooks/useGameData";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
        style={{}}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(item) => item.gameId.toString()}
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
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  return (
    <LinearGradient
      colors={["#5D1DC1", "#396197"]}
      start={{ x: 0.2, y: 0.8 }}
      end={{ x: 1, y: 0 }}
      style={{
        borderBottomLeftRadius: 1000,
        borderBottomRightRadius: 1000,
        marginBottom: 40,
      }}
    >
      <Dotted opacity={0.1} className="rounded-b-[1000]" />
      <View
        className="min-h-[40vh] flex-col items-center justify-end"
        style={{ paddingTop: top }}
      >
        <Image
          source={require("@/assets/symbols/hearts.png")}
          style={{
            width: 50,
            height: 50,
          }}
          className="absolute bottom-[50%] left-[12%] -rotate-12"
        />
        <Image
          source={require("@/assets/symbols/clubs.png")}
          style={{
            width: 60,
            height: 60,
          }}
          className="absolute bottom-[60%] right-[10%] rotate-12"
        />
        <Image
          source={require("@/assets/symbols/spades.png")}
          style={{
            width: 60,
            height: 60,
          }}
          className="absolute bottom-[10%] left-[10%] rotate-12"
        />
        <Image
          source={require("@/assets/symbols/diamonds.png")}
          style={{
            width: 80,
            height: 80,
          }}
          className="absolute bottom-[5%] right-[10%] -rotate-12"
        />

        <Image
          source={require("@/assets/icons/cards.png")}
          style={{
            width: 110,
            height: 110,
          }}
        />

        <Pressable
          onPress={() => router.push("/(home)/create")}
          className="bg-white rounded-full px-6 py-4 mt-8 -mb-4"
        >
          <Text
            className="font-outfit-bold text-xl"
            style={{
              color: Colors.dark.paper,
            }}
          >
            Create Tally
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};
export default Main;
