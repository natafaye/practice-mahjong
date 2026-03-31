import { useState, type ActionDispatch } from "react"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import ExposedRack from "./ExposedRack"
import UnexposedRack from "./UnexposedRack"
import type { MahjongAction } from "../useMahjongData/useMahjongData"
import type { MahjongPlayer, MahjongTile, Size } from "../types"
import { useDragDropMonitor } from "@dnd-kit/react"
import DropOverlay from "../DropOverlay"
import { useTheme } from "../useTheme"

type Props = {
    player: MahjongPlayer
    isTurn: boolean
    melding?: MahjongTile[]
    dispatch: ActionDispatch<[action: MahjongAction]>
    size?: Size
    concealed?: boolean
    className?: string
}

export default function Rack({ player, isTurn, melding, dispatch, size = "lg", className, concealed = false }: Props) {
    const { rackLight, rackDark } = useTheme()
    const [showDiscardPickUp, setShowDiscardPickUp] = useState(false)
    useDragDropMonitor({
        onDragStart: ({ operation }) => setShowDiscardPickUp(!concealed && operation.source?.data.playerIndex === "DISCARD"),
        onDragEnd: () => setShowDiscardPickUp(false)
    })
    return (
        <div className={clsx(className, "relative")}>
            {isTurn && (
                <div className={clsx(
                    "absolute z-10",
                    { lg: "text-5xl right-10", md: "text-4xl right-5", sm: "text-3xl" }[size],
                    concealed ? "-bottom-4" : "-top-6"
                )}>
                    <span className="fa-layers fa-fw">
                        <FontAwesomeIcon icon={faStar} className="text-white drop-shadow-sm drop-shadow-gray-700" />
                        <FontAwesomeIcon icon={faStar} transform="shrink-4" className="text-yellow-400" />
                    </span>
                </div>
            )}
            <div className="overflow-x-auto vertical-shadow relative">
                <div className="w-max min-w-full">
                    <ExposedRack player={player} melding={melding} dispatch={dispatch} size={size} />
                    {!concealed && <UnexposedRack player={player} size={size} />}
                </div>
            </div >
            <DropOverlay
                dropId="PICK_UP_DISCARD"
                show={showDiscardPickUp}
                backgroundColor={rackLight}
                textShadowColor={rackDark}
            >
                Pick Up Discard
            </DropOverlay>
        </div>
    )
}