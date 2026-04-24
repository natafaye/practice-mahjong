import { DRAWING } from "../../constants";
import type { MahjongGameData } from "../../types";

export const cancelCharleston = (state: MahjongGameData): MahjongGameData => {
  return {
    ...state,
    passing: state.players.map(() => []),
    readyToPass: state.players.map(() => false),
    gameState: DRAWING,
  };
};
