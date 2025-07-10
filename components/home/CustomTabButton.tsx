import { Colors } from "@/constants/Colors";
import { TabTriggerSlotProps } from "expo-router/ui";
import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface CustomTabButtonProps
  extends React.PropsWithChildren,
    TabTriggerSlotProps {
  Icon?: React.ReactNode;
}

export const CustomTabButton = React.forwardRef<View, CustomTabButtonProps>(
  (props, ref) => {
    const textAnimatedStyle = useAnimatedStyle(() => {
      return {
        fontSize: withTiming(props.isFocused ? 14 : 0.0001, {
          duration: 200,
        }),
        transform: [{ translateX: withTiming(props.isFocused ? 0 : -20) }],
      };
    });

    const buttonBackdropAnimatedStyle = useAnimatedStyle(() => {
      return {
        width: withTiming(props.isFocused ? "100%" : "0%", {
          duration: 200,
        }),
      };
    });

    const { Icon } = props;

    return (
      <Pressable ref={ref} {...props} style={[styles.button]}>
        <Animated.View style={[styles.backdrop, buttonBackdropAnimatedStyle]} />
        {Icon}
        <Animated.Text
          className={"font-outfit-bold"}
          style={[styles.text, textAnimatedStyle]}
        >
          {props.children}
        </Animated.Text>
      </Pressable>
    );
  }
);

CustomTabButton.displayName = "CustomTabButton";

const styles = StyleSheet.create({
  button: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    gap: 8,
    height: 50,
  },
  backdrop: {
    position: "absolute",
    left: 0,
    borderRadius: 100,
    backgroundColor: Colors.dark.primary,
    zIndex: 0,
    height: "100%",
  },
  text: {
    color: "#ffffff",
    lineHeight: 30,
    zIndex: 1,
    fontWeight: "500",
  },
});
