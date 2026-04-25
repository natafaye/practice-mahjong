import { DISCARD, GAPS, PLAYING, THIS_PLAYER } from "../../constants";
import type { MahjongGameData } from "../../types";
import { clonePlayers } from "./clonePlayers";

type Payload = {
  playerIndex: number;
  tileIndex: number;
};

export const discardTile = (state: MahjongGameData, { playerIndex, tileIndex }: Payload) => {
  // You can only discard on your own turn, during the PLAYING state
  if (playerIndex !== state.currentPlayer || state.gameState !== PLAYING) return state;
  // Get the discarded tile
  const player = state.players[playerIndex];
  const discardedTile = player.concealed[tileIndex];
  // You can't discard a Gap
  if (typeof discardedTile === "string") return state;
  // Remove the tile from the player's tiles
  const newPlayers = clonePlayers(state);
  const concealed = newPlayers[playerIndex].concealed;
  concealed.splice(tileIndex, 1);
  // If there's a gap missing (taken over by the drawn tile) then put it back in
  if (playerIndex === THIS_PLAYER) {
    const missingGap = GAPS.find((gap) => !concealed.includes(gap));
    if (missingGap) concealed.unshift(missingGap);
  }
  // Add the removed tile to the discard and go to the next turn
  return {
    ...state,
    players: newPlayers,
    discard: [...state.discard, discardedTile],
    gameState: DISCARD,
    callingPlayer: (state.currentPlayer + 1) % state.players.length,
  };
};
