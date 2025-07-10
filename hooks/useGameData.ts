import { GameType } from "@/constants/Schema";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 *
 * @returns addGameData, getGameData, getAllGameData, deleteGameData, updateGameData
 */
export default function useGameData() {
  // Function to add game data
  const addGameData = async (
    gameData: GameType
  ): Promise<GameType | undefined> => {
    try {
      // Get existing game history from AsyncStorage
      const existingGames = JSON.parse(
        (await AsyncStorage.getItem("gameHistory")) || "[]"
      ) as GameType[];

      // Generate a new game ID from the sorted list last game ID number and add 1
      const lastGameId = existingGames
        .map((game) => game.gameId)
        .sort((a, b) => a - b)
        .pop();

      // If there are no existing games, start with gameId 1
      gameData.gameId = lastGameId ? lastGameId + 1 : 1;

      // Add the new game data to the existing games
      existingGames.push(gameData);

      // Save the updated game history back to AsyncStorage
      await AsyncStorage.setItem("gameHistory", JSON.stringify(existingGames));

      return gameData;
    } catch (error) {
      console.error("Error adding game data:", error);
    }
  };

  // Function to get game data by ID
  const getGameData = async (gameId: number): Promise<GameType | null> => {
    try {
      // Get all game data
      const allGames = JSON.parse(
        (await AsyncStorage.getItem("gameHistory")) || "[]"
      ) as GameType[];

      // Find the game by ID
      const gameData = allGames.find((game) => game.gameId === gameId);
      return gameData || null;
    } catch (error) {
      console.error("Error getting game data:", error);
      return null;
    }
  };

  // Function to get all game data
  const getAllGameData = async (): Promise<GameType[]> => {
    // Logic to get all game data
    return JSON.parse(
      (await AsyncStorage.getItem("gameHistory")) || "[]"
    ) as GameType[];
  };

  // Function to delete game data by ID
  const deleteGameData = async (gameId: number): Promise<void> => {
    try {
      // Get all game data
      const allGames = JSON.parse(
        (await AsyncStorage.getItem("gameHistory")) || "[]"
      ) as GameType[];

      // Filter out the game to be deleted
      const updatedGames = allGames.filter((game) => game.gameId !== gameId);

      // Save the updated game history back to AsyncStorage
      await AsyncStorage.setItem("gameHistory", JSON.stringify(updatedGames));
    } catch (error) {
      console.error("Error deleting game data:", error);
    }
  };

  // Function to update game data
  const updateGameData = async (
    gameId: number,
    updatedData: Partial<GameType>
  ): Promise<GameType | undefined> => {
    try {
      // Get all game data
      const allGames = JSON.parse(
        (await AsyncStorage.getItem("gameHistory")) || "[]"
      ) as GameType[];

      // Find the index of the game to be updated
      const gameIndex = allGames.findIndex((game) => game.gameId === gameId);

      if (gameIndex !== -1) {
        // Update the game data
        allGames[gameIndex] = {
          ...allGames[gameIndex],
          ...updatedData,
        };

        // Save the updated game history back to AsyncStorage
        await AsyncStorage.setItem("gameHistory", JSON.stringify(allGames));
        return allGames[gameIndex];
      }
    } catch (error) {
      console.error("Error updating game data:", error);
    }
  };

  return {
    addGameData,
    getGameData,
    getAllGameData,
    deleteGameData,
    updateGameData,
  };
}
