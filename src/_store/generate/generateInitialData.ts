import { generateTiles } from "./generateTiles";
import type { MahjongGameData, MahjongPlayer } from "../../types";
import { CHARLESTONS, PLAYING } from "../../constants";
import { shuffleArray } from "./shuffleArray";
import { Chance } from "chance";

type Payload = {
  cardName: string;
  numberOfPlayers: number;
  seed?: string;
  dealer?: number;
};

export const generateInitialData = ({ cardName, numberOfPlayers, seed, dealer }: Payload): MahjongGameData => {
  // Use the provided seed or generate one
  seed = seed || crypto.randomUUID();
  // Generate and shuffle the wall
  const wall = shuffleArray(generateTiles(), seed);
  // Pick the starting player (dealer) randomly if there isn't a provided dealer
  const startingPlayer = dealer !== undefined ? dealer : new Chance(seed).integer({ min: 0, max: numberOfPlayers - 1 });

  // Make the players (no tiles given yet)
  const players: MahjongPlayer[] = [];
  for (let i = 0; i < numberOfPlayers; i++) {
    players.push({
      index: i,
      concealed: [],
      exposed: [],
    });
  }

  return {
    seed,
    currentPlayer: startingPlayer,
    players,
    wall,
    discard: [],
    melding: [],
    passing: players.map(() => []),
    readyToPass: players.map(() => false),
    gameState: numberOfPlayers !== 2 ? CHARLESTONS[0] : PLAYING,
    cardName,
  };
};
