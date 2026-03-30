import { GAP, type MahjongTile, type MahjongTileRow } from "../types"
import { JOKER_SUIT } from "./generateTiles"

export const getJokerSwapIndex = (swapTile: MahjongTile, exposedTiles: MahjongTileRow) => {
    // Can't do a joker swap with a joker
    if(swapTile.suit === JOKER_SUIT) return -1
    // Break the row into sets
    const allSets = exposedTiles.reduce((sets, tile) => {
        (tile === GAP) ? sets.push([]) : sets.at(-1)!.push(tile)
        return sets
    }, [[]] as MahjongTile[][])
    // Find a set with a joker and matching tile to the swapTile (meaning the joker is representing that tile)
    const setToReplace = allSets.find(set => 
        set.some(tile => tile.suit === JOKER_SUIT) && 
        set.some(tile => tile.suit === swapTile.suit && tile.number === swapTile.number)
    )
    // If we didn't find anything, no joker swap available
    if(!setToReplace) return -1
    // If we did find it, return the index of that joker in the exposed tiles
    const joker = setToReplace.find(tile => tile.suit === JOKER_SUIT)!
    return exposedTiles.indexOf(joker)
}