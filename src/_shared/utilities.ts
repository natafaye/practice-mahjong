import type { MahjongTile } from "../types";
import { DOTS, JOKER_SUIT, SUITS, WIND_SUIT } from "../constants";

/**
 * Converts a Mahjong tile to the character it would appear as in a winning hand
 */
export const convertTileToCharacter = (tile: MahjongTile) => {
  if (tile.suit === DOTS && tile.number === "D") return "0";
  if (SUITS.includes(tile.suit) || tile.suit === WIND_SUIT) return String(tile.number);
  if (tile.suit === JOKER_SUIT) return "J";
  return "F";
};

/**
 * Checks if all items in an array match or give matching results from a callback
 */
export const allMatch = <T, R>(array: T[], callback: (item: T) => R | T = (item) => item) => {
  if (array.length === 0 || array.length === 1) return true;
  const first = callback(array[0]);
  return array.every((item) => callback(item) === first);
};

/**
 * Gets all permutations of an array in all possible orders
 */
export const getAllPermutations = <T>(fullArray: T[]) => {
  const result: T[][] = [];

  const permute = (arr: T[], m: T[] = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice();
        const next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(fullArray);

  return result;
};