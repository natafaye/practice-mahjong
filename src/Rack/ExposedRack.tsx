import type { ActionDispatch } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useDroppable } from "@dnd-kit/react"
import clsx from "clsx"
import Tile from "./Tile"
import Button from "../Button"
import { useTheme } from "../useTheme"
import type { MahjongAction } from "../useMahjongData/useMahjongData"
import { sortTiles } from "../useMahjongData/sortTiles"
import { checkIfMeldValid } from "../useMahjongData/checkIfMeldValid"
import { GAP, type MahjongPlayer, type MahjongTile, type Size } from "../types"
import useIsDraggingDiscard from "../useMahjongData/useIsDraggingDiscard"

type Props = {
    player: MahjongPlayer
    melding?: MahjongTile[]
    dispatch: ActionDispatch<[action: MahjongAction]>
    size: Size
}

export default function ExposedRack({ player, melding, size, dispatch }: Props) {
    const { rackLight, rackDark } = useTheme()
    const isDraggingDiscard = useIsDraggingDiscard()
    const { ref } = useDroppable({
        id: "EXPOSED_RACK",
        data: { player },
        disabled: isDraggingDiscard
    })

    const handleCancel = () => {
        dispatch({ type: "CANCEL_MELD" })
    }

    const handleConfirm = () => {
        dispatch({ type: "CONFIRM_MELD" })
    }

    const meldIsValid = !!melding && checkIfMeldValid(melding)

    return (
        <div ref={ref} style={{ backgroundColor: rackLight }}>
            <div className="h-2 m:h-3" style={{ backgroundColor: rackLight }}></div>
            <div className="h-2 m:h-3 -mb-3" style={{ backgroundColor: rackDark }}></div>
            <div className={clsx("flex justify-center px-3",
                { sm: "", md: "min-h-12 md:min-h-20", lg: "min-h-14 md:min-h-24" }[size]
            )}>
                {player.exposed.map(tile => tile === GAP ?
                    <div key={tile} className="w-10"></div> :
                    <Tile key={tile.id} tile={tile} size={size} />
                )}
                {melding?.toSorted(sortTiles).map(tile => <Tile key={tile.id} tile={tile} size={size} />)}
                {melding && melding.length > 0 && (
                    <div className="flex flex-col gap-1 ms-2 justify-end">
                        <Button
                            className="bg-emerald-400 border-emerald-500 text-emerald-900 active:bg-emerald-500"
                            disabled={!meldIsValid}
                            onClick={handleConfirm}
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </Button>
                        <Button className="bg-red-400 border-red-500 text-red-900 active:bg-red-500" onClick={handleCancel}>
                            <FontAwesomeIcon icon={faXmark} />
                        </Button>
                    </div>
                )}
            </div>
            <div className="h-2 m:h-3 -mb-2 m:-mb-3 vertical-shadow"></div>
            <div className="h-2 m:h-3 relative" style={{ backgroundColor: rackLight }}></div>
            <div className="h-2 m:h-3" style={{ backgroundColor: rackDark }}></div>
        </div>
    )
}