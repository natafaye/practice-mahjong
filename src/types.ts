import type { EXPOSED_GAP, GAME_STATES, GAPS, PASSING_GAPS } from "./constants";

/**
 * TERMINOLOGY
 *
 * Tile = F
 * Row = FF 134 667 59 NWWS J
 * Meld = FFF
 * Hand = FFF 123 444 55 666
 */

// One tile
export type MahjongTile = {
  suit: string;
  number?: number | string;
  id: string;
};

export type MahjongGap = (typeof GAPS)[number] | (typeof PASSING_GAPS)[number] | typeof EXPOSED_GAP

// A row of tiles
export type MahjongTileRow = Array<MahjongTile | MahjongGap>;

// A player with exposed and concealed tiles
export type MahjongPlayer = {
  index: number;
  exposed: MahjongTileRow;
  concealed: MahjongTileRow;
};

// A size (used for racks and tiles and buttons)
export type Size = "sm" | "md" | "lg";

// A specific meld
export type MahjongHandMeld = {
  numbers: string[];
  suit: "G" | "R" | "B";
};

// A winning hand made up of melds
export type MahjongHand = {
  section: string;
  melds: MahjongHandMeld[];
  text: string;
  value: number;
  concealed: boolean;
};

export type MahjongCard = {
  name: string;
  hands: MahjongHand[];
}

// All the hands and calculated data from those hands
export type MahjongHandsData = {
  name: string;
  hands: MahjongHand[];
  sections: string[];
  melds: string[];
  callableMelds: string[];
};

// A particular state of the game (like PLAYING or MELDING)
export type GameState = (typeof GAME_STATES)[number];

// All the data for the game
export type MahjongGameData = {
  currentPlayer: number;
  players: MahjongPlayer[];
  wall: MahjongTile[];
  discard: MahjongTile[];
  melding: MahjongTile[];
  passing: MahjongTile[][];
  readyToPass: boolean[];
  gameState: GameState;
  handsData: MahjongHandsData;
};
