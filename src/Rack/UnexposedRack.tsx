import DraggableTile from "../Tile/DraggableTile"
import RackSlot from "./RackSlot"
import { useTheme } from "../useTheme"
import type { MahjongPlayer, Size } from "../types"
import DraggableGap from "../Tile/DraggableGap"

type Props = {
    player: MahjongPlayer
    size: Size
}

export default function UnexposedRack({ player, size }: Props) {
    const { rackLight, rackMid, rackDark } = useTheme()

    return (
        <div className="relative -mt-4" style={{ background: rackMid }}>
            <div className="h-2 m:h-3" style={{ background: rackLight }}></div>
            <div className="flex justify-center mt-3 px-3">
                {player.unexposed.map((tile, index) =>
                    <RackSlot
                        key={index}
                        index={index}
                        isEmpty={typeof tile === "string"}
                    >
                        {typeof tile !== "string" ? (
                            <DraggableTile
                                key={tile.id}
                                index={index}
                                playerIndex={player.index}
                                tile={tile}
                                size={size}
                                tipped
                            />
                        ) : (
                            <DraggableGap
                                key={tile}
                                index={index}
                                gap={tile}
                            />
                        )}
                    </RackSlot>
                )}
            </div>
            <div className="h-2 m:h-3 -mt-2 m:-mt-3" style={{ background: rackLight }}></div>
            <div className="h-2 m:h-3 relative" style={{ background: rackDark }}></div>
        </div>
    )
}