import Joi from "joi";

/**
 * Fields for creating a new game.
 * gameIcon: Icon for the game
 * gameId: Unique identifier for the game
 * gameName: Game Name
 * players: List of Players
 * players[].id: Unique identifier for the player
 * players[].name: Name of the player
 * maxRoundScore: Maximum Score for a round
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
const GameSchema = Joi.object<GameType>({
  gameIcon: Joi.string().label("Icon").required(),
  gameId: Joi.number(),
  gameName: Joi.string().label("Game Name").max(40).required(),
  players: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().required(),
        name: Joi.string().max(20).required(),
      })
    )
    .min(3)
    .max(4)
    .required(),
  maxRoundScore: Joi.number().min(0).required(),
  targetScore: Joi.number().min(0).required(),
  isCompleted: Joi.boolean().default(false),
  createdAt: Joi.date().default(() => new Date()),
  rounds: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().required(),
        scores: Joi.array()
          .items(
            Joi.object({
              playerId: Joi.number().required(),
              score: Joi.number().min(0).required(),
            })
          )
          .required(),
      })
    )
    .default([]),
});

export type GameType = {
  gameIcon: string;
  gameId: number;
  gameName: string;
  players: {
    id: number;
    name: string;
  }[];
  maxRoundScore: number;
  targetScore: number;
  isCompleted: boolean;
  createdAt: Date;
  rounds: {
    id: number;
    scores: {
      playerId: number;
      score: number;
    }[];
  }[];
};

export default GameSchema;
