import { useSelector, useDispatch } from 'react-redux';
import { selectWall, selectGameState, selectCurrentPlayer } from '../_store/selectors';
import { drawFromWall } from '../_store/gameSlice';
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Tile from "../Tile/Tile"
import Button from "../Button"
import { useTheme } from "../useTheme/useTheme"
import { DRAWING, THIS_PLAYER } from "../constants"
import clsx from "clsx"

type Props = {
    className?: string
}

export default function DrawSpot({ className }: Props) {
    const dispatch = useDispatch()
    const { tileLight, tileDark } = useTheme()
    const wall = useSelector(selectWall)
    const gameState = useSelector(selectGameState)
    const currentPlayer = useSelector(selectCurrentPlayer)
    const tilesToShow = Math.min(20, wall.length)
    return (
        <div className={clsx(className, "flex flex-col items-end")}>
            <div className="flex justify-end pb-4">
                {Array.from(Array(tilesToShow).keys()).map((index) => (
                    <Tile key={index} layoutId={wall[index].id} message={wall.length - (tilesToShow - index - 1)} />
                ))}
            </div>
            <Button
                className="-me-1"
                disabled={gameState !== DRAWING || currentPlayer !== THIS_PLAYER}
                colors={{ 
                    light: tileLight, 
                    mid: tileLight, 
                    dark: tileDark 
                }}
                onClick={() => dispatch(drawFromWall({ playerIndex: currentPlayer }))}
            >
                <FontAwesomeIcon icon={faUpRightFromSquare} flip="vertical" className="me-1" />
                Draw
            </Button>
        </div>
    )
}