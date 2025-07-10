import { Colors } from "@/constants/Colors";
import GameSchema, { GameType } from "@/constants/Schema";
import useGameData from "@/hooks/useGameData";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { joiResolver } from "@hookform/resolvers/joi";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Update = () => {
  const { gameId } = useLocalSearchParams();
  const { getGameData, updateGameData } = useGameData();

  const { handleSubmit, control, reset } = useForm<GameType>({
    resolver: joiResolver(GameSchema),
    defaultValues: {
      gameIcon: "spades",
      gameName: "",
      isCompleted: false,
      maxRoundScore: 360,
      targetScore: 1000,
      players: [
        {
          id: 1,
          name: "",
        },
        {
          id: 2,
          name: "",
        },
        {
          id: 3,
          name: "",
        },
        {
          id: 4,
          name: "",
        },
      ],
      rounds: [],
      createdAt: new Date(),
    },
  });

  const loadGameData = async () => {
    if (gameId) {
      const gameData = await getGameData(Number(gameId));
      if (gameData) {
        reset(gameData);
      }
    }
  };

  useEffect(() => {
    loadGameData();
    // Reload game data when the gameId changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);

  const { fields } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "players", // unique name for your Field Array
    rules: {
      maxLength: 4, // maximum number of players
      minLength: 3, // minimum number of players
    },
  });

  const router = useRouter();
  const onSubmit = async (data: GameType) => {
    const gamedata = await updateGameData(Number(gameId), data);
    if (gamedata) {
      router.replace({
        pathname: "/(game)/[gameId]",
        params: { gameId: gamedata.gameId.toString() },
      });
    }
  };

  return (
    <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={20}>
      <SafeAreaView>
        <View
          className="flex-row items-center justify-between"
          style={{ paddingTop: 20 }}
        >
          <Pressable
            onPress={() =>
              router.replace({
                pathname: "/(game)/[gameId]",
                params: { gameId: gameId.toString() },
              })
            }
            style={{
              marginLeft: 20,
              padding: 5,
              borderRadius: 20,
              backgroundColor: "#fff2",
            }}
          >
            <Ionicons name="chevron-back-outline" size={24} color="#ffffff" />
          </Pressable>
          <Text className="text-white text-2xl font-righteous flex-1 text-center">
            Edit Game
          </Text>
          <Pressable
            style={{
              marginRight: 20,
              padding: 5,
              borderRadius: 20,
              backgroundColor: "#fff2",
            }}
          >
            <MaterialIcons
              name="delete-outline"
              size={24}
              color={Colors.dark.tint}
            />
          </Pressable>
        </View>
        <ScrollView>
          <View className="flex-1 p-7 flex flex-col gap-4">
            <Text className="text-lg font-outfit text-white">Game Name</Text>
            <Controller
              control={control}
              name="gameName"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextInput
                  className="px-6 py-4 text-lg font-outfit text-white bg-white/10 rounded-lg"
                  maxLength={40}
                  placeholder="Game Name.."
                  placeholderTextColor="#fff5"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  returnKeyType="done"
                  style={{
                    borderColor: error ? "red" : "transparent",
                    borderWidth: error ? 1 : 0,
                  }}
                />
              )}
            />

            <View className="flex flex-row gap-4 items-center justify-between">
              <View className="flex-1 gap-4">
                <Text className="text-lg font-outfit text-white">
                  Target Score
                </Text>
                <Controller
                  control={control}
                  name="targetScore"
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <TextInput
                      className="px-6 py-4 text-lg font-outfit text-white bg-white/10 rounded-lg"
                      placeholder="Target Score.."
                      placeholderTextColor="#fff5"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value.toString()}
                      keyboardType={
                        Platform.OS === "android" ? "numeric" : "number-pad"
                      }
                      style={{
                        borderColor: error ? "red" : "transparent",
                        borderWidth: error ? 1 : 0,
                      }}
                      returnKeyType="done"
                    />
                  )}
                />
              </View>

              <View className="flex-1 gap-4">
                <Text className="text-lg font-outfit text-white">
                  Round Score
                </Text>
                <Controller
                  control={control}
                  name="maxRoundScore"
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <TextInput
                      readOnly
                      className="px-6 py-4 text-lg font-outfit text-white bg-white/10 rounded-lg"
                      placeholder="Round Score.."
                      placeholderTextColor="#fff5"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value.toString()}
                      keyboardType={
                        Platform.OS === "android" ? "numeric" : "number-pad"
                      }
                      style={{
                        borderColor: error ? "red" : "transparent",
                        borderWidth: error ? 1 : 0,
                      }}
                      returnKeyType="done"
                    />
                  )}
                />
              </View>
            </View>

            <Text className="text-lg font-outfit text-white">Players</Text>
            <View className="flex flex-col gap-4">
              {fields.map((field, index) => (
                <View
                  key={field.id}
                  className="flex flex-row items-center justify-between gap-4 bg-white/10 rounded-lg"
                >
                  <Controller
                    control={control}
                    name={`players.${index}.name`}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <TextInput
                        className="flex-1 px-6 py-4 text-lg rounded-lg font-outfit text-white"
                        placeholder={`Player ${index + 1} Name..`}
                        placeholderTextColor="#fff5"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        returnKeyType="done"
                        style={{
                          borderColor: error ? "red" : "transparent",
                          borderWidth: error ? 1 : 0,
                        }}
                      />
                    )}
                  />
                </View>
              ))}
            </View>

            <Pressable
              android_ripple={{
                color: "#00000022",
                foreground: true,
              }}
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
            >
              <Text
                className="font-outfit-bold"
                style={{
                  fontSize: 18,
                  color: Colors.dark.paper,
                }}
              >
                Update
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    backgroundColor: Colors.dark.text,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Update;
