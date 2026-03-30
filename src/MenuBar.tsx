import type { ActionDispatch } from "react"
import type { MahjongAction } from "./useMahjongData/useMahjongData"
import { useTheme } from "./useTheme"
import Button from "./Button"
import { DISCARD, DRAWING, type GameState } from "./types"
import { THIS_PLAYER } from "./useMahjongData/generateInitialData"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpFromBracket, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"

type Props = {
    gameState: GameState
    currentPlayer: number
    dispatch: ActionDispatch<[action: MahjongAction]>
}

export default function MenuBar({ gameState, currentPlayer, dispatch }: Props) {
    const { rackDark, tileLight, tileDark, tableMid, tableDark } = useTheme()
    const drawDisabled = gameState !== DRAWING || currentPlayer !== THIS_PLAYER
    return (
        <div className="relative p-2 -mt-2 flex justify-between" style={{ backgroundColor: rackDark }}>
            <Button className="text-white md:text-lg"
                disabled={drawDisabled}
                style={!drawDisabled ? { backgroundColor: tileLight, borderColor: tileDark } : {}}
                onClick={() => dispatch({ type: "DRAW_FROM_WALL", payload: { playerIndex: currentPlayer }})}
            >
                <FontAwesomeIcon icon={faUpRightFromSquare} flip="vertical" className="me-1"/>
                Draw
            </Button>

            <Button className="text-white md:text-lg text-nowrap"
                disabled={gameState !== DISCARD}
                style={gameState === DISCARD ? { backgroundColor: tableMid, borderColor: tableDark } : {}}
                onClick={() => dispatch({ type: "SKIP_DISCARD" })}
            >
                <FontAwesomeIcon icon={faArrowUpFromBracket} className="me-1" rotation={90}/>
                Skip
            </Button>
        </div>
    )
}