import type { MahjongTileRow } from "../types";
import { convertTileToCharacter } from "./utilities";

type MeldData = {
  numbers: string,
  suit: string
  startIndex: number
  endIndex: number
}

/**
 * Get the exposed melds in a way that matches MahjongHands
 */
export const getExposedMelds = (exposedTiles: MahjongTileRow): MeldData[] => {
  let currentMeld = {
    numbers: "",
    suit: "",
    character: "",
    startIndex: 0,
    endIndex: 0,
  };
  const exposedMelds = [] as Array<typeof currentMeld>;
  exposedTiles.forEach((tile, index) => {
    if (typeof tile !== "string") {
      let char = convertTileToCharacter(tile);
      if (char === "J") {
        char = currentMeld.character;
      } else {
        currentMeld.character = char;
        currentMeld.suit = tile.suit;
      }
      currentMeld.numbers += char;
    } else {
      currentMeld.endIndex = index;
      exposedMelds.push(currentMeld);
      currentMeld = {
        numbers: "",
        suit: "",
        character: "",
        startIndex: index + 1,
        endIndex: index + 1,
      };
    }
  });
  return exposedMelds;
};