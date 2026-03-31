import type { MahjongTile } from "../../types";
import { FLOWER_SUIT, JOKER_SUIT } from "../generateTiles";

export const createJoker = () => createTile(JOKER_SUIT);

export const createFlower = () => createTile(FLOWER_SUIT);

export const createTile = (suit: string, number?: string | number): MahjongTile => ({
  id: Math.random().toString(36).substring(7),
  suit,
  number,
});