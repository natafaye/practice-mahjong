import { DRAWING, type MahjongData } from "../types"
import { generateTiles } from "./generateTiles"
import { sortTiles } from "./sortTiles"

export const THIS_PLAYER = 0

export const generateInitialData = (numberOfPlayers: number = 4): MahjongData => {
    const wall = generateTiles()
    shuffleArray(wall)

    const players = []
    for(let i = 0; i < numberOfPlayers; i++) {
        players.push({ 
            index: i,
            isHuman: i === THIS_PLAYER,
            unexposed: wall.splice(0, 13), 
            exposed: [], 
        })
        if(i === THIS_PLAYER) players.at(-1)!.unexposed.sort(sortTiles)
    }

    return {
        currentPlayer: 0, //Math.floor(Math.random() * numberOfPlayers),
        players,
        wall,
        discard: [],
        melding: [],
        gameState: DRAWING
    }
}

const shuffleArray = (array: Array<any>) => {
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}