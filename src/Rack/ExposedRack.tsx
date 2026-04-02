import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useDroppable } from "@dnd-kit/react"
import clsx from "clsx"
import Tile from "../Tile/Tile"
import Button from "../Button"
import { useTheme } from "../useTheme"
import useMahjongData from "../useMahjongData"
import { EXPOSED_RACK_ID } from "../drag-and-drop"
import { sortTiles, checkIfMeldValid } from "../shared"
import type { MahjongPlayer, Size } from "../types"
import { GAP, THIS_PLAYER } from "../constants"

type Props = {
    player: MahjongPlayer
    size: Size
}

export default function ExposedRack({ player, size }: Props) {
    const { handsData, melding, dispatch } = useMahjongData()
    const { rackLight, rackDark } = useTheme()
    const { ref } = useDroppable({
        id: EXPOSED_RACK_ID,
        data: { player },
        disabled: player.index === THIS_PLAYER || melding.length === 0
    })

    const handleCancel = () => {
        dispatch({ type: "CANCEL_MELD" })
    }

    const handleConfirm = () => {
        dispatch({ type: "CONFIRM_MELD" })
    }

    const meldIsValid = !!melding && checkIfMeldValid(melding, handsData.callableMelds)

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
                {player.index === THIS_PLAYER && melding.length > 0 &&
                    <>
                        {melding.toSorted(sortTiles).map(tile => (
                            <Tile key={tile.id} tile={tile} size={size} />
                        ))}
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
                    </>
                }
            </div>
            <div className="h-2 m:h-3 -mb-2 m:-mb-3 vertical-shadow"></div>
            <div className="h-2 m:h-3 relative" style={{ backgroundColor: rackLight }}></div>
            <div className="h-2 m:h-3" style={{ backgroundColor: rackDark }}></div>
        </div>
    )
}