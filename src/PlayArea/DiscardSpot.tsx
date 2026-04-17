import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons"
import DraggableTile from "../Tile/DraggableTile"
import Button from "../Button"
import { useTheme } from "../useTheme/useTheme"
import { DISCARD_ID } from "../drag-and-drop"
import { DISCARD } from "../constants"
import useMahjongData from "../useMahjongData"
import clsx from "clsx"

type Props = {
    className?: string
}

export default function DiscardSpot({ className }: Props) {
    const { tableMid, tableDark, tableVeryDark } = useTheme()
    const { discard, gameState, dispatch } = useMahjongData()
    const tile = gameState === DISCARD ? discard.at(-1) : undefined

    const widthClasses = "w-18 md:w-20 lg:w-21 xl:w-25"

    return (
        <div className={className}>
            <div className={clsx(
                "aspect-[2.3/3] flex justify-center items-center border-2 border-dashed rounded-lg p-4 ps-3 pt-3 mb-2",
                widthClasses
            )}
                style={{ background: tableMid, borderColor: tableDark }}
            >
                {tile ?
                    <DraggableTile tile={tile} playerIndex={DISCARD_ID} /> :
                    <span className="text-sm lg:text-base ms-1" style={{ color: tableDark }}>Discard</span>
                }
            </div>
            <Button
                className={clsx(widthClasses, "text-sm lg:text-base text-nowrap")}
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