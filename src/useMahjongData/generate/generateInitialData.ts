import { generateTiles } from "./generateTiles"
import { sortTiles } from "../../_shared"
import type { MahjongGameData, MahjongPlayer, MahjongTile } from "../../types"
import { CHARLESTONS, DRAWING, GAPS, SUIT_ORDER, THIS_PLAYER } from "../../constants"
import { shuffleArray } from "./shuffleArray"

export const generateInitialData = (numberOfPlayers: number = 4, cardName: string): MahjongGameData => {
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
        passing: players.map(() => []),
        readyToPass: players.map(() => false),
        gameState: numberOfPlayers !== 2 ? CHARLESTONS[0] : DRAWING,
        cardName
    }
}
