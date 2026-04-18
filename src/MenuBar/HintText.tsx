import { CHARLESTONS, DISCARD, DRAWING, GAME_OVER, MELDING, PLAYING, THIS_PLAYER } from "../constants"
import type { GameState } from "../types"
import useMahjongData from "../useMahjongData"

const gameStateText: Record<GameState, string> = {
    ["RIGHT_N_1"]: "Pick 3 tiles for first Right Pass",
    ["OVER_N_1"]: "Pick 3 tiles for first Over Pass",
    ["LEFT_B_1"]: "Pick up to 3 tiles for first Left Pass",
    ["LEFT_N_2"]: "Pick 3 tiles for second Left Pass",
    ["OVER_N_2"]: "Pick 3 tiles for second Over Pass",
    ["RIGHT_B_2"]: "Pick up to 3 tiles for second Right Pass",
    ["OVER_C_3"]: "Pick up to 3 tiles for the Courtesy Pass",
    [DRAWING]: "Draw a tile from the wall",
    [PLAYING]: "Pick a tile to discard",
    [DISCARD]: "Call the discard or skip",
    [MELDING]: "Add tiles to complete the meld",
    [GAME_OVER]: "✨ You won! ✨",
}

export default function HintText() {
    const { gameState, currentPlayer } = useMahjongData()
    const isAITurn = !CHARLESTONS.includes(gameState)
        && gameState !== DISCARD
        && gameState !== MELDING
        && currentPlayer !== THIS_PLAYER
    return (
        <p className="shrink font-sans min-w-0 opacity-80 truncate px-3 text-sm md:text-lg">
            {isAITurn ? gameState === GAME_OVER ? "You lost." : "Waiting for other players..." : gameStateText[gameState]}
        </p>
    )
}