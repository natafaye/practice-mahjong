import type { ExactMeld } from "../getExactMeldCombinations"

export const getCallingChance = (
  exactMelds: ExactMeld[]
) => {
  console.log(exactMelds)
  // Handle probability of calling this hand: FFF 2468 FFF 2222 (with two callable sets of flowers)
  // const chanceOfGettingToCallableByEnd = getDrawingChance(1 less than needed for this meld, everything else is miss)
  // const chanceAccessibleAtAll = numberOfWallTilesLeft / totalUnseenTiles
  // const callingChance = 0
  // for each player's turn turnNumber
  //    const chanceOfBeingCallableOnThisTurn = (turnNumber / totalPlayerTurnsLeft) * chanceOfGettingToCallableByEnd
  //    const turnsLeft = wallTilesLeft - (turnNumber * 4) or should this be more careful about this * 4??
  //    const chanceItCameOutAlready = ??????
  //    const chanceItsInOtherPlayersHand = otherPlayersConcealedTiles / totalUnseenTiles
  //    const chanceItComesOutInNext3Draws = 
  //    callingChance += chanceOfBeingCallableOnThisTurn * chanceItComesOutInNext3Draws
  return 0
}