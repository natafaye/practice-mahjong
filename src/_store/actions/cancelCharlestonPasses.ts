import { PLAYING, THIS_PLAYER } from "../../constants";
import type { MahjongGameData } from "../../types";
import { removeFromPassTiles } from "./removeFromPassTiles";

export const cancelCharlestonPasses = (state: MahjongGameData): MahjongGameData => {
  // Put any tiles in passing back into the player's hand
  let nextState = state;
  while(nextState.passing[THIS_PLAYER].length) {
    nextState = removeFromPassTiles(nextState, { 
      playerIndex: THIS_PLAYER, 
      passingTileIndex: 0 
    })
  }
  // Finish passing and switch to playing
  return {
    ...nextState,
    passing: state.players.map(() => []),
    readyToPass: state.players.map(() => false),
    gameState: PLAYING,
  };
};
