import type { MahjongGameData, MahjongPlayer } from "../../types";

export const wantDiscard = (player: MahjongPlayer, state: MahjongGameData): undefined | { tileIndexes: number[] } => {
  console.log(player, state);
  return undefined;
};
