import { DISCARD, THIS_PLAYER } from "../../constants";
import type { MahjongGameData } from "../../types";
import { clonePlayers } from "./clonePlayers";

export const cancelPlayerMeld = (state: MahjongGameData) => {
  // Remove the tiles from the melding list and add them back to the player's tiles
  // (Only the human player can cancel a meld)
  const newPlayers = clonePlayers(state);
  newPlayers[THIS_PLAYER].concealed.unshift(...state.melding.slice(1));
  return {
    ...state,
    discard: [...state.discard, state.melding[0]],
    players: newPlayers,
    melding: [],
    gameState: DISCARD,
  };
};
