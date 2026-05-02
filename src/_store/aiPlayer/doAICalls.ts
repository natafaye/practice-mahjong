import { DISCARD, THIS_PLAYER } from "../../constants";
import type { MahjongGameData } from "../../types";
import { addToPlayerMeld } from "../actions/addToPlayerMeld";
import { confirmPlayerMeld } from "../actions/confirmPlayerMeld";
import { callDiscard } from "../actions/callDiscard";
import { skipDiscardTile } from "../actions/skipDiscardTile";
import { doAITurn } from "./doAITurn";
import { wantDiscard } from "./wantDiscard";

/**
 * Do AI calling checks until an AI picks up the discard or it's the human player's turn to call
 *
 * This function can call the doAITurn function which can start a temporary recursive loop
 * while AI players take their turns and call on each other's turns and the human player
 * doesn't get a chance to do anything for a little while, but it shouldn't be endless
 */
export const doAICalls = (state: MahjongGameData) => {
  let nextState = state;
  // While we're on an AI player calling, check if they want to call the discard
  while (nextState.gameState === DISCARD && nextState.callingPlayer !== undefined && nextState.callingPlayer !== THIS_PLAYER) {
    // If they want the discard, call it, meld it as planned, and do that AI's turn
    const meldPlan = wantDiscard(nextState.players[nextState.callingPlayer], nextState);
    if (meldPlan) {
      nextState = callDiscard(nextState, { playerIndex: nextState.callingPlayer });
      nextState = addToPlayerMeld(nextState, {
        playerIndex: nextState.callingPlayer!,
        tileIndexes: meldPlan.tileIndexes,
      });
      nextState = confirmPlayerMeld(nextState, { playerIndex: nextState.callingPlayer! });
      // Do their turn, but without the draw at the beginning
      return doAITurn(nextState, false);
    }
    // Else skip and let the next player decide whether or not to call
    nextState = skipDiscardTile(nextState, { playerIndex: nextState.callingPlayer });
  }
  // If we got through all the calling players, and it's not the human's turn, then it's the AI's turn
  if (nextState.callingPlayer === undefined && nextState.currentPlayer !== THIS_PLAYER) {
    return doAITurn(nextState);
  }
  // If not then it's the human's turn to decide whether or not to call
  return nextState;
};
