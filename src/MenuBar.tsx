import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpFromBracket, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import Button from "./Button"
import { useTheme } from "./useTheme"
import { DISCARD, DRAWING, THIS_PLAYER } from "./constants"
import useMahjongData from "./useMahjongData"

export default function MenuBar() {
    const { rackDark, tileLight, tileDark, tableMid, tableDark } = useTheme()
    const { gameState, currentPlayer, dispatch } = useMahjongData()
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