import { Image } from "react-native";

export default function Dotted({
  opacity = 0.05,
  className,
}: {
  opacity?: number;
  className?: string;
}) {
  return (
    <Image
      source={require("@/assets/icons/dot.png")}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 0,
        opacity,
      }}
      resizeMode="repeat"
      className={className}
    />
  );
}
