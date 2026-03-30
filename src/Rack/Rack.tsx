import { GAP, type MahjongPlayer, type MahjongTile, type Size } from "../types"
import { useTheme } from "../useTheme"
import clsx from "clsx"
import DraggableTile from "./DraggableTile"
import ExposedRack from "./ExposedRack"
import type { ActionDispatch } from "react"
import type { MahjongAction } from "../useMahjongData/useMahjongData"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"

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
    const { rackLight, rackMid, rackDark } = useTheme()

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
                    {!concealed && (
                        <div className="relative -mt-4" style={{ backgroundColor: rackMid }}>
                            <div className="h-2 m:h-3" style={{ backgroundColor: rackLight }}></div>
                            <div className="flex justify-center mt-3 px-3">
                                {player.unexposed.map((tile, index) => tile === GAP ?
                                    <div key={tile} className="w-10"></div> :
                                    <DraggableTile
                                        key={tile.id}
                                        index={index}
                                        playerIndex={player.index}
                                        tile={tile}
                                        size={size}
                                        tipped
                                    />
                                )}
                            </div>
                            <div className="h-2 m:h-3 -mt-2 m:-mt-3" style={{ backgroundColor: rackLight }}></div>
                            <div className="h-2 m:h-3 relative" style={{ backgroundColor: rackDark }}></div>
                        </div>
                    )}
                </div>
            </div >
        </div>
    )
}