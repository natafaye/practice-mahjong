import { DOTS, FLOWER_SUIT, WIND_SUIT, WINDS } from "../../constants";
import type { MahjongPlayer, MahjongTile, MahjongTileRow } from "../../types";
import { generateTiles } from "../../_store/generate/generateTiles";

/**
 * Convert a tile into a shorthand string key
 * Like JOKER_ and DOT_1
 */
export const tileToKey = (tile: MahjongTile) => {
  return `${tile.suit}_${tile.number ?? ""}`;
};

/**
 * Convert a character in a meld string into a shorthand string key
 * Like DOT_1 and FLOWER_ and WIND_N
 */
export const meldCharacterToKey = (meldCharacter: string, suit: string) => {
  if (meldCharacter === "0") return `${DOTS}_D`;
  if (meldCharacter === "F") return `${FLOWER_SUIT}_`;
  if (WINDS.includes(meldCharacter)) return `${WIND_SUIT}_${meldCharacter}`;
  return `${suit}_${meldCharacter}`;
};

/**
 * Get the number of tiles of each kind that are unseen
 * (either in the wall or the concealed tiles of other players)
 */
export const getUnseenTileCounts = (
  players: MahjongPlayer[],
  playerIndex: number,
  discard: MahjongTile[],
): [Map<string, number>, number] => {
  const counts = new Map<string, number>();
  let total = 0;

  // Helper function for updating the counts for an array of tiles (either adding or subtracting)
  const processTiles = (tiles: MahjongTileRow, updateAmount: 1 | -1) => {
    tiles
      .filter((tile) => typeof tile !== "string")
      .forEach((tile) => {
        const key = tileToKey(tile);
        let current = counts.get(key);
        if (current === undefined) current = 0;
        counts.set(key, current + updateAmount);
        total += updateAmount;
      });
  };

  // Add all the tiles in a deck
  processTiles(generateTiles(), 1);

  // Subtract all the discarded tiles
  processTiles(discard, -1);

  // Subtract the exposed tiles of all players and the concealed of this player
  players.forEach((player) => {
    processTiles(player.exposed, -1);
    if (player.index === playerIndex) {
      processTiles(player.concealed, -1);
    }
  });

  return [counts, total];
};
