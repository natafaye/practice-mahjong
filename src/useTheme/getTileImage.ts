import type { MahjongTile } from "../types";
import type { TileImages } from "./types";

export const getTileImage = (tile: MahjongTile, tileImages: TileImages): string => {
    if(tile.number === undefined) return tileImages[tile.suit] as string
    const suitImages = tileImages[tile.suit] as { [property: number | string]: string }
    return suitImages[tile.number]
}