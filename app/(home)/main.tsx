import Dotted from "@/components/Dotted";
import { Colors } from "@/constants/Colors";
import { GameType } from "@/constants/Schema";
import CardSymbols, { getCardImage } from "@/constants/Symbols";
import useGameData from "@/hooks/useGameData";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import moment from "moment";
import React from "react";
import { Image, Pressable, RefreshControl, Text, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HEADER_HEIGHT = 220;
const HIDE_THRESHOLD = 20;

const Main = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { getAllGameData } = useGameData();
  const [gameList, setGameList] = React.useState<GameType[]>([]);

  // Reanimated shared values
  const scrollY = useSharedValue(0);
  const headerOffset = useSharedValue(0);

  React.useEffect(() => {
    const fetchData = async () => {
      setGameList(await getAllGameData());
      setRefreshing(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing]);

  // Hide header when scroll passes threshold
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      if (event.contentOffset.y > HIDE_THRESHOLD && headerOffset.value === 0) {
        headerOffset.value = withTiming(-HEADER_HEIGHT, { duration: 200 });
      } else if (
        event.contentOffset.y <= HIDE_THRESHOLD &&
        headerOffset.value !== 0
      ) {
        headerOffset.value = withTiming(0, { duration: 200 });
      }
    },
  });

  // Animated style for header
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: headerOffset.value }],
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  }));

  return (
    <View className="flex-1 flex flex-col">
      <Animated.View style={headerAnimatedStyle}>
        <Header headerOffset={headerOffset} />
      </Animated.View>
      <Animated.FlatList
        data={gameList?.sort((a, b) => b.gameId - a.gameId)}
        style={[
          {
            flex: 1,
            paddingHorizontal: 10,
          },
        ]}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(item) => item.gameId.toString()}
        stickyHeaderHiddenOnScroll
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={[Colors.dark.text]}
            progressBackgroundColor={Colors.dark.primary}
            onRefresh={() => setRefreshing(true)}
            progressViewOffset={HEADER_HEIGHT + 160} // Adjust based on header height
          />
        }
        onScroll={onScroll}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center mt-20">
            <MaterialCommunityIcons
              name="folder-table"
              size={60}
              color={Colors.dark.shadowText}
            />
            <Text
              className="text-lg font-outfit-bold"
              style={{ color: Colors.dark.text }}
            >
              No tallies found
            </Text>
            <Text
              className="text-sm font-outfit"
              style={{ color: Colors.dark.shadowText }}
            >
              Create a new tally to get started
            </Text>
          </View>
        )}
        scrollEventThrottle={16}
        ListHeaderComponent={<View style={{ height: HEADER_HEIGHT + 160 }} />}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
};

const Item = ({
  gameName,
  gameId,
  gameIcon,
  isCompleted,
  targetScore,
  players,
  createdAt,
}: GameType) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/(game)/[gameId]",
          params: { gameId: gameId.toString() },
        })
      }
      className="p-4 rounded-2xl m-2 flex flex-row items-center justify-between"
      style={{ backgroundColor: "#fff2" }}
      android_ripple={{ color: "#0002" }}
    >
      <Image
        source={getCardImage(gameIcon as keyof typeof CardSymbols)}
        style={{ width: 40, height: 40 }}
      />
      <View className="flex-1 ml-4">
        <View className="flex-row items-center gap-2 pr-10">
          <Text
            className="text-lg font-outfit-bold"
            style={{
              color: Colors.dark.text,
            }}
            numberOfLines={1}
          >
            {gameName}
          </Text>
          {!isCompleted && (
            <View className="h-3 w-3 bg-lime-500 rounded-full" />
          )}
        </View>
        <Text
          className="font-outfit text-sm"
          style={{
            color: Colors.dark.shadowText,
          }}
          numberOfLines={1}
        >
          {moment(createdAt).calendar()}
        </Text>
        <Text
          className="font-outfit text-sm"
          style={{
            color: Colors.dark.shadowText,
          }}
          numberOfLines={1}
        >
          {players.length} Players &bull; {targetScore} Points
        </Text>
      </View>
      <View>
        <Ionicons
          name="chevron-forward-outline"
          size={30}
          color={Colors.dark.shadowText}
        />
      </View>
    </Pressable>
  );
};

const FloatingSymbol = ({
  source,
  style,
  floatRange = 10,
  floatDuration = 2000,
}: {
  source: any;
  style?: any;
  floatRange?: number;
  floatDuration?: number;
}) => {
  const translateY = useSharedValue(0);

  React.useEffect(() => {
    let isMounted = true;
    const loop = () => {
      if (!isMounted) return;
      translateY.value = withRepeat(
        withTiming(floatRange, { duration: floatDuration }, () => {
          translateY.value = withRepeat(
            withTiming(-floatRange, { duration: floatDuration }, loop),
            -1,
            true
          );
        }),
        -1,
        true
      );
    };
    loop();
    return () => {
      isMounted = false;
    };
  }, [floatRange, floatDuration, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [...(style?.transform || []), { translateY: translateY.value }],
  }));

  return <Animated.Image source={source} style={[style, animatedStyle]} />;
};

const Header = ({ headerOffset }: { headerOffset: SharedValue<number> }) => {
  const { top } = useSafeAreaInsets();
  const router = useRouter();

  const cardsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: headerOffset.value
          ? headerOffset.value * 0.7 // Move it up more than the header, adjust multiplier as needed
          : 0,
      },
    ],
  }));

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
        className="min-h-[40vh] relative flex-col items-center justify-end"
        style={{ paddingTop: top }}
      >
        {/* Floating card suit images */}
        {/* Floating card suit images with floating animation */}
        <FloatingSymbol
          source={require("@/assets/symbols/hearts.png")}
          style={{
            width: 50,
            height: 50,
            position: "absolute",
            bottom: "50%",
            left: "12%",
            transform: [{ rotate: "-12deg" }],
          }}
          floatRange={10}
          floatDuration={2200}
        />
        <FloatingSymbol
          source={require("@/assets/symbols/clubs.png")}
          style={{
            width: 60,
            height: 60,
            position: "absolute",
            bottom: "60%",
            right: "10%",
            transform: [{ rotate: "12deg" }],
          }}
          floatRange={14}
          floatDuration={2600}
        />
        <FloatingSymbol
          source={require("@/assets/symbols/spades.png")}
          style={{
            width: 60,
            height: 60,
            position: "absolute",
            bottom: "10%",
            left: "10%",
            transform: [{ rotate: "12deg" }],
          }}
          floatRange={8}
          floatDuration={2000}
        />
        <FloatingSymbol
          source={require("@/assets/symbols/diamonds.png")}
          style={{
            width: 80,
            height: 80,
            position: "absolute",
            bottom: "5%",
            right: "10%",
            transform: [{ rotate: "-12deg" }],
          }}
          floatRange={16}
          floatDuration={2400}
        />

        {/* Main cards image */}
        <Animated.Image
          source={require("@/assets/icons/cards.png")}
          style={[
            {
              width: 110,
              height: 110,
            },
            cardsAnimatedStyle,
          ]}
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
