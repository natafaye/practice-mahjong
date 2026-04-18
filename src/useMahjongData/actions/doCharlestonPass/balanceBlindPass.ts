import { OVER } from "../../../constants"
import type { MahjongTile } from "../../../types"
import { getGiveToIndex } from "./getGiveToIndex"

/**
 * Balance Blind Pass so everyone receives as many as they initially gave
 * If a player passes less than 3, they take the difference from what was passed to them
 * Only works for LEFT and RIGHT passes, since there are no blind OVER passes
 * (Mutates passing array directly)
 */
export const balanceBlindPass = (passing: MahjongTile[][], direction: string) => {
  // Can't do an OVER as a balance pass (only as a courtesy pass)
  if(direction === OVER) return
  // Have to start at an index with highest amount passed so we don't run out of extras
  const originalPassLengths = passing.map(tiles => tiles.length)
  const maxPassed = Math.max(...originalPassLengths)
  const startIndex = originalPassLengths.indexOf(maxPassed)
  let takeFromIndex = startIndex; 
  do {
    const giveToIndex = getGiveToIndex(direction, takeFromIndex, passing.length)
    // If giveTo player didn't pass max, take from the tiles passed to them and pass on blindly
    const amountToTake = maxPassed - originalPassLengths[giveToIndex]
    const blindPass = amountToTake === 0 ? [] : passing[takeFromIndex].splice(-amountToTake)
    passing[giveToIndex].push(...blindPass)
    takeFromIndex = giveToIndex
  } while (takeFromIndex !== startIndex)
}