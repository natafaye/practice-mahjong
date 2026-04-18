import { JOKER_SUIT } from "../../constants";
import type { MahjongGameData } from "../../types";
import { clonePlayers } from "./clonePlayers";
import { handleGameWin } from "./handleGameWin";

type Payload = {
  sourcePlayerIndex: number;
  sourceTileIndex: number;
  targetPlayerIndex: number;
  targetTileIndex: number;
};

export const swapJoker = (state: MahjongGameData, payload: Payload) => {
  const { sourcePlayerIndex, sourceTileIndex, targetPlayerIndex, targetTileIndex } = payload;
  // You can only swap on your own turn
  if (sourcePlayerIndex !== state.currentPlayer) return state;
  // Get the swapping tiles
  const swapTile = state.players[sourcePlayerIndex].concealed[sourceTileIndex];
  const joker = state.players[targetPlayerIndex].exposed[targetTileIndex];
  // You can't swap a Gap
  if (typeof swapTile === "string" || typeof joker === "string") return state;
  // If it's not a joker, we can't make the swap
  if (joker.suit !== JOKER_SUIT) return state;
  // Swap the joker and the swapping tile
  const newPlayers = clonePlayers(state);
  newPlayers[sourcePlayerIndex].concealed.splice(sourceTileIndex, 1, joker);
  newPlayers[targetPlayerIndex].exposed.splice(targetTileIndex, 1, swapTile);
  return {
    ...state,
    players: newPlayers,
    // Check for a win
    ...handleGameWin(state, newPlayers),
  };
};
