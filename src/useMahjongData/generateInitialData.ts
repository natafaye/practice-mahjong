import { generateTiles } from "./generateTiles"
import { generateHandsData } from "./generateHandsData"
import { sortTiles } from "../shared"
import type { MahjongGameData, MahjongHand, MahjongPlayer, MahjongTile } from "../types"
import { DRAWING, GAPS, SUIT_ORDER, THIS_PLAYER } from "../constants"

export const generateInitialData = (numberOfPlayers: number = 4, hands: MahjongHand[]): MahjongGameData => {
    // Generate and shuffle the wall
    const wall = generateTiles()
    shuffleArray(wall)

    // Deal out the hands
    const players: MahjongPlayer[] = []
    for(let i = 0; i < numberOfPlayers; i++) {
        players.push({ 
            index: i,
            concealed: wall.splice(0, 13),
            exposed: [], 
        })
    }

    // Sort this player's hand and add gaps after each one
    const concealed = players[THIS_PLAYER].concealed as MahjongTile[]
    concealed.sort(sortTiles)
    let gapIndex = 0
    players[THIS_PLAYER].concealed = SUIT_ORDER.flatMap(suit => [
        GAPS[gapIndex++], ...concealed.filter(t => t.suit === suit)
    ])

    return {
        currentPlayer: 0, // Math.floor(Math.random() * numberOfPlayers),
        players,
        wall,
        discard: [],
        melding: [],
        gameState: DRAWING,
        handsData: generateHandsData(hands)
    }
}

/**
 * Shuffles an array of any type
 */
const shuffleArray = <T>(array: Array<T>) => {
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
