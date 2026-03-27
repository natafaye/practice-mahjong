import type { MahjongData } from "../types"
import { generateTiles } from "./generateTiles"
import { shuffleArray } from "./shuffleArray"

export const generateInitialData = (numberOfPlayers: number = 4): MahjongData => {
    const wall = generateTiles()
    shuffleArray(wall)

    const hands = []
    for(let i = 0; i < numberOfPlayers; i++) {
        hands.push({ 
            unexposed: wall.splice(0, 13), 
            exposed: [] 
        })
    }

    return {
        hands,
        wall,
        discard: []
    }
}