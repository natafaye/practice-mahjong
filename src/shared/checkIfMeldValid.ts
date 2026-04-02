import type { MahjongTile } from "../types";
import { DOTS, FLOWER_SUIT, JOKER_SUIT } from "../constants";
import { allMatch, convertTileToCharacter } from "./utilities";

/**
 * Check if this meld of tiles is a valid meld for a Mahjong hand
 */
export const checkIfMeldValid = (meld: MahjongTile[], meldsToCheck: string[], handlePermutations: boolean = true) => {
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
    let meldCharacters = meld.map(tile => convertTileToCharacter(tile))
    // Handle jokers
    if(meldCharacters.includes("J")) {
        // If there's an invalid joker then it's not a valid meld
        if(meldCharacters.length < 3 || meldCharacters.every(c => c === "J") || !allMatch(meldCharacters.filter(c => c !== "J")))
            return false
        // Replace the jokers
        const nonJokerCharacter = meldCharacters.find(c => c !== "J")!
        meldCharacters = meldCharacters.map(_ => nonJokerCharacter)
    }
    // Check against all the possible melds (if specified, sort to handle permutations like 2025)
    const possibleMelds = handlePermutations ? meldsToCheck.map(meld => meld.split("").sort().join("")) : meldsToCheck
    return possibleMelds.includes(handlePermutations ? meldCharacters.sort().join("") : meldCharacters.join(""))
}
