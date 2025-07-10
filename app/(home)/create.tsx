import React from "react";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

const Create = () => {
  return (
    <SafeAreaView className="flex-1 px-7">
      <TextInput
        className="px-6 py-4 text-lg font-outfit text-white bg-white/10 rounded-lg"
        maxLength={40}
        placeholder="Game Name.."
        placeholderTextColor="#fff5"
        returnKeyType="next"
      />
    </SafeAreaView>
  );
};

export default Create;
