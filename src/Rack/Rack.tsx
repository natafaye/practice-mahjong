import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import ExposedRack from "./ExposedRack"
import ConcealedRack from "./ConcealedRack"
import { DropOverlay, WHOLE_RACK_ID, useIsDragging } from "../DraggingContext"
import { useTheme } from "../useTheme/useTheme"
import type { MahjongPlayer, Size } from "../types"
import type { CSSProperties } from "react"

type Props = {
    player: MahjongPlayer
    size?: Size
    concealed?: boolean
    isCurrentPlayer?: boolean
    isIdle?: boolean
    bouncingTileId?: string | null
    className?: string
    style?: CSSProperties
}

export default function Rack({ player, size = "lg", className, style, concealed = false, isCurrentPlayer = false, isIdle = false, bouncingTileId = null }: Props) {
    const { rackLight, rackDark } = useTheme()
    const { isDraggingDiscard, isDraggingPass, isDraggingJoker } = useIsDragging()

    return (
        <div className={clsx(className, "relative")} style={style}>
            {isCurrentPlayer && (
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
            <div className="overflow-x-auto relative">
                <div className="w-max min-w-full">
                    <ExposedRack player={player} size={size} bouncingTileId={bouncingTileId} />
                    {!concealed && player.concealed.length > 0 && <ConcealedRack player={player} size={size} isIdle={isIdle} />}
                </div>
            </div >
            <DropOverlay
                dropId={WHOLE_RACK_ID}
                show={!concealed && (isDraggingDiscard || isDraggingPass) && !isDraggingJoker}
                background={rackLight}
                textShadowColor={rackDark}
            >
                {isDraggingPass ? "Remove from Pass" : "Pick Up Discard"}
            </DropOverlay>
        </div>
    )
}