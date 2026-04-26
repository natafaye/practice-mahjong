import { generateTiles } from "./generateTiles";
import { sortTiles } from "../../_shared";
import type { MahjongGameData, MahjongPlayer, MahjongTile } from "../../types";
import { CHARLESTONS, DRAWING, GAPS, SUIT_ORDER, THIS_PLAYER } from "../../constants";
import { shuffleArray } from "./shuffleArray";
import { Chance } from "chance";

export const generateInitialData = (
  numberOfPlayers: number = 4,
  cardName: string,
  gameSeed?: string,
): MahjongGameData => {
  // Use the provided seed or generate one
  const seed = gameSeed || crypto.randomUUID();
  // Generate and shuffle the wall
  const wall = shuffleArray(generateTiles(), seed);
  // Pick the starting player (dealer) randomly
  const startingPlayer = new Chance(seed).integer({ min: 0, max: numberOfPlayers - 1 })

  // Deal out the hands
  const players: MahjongPlayer[] = [];
  for (let i = 0; i < numberOfPlayers; i++) {
    players.push({
      index: i,
      concealed: wall.splice(0, 13),
      exposed: [],
    });
  }

  // Give the starting player (dealer) one more tile
  players[startingPlayer].concealed.push(wall.pop()!)

  // Sort this player's hand and add gaps after each one
  const concealed = players[THIS_PLAYER].concealed as MahjongTile[];
  concealed.sort(sortTiles);
  let gapIndex = 0;
  players[THIS_PLAYER].concealed = SUIT_ORDER.flatMap((suit) => [
    GAPS[gapIndex++],
    ...concealed.filter((t) => t.suit === suit),
  ]);

  return {
    seed,
    currentPlayer: startingPlayer,
    players,
    wall,
    discard: [],
    melding: [],
    passing: players.map(() => []),
    readyToPass: players.map(() => false),
    gameState: numberOfPlayers !== 2 ? CHARLESTONS[0] : DRAWING,
    cardName,
  };
};
