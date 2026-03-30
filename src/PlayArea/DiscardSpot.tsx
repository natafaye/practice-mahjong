import Tile from "../Rack/Tile"
import { DISCARD, type GameState, type MahjongTile } from "../types"
import { useTheme } from "../useTheme"
import Button from "../Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons"
import type { ActionDispatch } from "react"
import type { MahjongAction } from "../useMahjongData/useMahjongData"

type Props = {
    tile?: MahjongTile
    gameState: GameState
    className?: string
    dispatch: ActionDispatch<[action: MahjongAction]>
}

export default function DiscardSpot({ tile, gameState, dispatch, className }: Props) {
    const { tableMid, tableDark, tableVeryDark } = useTheme()

    return (
        <div className={className}>
            <div className="h-22 md:h-32 w-18 md:w-25 flex justify-center items-center border-2 border-dashed rounded-lg p-4 ps-3 pt-3 mb-2"
                style={{ background: tableMid, borderColor: tableDark }}
            >
                {tile ?
                    <Tile tile={tile} /> :
                    <span className="text-sm ms-1 md:text-base" style={{ color: tableDark }}>Discard</span>
                }
            </div>
            <Button
                className="w-18 md:w-25 text-sm md:text-base text-nowrap"
                style={{
                    backgroundColor: tableMid,
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