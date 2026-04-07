import { useState } from "react"
import { useDragDropMonitor } from "@dnd-kit/react"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import ExposedRack from "./ExposedRack"
import UnexposedRack from "./UnexposedRack"
import { DropOverlay, PICK_UP_DISCARD_ID } from "../drag-and-drop"
import { useTheme } from "../useTheme"
import useMahjongData from "../useMahjongData"
import type { MahjongPlayer, Size } from "../types"

type Props = {
    player: MahjongPlayer
    size?: Size
    concealed?: boolean
    className?: string
}

export default function Rack({ player, size = "lg", className, concealed = false }: Props) {
    const { rackLight, rackDark } = useTheme()
    const { currentPlayer } = useMahjongData()
    const isTurn = currentPlayer === player.index

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
                    <ExposedRack player={player} size={size} />
                    {!concealed && player.unexposed.length > 0 && <UnexposedRack player={player} size={size} />}
                </div>
            </div >
            <DropOverlay
                dropId={PICK_UP_DISCARD_ID}
                show={showDiscardPickUp}
                background={rackLight}
                textShadowColor={rackDark}
            >
                Pick Up Discard
            </DropOverlay>
        </div>
    )
}