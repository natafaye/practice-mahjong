import { JOKER_SUIT } from "../../../constants";
import type { MahjongTile } from "../../../types";

/**
 * Add 3 tiles from the wall to the passing array
 * Don't allow jokers in the passed tiles
 */
export const addWallPass = (passing: MahjongTile[][], newWall: MahjongTile[]) => {
  const wallPass = [];
  let index = 0;
  while (wallPass.length < 3) {
    if (newWall[index].suit !== JOKER_SUIT)
      wallPass.push(...newWall.splice(index, 1));
    else
      index++;
  }
  passing.push(wallPass);
};
