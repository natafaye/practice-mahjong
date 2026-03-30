import type { MahjongTile } from "../../types";
import { FLOWERS, JOKER_SUIT } from "../generateTiles";

export const createJoker = () => createTile(JOKER_SUIT);

export const createFlower = () => createTile(FLOWERS[0]);

export const createTile = (suit: string, number?: string | number): MahjongTile => ({
  id: Math.random().toString(36).substring(7),
  suit,
  number,
});