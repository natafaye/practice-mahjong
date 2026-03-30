import Tile from "../Rack/Tile"
import Button from "../Button"
import { DRAWING, type GameState } from "../types"
import { THIS_PLAYER } from "../useMahjongData/generateInitialData"
import { useTheme } from "../useTheme"
import type { ActionDispatch } from "react"
import type { MahjongAction } from "../useMahjongData/useMahjongData"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"

type Props = {
    dispatch: ActionDispatch<[action: MahjongAction]>
    wallNumber: number
    gameState: GameState
    currentPlayer: number
    className?: string
}

export default function DrawSpot({ wallNumber, gameState, currentPlayer, dispatch, className }: Props) {
    const { tileLight, tileDark } = useTheme()
    const tilesToShow = Math.min(20, wallNumber)
    return (
        <div className={className}>
            <div className="flex justify-end pb-7">
                {Array.from(Array(tilesToShow).keys()).map((index) => (
                    <Tile key={index} message={wallNumber - (tilesToShow - index - 1)} />
                ))}
            </div>
            <Button className="md:w-25 text-sm md:text-base text-white"
                style={{ 
                    visibility: gameState === DRAWING && currentPlayer === THIS_PLAYER ? "visible" : "hidden",
                    backgroundColor: tileLight, 
                    borderColor: tileDark 
                }}
                onClick={() => dispatch({ type: "DRAW_FROM_WALL", payload: { playerIndex: currentPlayer } })}
            >
                <FontAwesomeIcon icon={faUpRightFromSquare} flip="vertical" className="me-1" />
                Draw
            </Button>
        </div>
    )
}