import { CHARLESTONS, DRAWING, NORMAL_PASS } from "../../constants";
import type { MahjongGameData } from "../../types";
import { doCharlestonPass } from "../doCharlestonPass";

type Payload = { 
  playerIndex: number 
}

export const markReadyToPass = (state: MahjongGameData, { playerIndex } : Payload) => {
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
  if (!readyToPass.every((ready) => ready)) return { ...state, readyToPass };
  // Else make the pass
  const { newPlayers, newWall } = doCharlestonPass(state);
  return {
    ...state,
    players: newPlayers,
    wall: newWall,
    passing: state.players.map(() => []),
    readyToPass: state.players.map(() => false),
    gameState: CHARLESTONS[CHARLESTONS.indexOf(state.gameState) + 1] || DRAWING,
  };
};
