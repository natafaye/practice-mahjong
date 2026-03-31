import { DRAWING, GAP, type MahjongData, type MahjongPlayer, type MahjongTile } from "../types"
import { generateTiles } from "./generateTiles"
import { sortTiles, SUIT_ORDER } from "./sortTiles"

export const THIS_PLAYER = 0

export const generateInitialData = (numberOfPlayers: number = 4): MahjongData => {
    // Generate and shuffle the wall
    const wall = generateTiles()
    shuffleArray(wall)

    // Deal out the hands
    const players: MahjongPlayer[] = []
    for(let i = 0; i < numberOfPlayers; i++) {
        players.push({ 
            index: i,
            isHuman: i === THIS_PLAYER,
            unexposed: wall.splice(0, 13), 
            exposed: [], 
        })
    }

    // Sort this player's hand and add gaps
    const unexposed = players[THIS_PLAYER].unexposed as MahjongTile[]
    unexposed.sort(sortTiles)
    // Loop through all the suits and add a gap on the end
    players[THIS_PLAYER].unexposed = SUIT_ORDER.flatMap(suit => [...unexposed.filter(t => t.suit === suit), GAP])

    return {
        currentPlayer: 0, //Math.floor(Math.random() * numberOfPlayers),
        players,
        wall,
        discard: [],
        melding: [],
        gameState: DRAWING
    }
}

const shuffleArray = <T>(array: Array<T>) => {
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}