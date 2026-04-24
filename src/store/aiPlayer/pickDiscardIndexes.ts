import type { MahjongGameData, MahjongPlayer } from "../../types";

export const pickDiscardIndexes = (
  player: MahjongPlayer,
  amount: number = 1,
  state: MahjongGameData,
  isAmountVariable: boolean = false,
) => {
  console.log(player, state, isAmountVariable);
  return Array.from({ length: amount }, (_, i) => i);
};
