import { GAME_OVER } from "../../constants";
import { getHandsData, putInHandOrder } from "../../_shared";
import { findBestHand } from "../../_shared/findBestHand";
import type { MahjongGameData, MahjongPlayer } from "../../types";

/**
 * Checks for a game win by the current player and returns any updated parts of state
 * Designed to be spread at the end of a state update to overwrite anything affected by game win
 */
export const handleGameWin = (state: MahjongGameData, newPlayers: MahjongPlayer[]): Partial<MahjongGameData> => {
  const handsData = getHandsData(state.cardName);
  const currentPlayer = newPlayers[state.currentPlayer];
  const bestHand = findBestHand(currentPlayer, handsData.hands);
  console.log(bestHand)
  if (bestHand.matches === 14) {
    currentPlayer.exposed = putInHandOrder(currentPlayer, bestHand.hand);
    currentPlayer.concealed = [];
    return {
      gameState: GAME_OVER,
      winningPlayer: state.currentPlayer,
      winningHand: bestHand.hand.id,
      players: newPlayers,
      melding: []
    };
  }
  return {};
};
