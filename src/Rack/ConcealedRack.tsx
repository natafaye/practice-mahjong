import DraggableTile from "../Tile/DraggableTile"
import RackSlot from "./RackSlot"
import { useTheme } from "../useTheme/useTheme"
import type { MahjongPlayer, Size } from "../types"
import DraggableGap from "../Tile/DraggableGap"
import clsx from "clsx"
import { tileSizes } from "../Tile/tileSizes"

type Props = {
    player: MahjongPlayer
    size: Size
    isIdle?: boolean
}

export default function ConcealedRack({ player, size, isIdle = false }: Props) {
    const { rackLight, rackMid } = useTheme()

    return (
        <div className="relative vertical-shadow" style={{ background: rackMid }}>
            <div className="h-1.5 lg:h-2.5" style={{ background: rackLight }}></div>
            <div className={clsx(tileSizes[size].tileClassName, "flex justify-center mt-0 px-3")}>
                {player.concealed.map((tile, index) =>
                    <RackSlot
                        key={index}
                        index={index}
                        size={size}
                        isEmpty={typeof tile === "string"}
                        className={clsx(isIdle && typeof tile !== "string" && "animate-wave")}
                        style={isIdle && typeof tile !== "string" ? { animationDelay: `${index * 0.05}s` } : undefined}
                    >
                        {typeof tile !== "string" ? (
                            <DraggableTile
                                key={tile.id}
                                index={index}
                                playerIndex={player.index}
                                tile={tile}
                                size={size}
                                tipped
                                animateIn
                            />
                        ) : (
                            <DraggableGap
                                key={tile}
                                index={index}
                                gap={tile}
                                size={size}
                            />
                        )}
                    </RackSlot>
                )}
            </div>
            <div className="h-1.5 -mt-1.5 lg:h-2.5 lg:-mt-2.5" style={{ background: rackLight }}></div>
        </div>
    )
}