import type { MahjongTile, MahjongTileRow } from "../types"
import { JOKER_SUIT } from "../constants"

export const getJokerSwapIndex = (swapTile: MahjongTile, exposedTiles: MahjongTileRow) => {
    // Can't do a joker swap with a joker
    if(swapTile.suit === JOKER_SUIT) return -1
    // Break the row into melds
    const allMelds = exposedTiles.reduce((meld, tile) => {
        if(typeof tile === "string") meld.push([])
        else meld.at(-1)!.push(tile)
        return meld
    }, [[]] as MahjongTile[][])
    // Find a set with a joker and matching tile to the swapTile (meaning the joker is representing that tile)
    const meldToReplace = allMelds.find(meld => 
        meld.some(tile => tile.suit === JOKER_SUIT) && 
        meld.some(tile => tile.suit === swapTile.suit && tile.number === swapTile.number)
    )
    // If we didn't find anything, no joker swap available
    if(!meldToReplace) return -1
    // If we did find it, return the index of that joker in the exposed tiles
    const joker = meldToReplace.find(tile => tile.suit === JOKER_SUIT)!
    return exposedTiles.indexOf(joker)
}