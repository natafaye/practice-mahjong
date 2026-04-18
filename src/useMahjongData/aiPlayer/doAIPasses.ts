import { NORMAL_PASS, THIS_PLAYER } from "../../constants";
import type { MahjongGameData } from "../../types";
import { addToPass } from "../actions/addToPass";
import { markReadyToPass } from "../actions/markReadyToPass";
import { pickDiscardIndexes } from "./pickDiscardIndexes";

/**
 * Get all the AIs' Charleston passes ready
 */
export const doAIPasses = (state: MahjongGameData) => {
  let nextState = state;
  for (let playerIndex = 0; playerIndex < nextState.players.length; playerIndex++) {
    // Don't pass if it's the human player
    if (playerIndex === THIS_PLAYER) continue;
    // Add tiles to pass then mark ready to pass
    const [, type] = nextState.gameState.split("_");
    nextState = addToPass(nextState, {
      playerIndex,
      tileIndexes: pickDiscardIndexes(nextState.players[playerIndex], 3, nextState, type !== NORMAL_PASS),
    });
    nextState = markReadyToPass(nextState, { playerIndex });
  }
  return nextState;
};
