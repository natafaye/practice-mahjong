import { sortTiles } from "../../_shared";
import { GAPS, SUIT_ORDER, THIS_PLAYER } from "../../constants";
import type { MahjongGameData, MahjongTile } from "../../types"
import { clonePlayers } from "../actions/clonePlayers";

export const dealHands = (state: MahjongGameData): MahjongGameData => {
  const wall = [...state.wall]
  const players = clonePlayers(state)

  // Deal thirteen tiles to each player
  for (const player of players) {
    player.concealed.push(...wall.splice(0, 13))
  }

  // Give the starting player (dealer) one more tile
  players[state.currentPlayer].concealed.push(wall.pop()!);

  // Sort this player's hand and add gaps after each one
  const concealed = players[THIS_PLAYER].concealed as MahjongTile[];
  concealed.sort(sortTiles);
  let gapIndex = 0;
  players[THIS_PLAYER].concealed = SUIT_ORDER.flatMap((suit) => [
    GAPS[gapIndex++],
    ...concealed.filter((t) => t.suit === suit),
  ]);

  return {
    ...state,
    players,
    wall
  }
}