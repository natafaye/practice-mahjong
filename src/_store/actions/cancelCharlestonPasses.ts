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

  // If this is a one-player game, we only want 24 tiles left in the wall
  let wall = state.players.length === 1 ? state.wall.slice(0, 24) : state.wall

  // Finish passing and switch to playing
  return {
    ...nextState,
    wall,
    passing: state.players.map(() => []),
    readyToPass: state.players.map(() => false),
    gameState: PLAYING,
  };
};
