import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export default function TabBarLabel(props: {
  focused: boolean;
  color: string;
  children: string;
}) {
  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      fontSize: withTiming(props.focused ? 14 : 0.0001, {
        duration: 200,
      }),
      transform: [{ translateX: withTiming(props.focused ? 0 : -20) }],
    };
  });

  const buttonBackdropAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(props.focused ? "100%" : "0%", {
        duration: 300,
      }),
    };
  });
  return (
    <>
      <Animated.View style={[styles.backdrop, buttonBackdropAnimatedStyle]} />

      <Animated.Text
        className="font-outfit-bold"
        style={[styles.text, textAnimatedStyle]}
      >
        {props.children}
      </Animated.Text>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    left: 0,
    borderRadius: 100,
    backgroundColor: Colors.dark.primary,
    height: "100%",
  },
  text: {
    color: "#ffffff",
    paddingTop: 2,
  },
});
