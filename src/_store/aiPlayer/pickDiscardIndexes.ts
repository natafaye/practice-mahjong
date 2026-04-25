import { Chance } from "chance";
import type { MahjongGameData, MahjongPlayer } from "../../types";
import { shuffleArray } from "../generate/shuffleArray";

export const pickDiscardIndexes = (
  player: MahjongPlayer,
  amount: number = 1,
  state: MahjongGameData,
  isAmountVariable: boolean = false,
) => {
  console.log(player, state, isAmountVariable);
  const indexes = shuffleArray(
    player.concealed
      .map((tile, i) => (typeof tile === "string" ? -1 : i))
      .filter((i) => i !== -1),
    new Chance(state.seed).d100().toString(),
  );
  return indexes.slice(0, amount);
};
