import { CHARLESTONS, NORMAL_PASS } from "../../constants";
import type { MahjongGameData } from "../../types";
import { doCharlestonPass } from "./doCharlestonPass/doCharlestonPass";

type Payload = { 
  playerIndex: number 
}

/**
 * Marks this player as ready to pass
 * If that was the last player marked as ready, make the pass
 * If it's now the AI player's turn, do their turn
 */
export const markPlayerReadyToPass = (state: MahjongGameData, { playerIndex } : Payload) => {
  // Can't pass the charleston if we're not doing that right now
  if (!CHARLESTONS.includes(state.gameState)) return state;
  const [, type] = state.gameState.split("_");
  // Can't mark yourself as ready to pass if you don't have enough tiles picked
  if (type === NORMAL_PASS && state.passing[playerIndex].length < 3)
    return state;
  const readyToPass = state.readyToPass.map((ready, index) =>
    index === playerIndex ? true : ready,
  );
  // If not everyone is ready, just update the readyToPass array
  if (!readyToPass.every((ready) => ready)) 
    return { ...state, readyToPass };
  // Else make the pass
  return doCharlestonPass(state);
};
