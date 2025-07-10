import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Pressable } from "react-native";

export default function TabBarButton(props: BottomTabBarButtonProps) {
  return (
    <Pressable
      onPress={props.onPress}
      className="flex flex-1 relative flex-row items-center justify-center flex-grow gap-1"
    >
      {props.children}
    </Pressable>
  );
}
