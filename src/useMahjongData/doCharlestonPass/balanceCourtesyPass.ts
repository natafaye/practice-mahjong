import { OVER } from "../../constants"
import type { MahjongTile } from "../../types"
import { getGiveToIndex } from "./getGiveToIndex"

/**
 * Balance Courtesy Pass so everyone receives as many as they initially gave
 * Only the minimum between the two passers is passed, the rest is given back
 * (Takes the earlier tiles and gives back the later tiles)
 */
export const balanceCourtesyPass = (passing: MahjongTile[][], direction: string) => {
  // Can't do a LEFT or RIGHT as a courtesy pass (only as a balance pass)
  if(direction !== OVER) return 
  // Only have to loop half the times to balance each pass because first half passes w/second half
  for(let takeFromIndex = 0; takeFromIndex < passing.length / 2; takeFromIndex++) {
    const giveToIndex = getGiveToIndex(direction, takeFromIndex, passing.length)
    const howManyToPass = Math.min(passing[giveToIndex].length, passing[takeFromIndex].length)
    // Take the extra off both sets of passing tiles (at least one will be empty)
    const extraTakeFromPlayerPassed = passing[takeFromIndex].splice(howManyToPass)
    const extraGiveToPlayerPassed = passing[giveToIndex].splice(howManyToPass)
    // Give them back to who passed them (by putting it where that player will take from)
    passing[giveToIndex].push(...extraTakeFromPlayerPassed)
    passing[takeFromIndex].push(...extraGiveToPlayerPassed)
  }
}