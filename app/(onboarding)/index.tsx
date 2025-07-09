import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <View style={[styles.itemContainer]}>
        <View />
        <View />
        <View />
        <Image source={require("@/assets/icons/cards.png")} />

        <View>
          <Text style={styles.itemTitle} className="font-righteous">
            Hazari Tally
          </Text>
          <Text
            style={styles.itemText}
            className="font-outfit text-xl max-w-xs"
          >
            Track your Hazari scores easily and focus on the game.
          </Text>
        </View>
        <Pressable
          className="mb-8 bg-white text-background rounded-full"
          android_ripple={{
            color: "#00000022",
            foreground: true,
          }}
          onPress={() => {
            router.push("/(onboarding)/onboarding");
          }}
        >
          <View className="px-8 py-4 mx-auto">
            <Text
              className="font-outfit-bold"
              style={{
                fontSize: 16,
              }}
            >
              Get Started
            </Text>
          </View>
        </Pressable>
        <View />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  itemTitle: {
    color: Colors.dark.tint,
    fontSize: 36,
    textAlign: "center",
    marginBottom: 16,
    marginTop: 60,
  },
  itemText: {
    color: Colors.dark.text,
    textAlign: "center",
    marginHorizontal: 30,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    margin: 20,
  },
});
