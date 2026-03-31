import type { MahjongTile } from "../types";
import { DOTS, FLOWER_SUIT, JOKER_SUIT, SUITS, WIND_SUIT } from "./generateTiles";
import { POSSIBLE_MELDS } from "./MAHJONG_HANDS";
import { sortTiles } from "./sortTiles";

/**
 * Check if this meld of tiles is a valid meld for a Mahjong hand
 */
export const checkIfMeldValid = (meld: MahjongTile[]) => {
    // If it's too long it's not a valid meld
    if(meld.length > 6) return false
    // If there's a mixture of suits then its not a valid meld
    const tilesToCheckForSuit = meld.filter(tile =>
        // Ignore soap dragon the "0" will handle suit checking for dragon sets
        (tile.suit !== DOTS || tile.number !== "D") &&
        // Ignore jokers, we'll check for those later
        tile.suit !== JOKER_SUIT &&
        // Ignore flowers the "F" will handle suit checking
        tile.suit !== FLOWER_SUIT
    )
    if(!allMatch(tilesToCheckForSuit, tile => tile.suit))
        return false
    // Turn it into characters for easier checking
    let meldCharacters = meld.toSorted(sortTiles).map(tile => convertTileToCharacter(tile))
    // Handle jokers
    if(meldCharacters.includes("J")) {
        // If there's an invalid joker then it's not a valid meld
        if(meldCharacters.length < 3 || meldCharacters.every(c => c === "J") || !allMatch(meldCharacters.filter(c => c !== "J")))
            return false
        // Replace the jokers
        const nonJokerCharacter = meldCharacters.find(c => c !== "J")!
        meldCharacters = meldCharacters.map(_ => nonJokerCharacter)
    }
    // Check against all the possible melds (sort to handle permutations like 2025)
    return POSSIBLE_MELDS.map(meld => meld.split("").sort().join("")).includes(meldCharacters.sort().join(""))
}

/**
 * Converts a Mahjong tile to the character it would appear as in a winning hand
 */
const convertTileToCharacter = (tile: MahjongTile) => {
    if(tile.suit === DOTS && tile.number === "D") return "0"
    if(SUITS.includes(tile.suit) || tile.suit === WIND_SUIT) return String(tile.number)
    if(tile.suit === JOKER_SUIT) return "J"
    return "F"
}

/**
 * Checks if all items in an array match or give matching results from a callback
 */
const allMatch = <T, R>(array: T[], callback: (item: T) => R | T = (item) => item) => {
    if(array.length === 0 || array.length === 1) return true
    const first = callback(array[0])
    return array.every(item => callback(item) === first)
}