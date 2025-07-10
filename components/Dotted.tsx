import { Image } from "react-native";

export default function Dotted() {
  return (
    <Image
      source={require("@/assets/icons/dot.png")}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 0,
        opacity: 0.05,
      }}
      resizeMode="repeat"
    />
  );
}
