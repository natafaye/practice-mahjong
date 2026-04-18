import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Tile from "../Tile/Tile"
import Button from "../Button"
import { useTheme } from "../useTheme/useTheme"
import { DRAWING, THIS_PLAYER } from "../constants"
import useMahjongData from "../useMahjongData"

type Props = {
    className?: string
}

export default function DrawSpot({ className }: Props) {
    const { tileLight, tileDark } = useTheme()
    const { wall, gameState, currentPlayer, dispatch } = useMahjongData()
    const tilesToShow = Math.min(20, wall.length)
    return (
        <div className={className}>
            <div className="flex justify-end pb-5">
                {Array.from(Array(tilesToShow).keys()).map((index) => (
                    <Tile key={index} message={wall.length - (tilesToShow - index - 1)} />
                ))}
            </div>
            <Button
                className="w-25 mb-2"
                disabled={gameState !== DRAWING || currentPlayer !== THIS_PLAYER}
                colors={{ 
                    light: tileLight, 
                    mid: tileLight, 
                    dark: tileDark 
                }}
                onClick={() => dispatch({ type: "DRAW_FROM_WALL", payload: { playerIndex: currentPlayer } })}
            >
                <FontAwesomeIcon icon={faUpRightFromSquare} flip="vertical" className="me-1" />
                Draw
            </Button>
        </div>
    )
}