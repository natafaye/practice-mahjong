import type { MahjongTile } from "../../types";
import { DOTS, FLOWER_SUIT, JOKER_SUIT, WIND_SUIT, WINDS } from "../../constants";

export const createJoker = () => createTile(JOKER_SUIT);

export const createFlower = () => createTile(FLOWER_SUIT);

export const createTile = (suit: string, number?: string | number): MahjongTile => ({
  id: Math.random().toString(36).substring(7),
  suit,
  number,
});

export const createMeld = (suit: string, chars: string): MahjongTile[] => 
  chars.split("").map((c) => {
    if (c === "F") return createFlower();
    if (c === "J") return createJoker();
    if (c === "0") return createTile(DOTS, "D");
    if (WINDS.includes(c)) return createTile(WIND_SUIT, c)
    return createTile(suit, c);
  });