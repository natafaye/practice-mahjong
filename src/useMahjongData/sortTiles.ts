import type { MahjongTile } from "../types"
import { FLOWERS, JOKER_SUIT, SUITS, WIND_SUIT, WINDS } from "./generateTiles"

const SUIT_ORDER = [...FLOWERS, ...SUITS, JOKER_SUIT, WIND_SUIT]

export const sortTiles = (a: MahjongTile, b: MahjongTile) => {
    // If they're different suits, put in suit order
    if(a.suit !== b.suit) return SUIT_ORDER.indexOf(a.suit) - SUIT_ORDER.indexOf(b.suit)
    // Winds go in NEWS order
    if(a.suit === WIND_SUIT) return WINDS.indexOf(a.number as string) - WINDS.indexOf(b.number as string)
    // Flowers and jokers it doesn't much matter the order
    if(FLOWERS.includes(a.suit) || a.suit === JOKER_SUIT) return a.id < b.id ? -1 : 1
    if(a.number === "D") return 1
    if(b.number === "D") return -1
    return (a.number as number) - (b.number as number)
}