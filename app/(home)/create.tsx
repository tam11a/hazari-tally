import { Colors } from "@/constants/Colors";
import GameSchema, { GameType } from "@/constants/Schema";
import useGameData from "@/hooks/useGameData";
import { Feather } from "@expo/vector-icons";
import { joiResolver } from "@hookform/resolvers/joi";
import { useRouter } from "expo-router";
import React from "react";
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

/**
 * Fields for creating a new game.
 * gameIcon: Icon for the game
 * gameId: Unique identifier for the game
 * gameName: Game Name
 * players: List of Players
 * players[].id: Unique identifier for the player
 * players[].name: Name of the player
 * maxPlayers: Maximum Players
 * maxScore: Maximum Score
 * targetScore: Target Score
 * isCompleted: Whether the game is completed
 * createdAt: Timestamp of creation
 * rounds: List of Rounds
 * rounds[].id: Unique identifier for the round
 * rounds[].scores: List of scores for the round
 * rounds[].scores[].playerId: Player identifier
 * rounds[].scores[].score: Score for the player in that round
 *
 */

export const GameIcons = ["spades", "clubs", "hearts", "diamonds"];

const Create = () => {
  const { handleSubmit, control, getValues } = useForm<GameType>({
    resolver: joiResolver(GameSchema),
    defaultValues: {
      gameIcon: GameIcons[Math.floor(Math.random() * GameIcons.length)],
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

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "players", // unique name for your Field Array
    rules: {
      maxLength: 4, // maximum number of players
      minLength: 3, // minimum number of players
    },
  });

  const { addGameData } = useGameData();
  const router = useRouter();
  const onSubmit = async (data: GameType) => {
    const gamedata: GameType | undefined = await addGameData(data);
    if (gamedata) {
      router.push({
        pathname: "/(game)/[gameId]",
        params: { gameId: gamedata.gameId.toString() },
      });
    }
  };

  return (
    <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={20}>
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
                {fields.length > 3 && (
                  <Pressable
                    android_ripple={{
                      color: "#00000022",
                      foreground: true,
                    }}
                    className="mr-4"
                    onPress={() => remove(index)}
                  >
                    <Feather
                      name="x"
                      size={24}
                      color={Colors.dark.tabIconSelected}
                    />
                  </Pressable>
                )}
              </View>
            ))}
            {fields?.length < 4 && (
              <Pressable
                android_ripple={{
                  color: "#00000022",
                  foreground: true,
                }}
                style={styles.button}
                onPress={() => {
                  append({
                    id: (getValues("players")[fields.length - 1]?.id || 0) + 1,
                    name: "",
                  });
                }}
              >
                <Text
                  className="font-outfit-bold"
                  style={{
                    fontSize: 18,
                    color: Colors.dark.paper,
                  }}
                >
                  Add Player
                </Text>
              </Pressable>
            )}
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
              Start
            </Text>
          </Pressable>
        </View>
      </ScrollView>
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

export default Create;
