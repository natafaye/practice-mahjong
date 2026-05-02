import { GAME_OVER } from "../../constants";
import type { MahjongGameData } from "../../types";
import { discardTile } from "../actions/discardTile";
import { drawTileFromWall } from "../actions/drawTileFromWall";
import { makeJokerSwap } from "../actions/makeJokerSwap";
import { doAICalls } from "./doAICalls";
import { lookForJokerSwap } from "./lookForJokerSwap";
import { pickDiscardIndexes } from "./pickDiscardIndexes";

/**
 * Take an AI player's turn (draw, joker swap, discard)
 *
 * This function calls the doAICalls function which can start a temporary recursive loop
 * while AI players take their turns and call on each other's turns and the human player
 * doesn't get a chance to do anything for a little while, but it shouldn't be endless
 */
export const doAITurn = (state: MahjongGameData, shouldDraw: boolean = true): MahjongGameData => {
  let nextState = state;
  const { currentPlayer, gameState } = state;
  // If the game's over, we're done here
  if (gameState === GAME_OVER) return state;
  // Draw a tile if we should
  if(shouldDraw)
    nextState = drawTileFromWall(nextState, { playerIndex: currentPlayer });
  // Look for any joker swaps
  let jokerSwapInfo = lookForJokerSwap(nextState.players, currentPlayer);
  while (jokerSwapInfo) {
    nextState = makeJokerSwap(nextState, jokerSwapInfo);
    jokerSwapInfo = lookForJokerSwap(nextState.players, currentPlayer);
  }
  // Discard a tile
  const discardIndexes = pickDiscardIndexes(nextState.players[currentPlayer], 1, state);
  nextState = discardTile(nextState, {
    playerIndex: nextState.currentPlayer,
    tileIndex: discardIndexes[0],
  });
  // Do any AI calls on that discarded tile
  nextState = doAICalls(nextState);
  return nextState;
};
