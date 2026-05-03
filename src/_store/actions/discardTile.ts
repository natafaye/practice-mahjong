import { DISCARD, DRAWING, GAME_OVER, GAPS, PLAYING, THIS_PLAYER } from "../../constants";
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
  // If there's a gap missing (replaced by the drawn tile) then put it back in
  if (playerIndex === THIS_PLAYER) {
    const missingGap = GAPS.find((gap) => !concealed.includes(gap));
    if (missingGap) concealed.unshift(missingGap);
  }
  let nextState: MahjongGameData = {
    ...state,
    players: newPlayers,
    discard: [...state.discard, discardedTile],
    gameState: DISCARD,
    callingPlayer: (state.currentPlayer + 1) % state.players.length
  }
  // If this is a one player game, no calling happens and we need to check for game over
  if(state.players.length === 1) {
    // If we're out of tiles then the game is over
    if(state.wall.length === 0) 
      return { ...nextState, gameState: GAME_OVER }
    // Else go to the next turn
    return {
      ...nextState,
      gameState: DRAWING,
      callingPlayer: undefined,
      currentPlayer: THIS_PLAYER
    }
  }
  return nextState
};
