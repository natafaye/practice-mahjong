import type { MahjongTile } from "../types"
import { FLOWER_SUIT, GAP, JOKER_SUIT, SUIT_ORDER, WIND_SUIT, WINDS } from "../constants"

/**
 * Sorts tiles based on the suit order (and the obvious number order)
 * To be used with the built in .sort() method of an array
 */
export const sortTiles = (a: MahjongTile | typeof GAP, b: MahjongTile | typeof GAP) => {
    // Sort gaps to the end
    if(typeof a === "string") return 1
    if(typeof b === "string") return -1
    // If they're different suits, put in suit order
    if(a.suit !== b.suit) return SUIT_ORDER.indexOf(a.suit) - SUIT_ORDER.indexOf(b.suit)
    // Winds go in NEWS order
    if(a.suit === WIND_SUIT) return WINDS.indexOf(a.number as string) - WINDS.indexOf(b.number as string)
    // Flowers and jokers it doesn't much matter the order
    if(a.suit === FLOWER_SUIT || a.suit === JOKER_SUIT) return a.id < b.id ? -1 : 1
    // Dragons go on the end of their suit
    if(a.number === "D") return 1
    if(b.number === "D") return -1
    // Sort normal bams, craks, and dots by number
    return (a.number as number) - (b.number as number)
}