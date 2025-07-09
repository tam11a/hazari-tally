import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

export default function Page() {
  const router = useRouter();

  return (
    <>
      <Onboarding
        transitionAnimationDuration={300}
        titleStyles={{
          color: Colors.dark.tint,
          fontFamily: "Righteous_400Regular",
          fontWeight: "400",
        }}
        subTitleStyles={{
          color: "#FFFFFF",
          fontFamily: "Outfit_400Regular",
          fontWeight: "500",
          maxWidth: "80%",
        }}
        onDone={() => {
          router.push("/");
        }}
        SkipButtonComponent={({ ...props }) => (
          <TouchableOpacity {...props} className="px-6">
            <Text className="font-bold text-white text-base">Skip</Text>
          </TouchableOpacity>
        )}
        NextButtonComponent={({ ...props }) => (
          <TouchableOpacity {...props} className="px-6">
            <Text className="font-bold text-white text-base">Next</Text>
          </TouchableOpacity>
        )}
        DoneButtonComponent={({ ...props }) => (
          <TouchableOpacity {...props} className="px-6">
            <Text className="font-bold text-white text-base">Done</Text>
          </TouchableOpacity>
        )}
        pages={[
          {
            backgroundColor: "transparent",
            image: (
              <View className="min-h-[35vh] flex flex-col items-center justify-center">
                <Image
                  source={require("@/assets/icons/ob-1.png")}
                  className="h-[50vw] w-[50vw] max-h-60 max-w-[240px]"
                />
              </View>
            ),
            title: "Cool Scoreboard",
            subtitle:
              "Enjoy a sleek, interactive scoreboard designed to keep the fun going.",
          },
          {
            backgroundColor: "transparent",
            image: (
              <View className="min-h-[35vh] flex flex-col items-center justify-center">
                <Image
                  source={require("@/assets/icons/ob-2.png")}
                  className="h-[50vw] w-[50vw] max-h-60 max-w-[240px]"
                />
              </View>
            ),
            title: "Instant Tally",
            subtitle:
              "Add scores effortlessly and let Hazari Tally handle the calculations for every round.",
          },
          {
            backgroundColor: "transparent",
            image: (
              <View className="min-h-[35vh] flex flex-col items-center justify-center">
                <Image
                  source={require("@/assets/icons/ob-3.png")}
                  className="h-[50vw] w-[50vw] max-h-60 max-w-[240px]"
                />
              </View>
            ),
            title: "Game History",
            subtitle:
              "Save and revisit your games anytime. Never lose track of past scores!",
          },
          {
            backgroundColor: "transparent",
            image: (
              <View className="min-h-[35vh] flex flex-col items-center justify-center">
                <Image
                  source={require("@/assets/icons/ob-4.png")}
                  className="h-[50vw] w-[50vw] max-h-60 max-w-[240px]"
                />
              </View>
            ),
            title: "Ready to Play?",
            subtitle:
              "Create your first game now and experience hassle-free score tracking!",
          },
        ]}
      />
    </>
  );
}
