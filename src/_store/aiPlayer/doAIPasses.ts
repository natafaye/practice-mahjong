import { NORMAL_PASS, THIS_PLAYER } from "../../constants";
import type { MahjongGameData } from "../../types";
import { addToPassTiles } from "../actions/addToPassTiles";
import { cancelCharlestonPasses } from "../actions/cancelCharlestonPasses";
import { markPlayerReadyToPass } from "../actions/markPlayerReadyToPass";
import { pickDiscardIndexes } from "./pickDiscardIndexes";
import { shouldAICancelCharleston } from "./shouldAICancelCharleston";

/**
 * Get all the AIs' Charleston passes ready
 * Actual Charleston passes will happen if the AIs are last to mark ready to pass
 */
export const doAIPasses = (state: MahjongGameData) => {
  let nextState = state;
  for (let playerIndex = 0; playerIndex < nextState.players.length; playerIndex++) {
    // Don't pass if it's the human player
    if (playerIndex === THIS_PLAYER) continue;
    // Add tiles to pass then mark ready to pass
    const [, type] = nextState.gameState.split("_");
    nextState = addToPassTiles(nextState, {
      playerIndex,
      tileIndexes: pickDiscardIndexes(nextState.players[playerIndex], 3, nextState, type !== NORMAL_PASS, false),
    });
    // When last AI player marks as ready to pass, the Charleston pass will happen
    nextState = markPlayerReadyToPass(nextState, { playerIndex });
  }

  // If we just entered the second charleston, check if any AI players want to stop
  if (nextState.gameState === "LEFT_N_2") {
    for (let playerIndex = 0; playerIndex < nextState.players.length; playerIndex++) {
      // Don't check for human player
      if (playerIndex === THIS_PLAYER) continue;
      // If any AI wants to cancel, then they cancel it for everyone and we can just leave this function
      if (shouldAICancelCharleston(nextState.players[playerIndex], nextState)) {
        return cancelCharlestonPasses(nextState);
      }
    }
  }

  return nextState;
};
