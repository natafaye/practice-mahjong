import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons"
import DraggableTile from "../Tile/DraggableTile"
import Button from "../Button"
import { useTheme } from "../useTheme"
import { DISCARD_ID } from "../drag-and-drop"
import { DISCARD } from "../constants"
import useMahjongData from "../useMahjongData"

type Props = {
    className?: string
}

export default function DiscardSpot({ className }: Props) {
    const { tableMid, tableDark, tableVeryDark } = useTheme()
    const { discard, gameState, dispatch } = useMahjongData()
    const tile = gameState === DISCARD ? discard.at(-1) : undefined

    return (
        <div className={className}>
            <div className="h-22 md:h-32 w-18 md:w-25 flex justify-center items-center border-2 border-dashed rounded-lg p-4 ps-3 pt-3 mb-2"
                style={{ background: tableMid, borderColor: tableDark }}
            >
                {tile ?
                    <DraggableTile tile={tile} playerIndex={DISCARD_ID} /> :
                    <span className="text-sm ms-1 md:text-base" style={{ color: tableDark }}>Discard</span>
                }
            </div>
            <Button
                className="w-18 md:w-25 text-sm md:text-base text-nowrap"
                style={{
                    background: tableMid,
                    borderColor: tableDark,
                    color: tableVeryDark,
                    visibility: gameState === DISCARD ? "visible" : "hidden"
                }}
                onClick={() => dispatch({ type: "SKIP_DISCARD" })}
            >
                <FontAwesomeIcon icon={faArrowUpFromBracket} className="me-1" rotation={90} />
                Skip
            </Button>
        </div>
    )
}