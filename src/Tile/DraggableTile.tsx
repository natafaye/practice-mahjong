import Tile, { type TileProps } from "./Tile"
import type { MahjongTile } from "../types"
import { useDraggable } from "@dnd-kit/react"

type Props = TileProps & {
    index?: number
    playerIndex: number | "DISCARD" | "PASSING"
    tile: MahjongTile
}

export default function DraggableTile({ tile, index, playerIndex, ...props }: Props) {
    const { ref, isDragging } = useDraggable({
        id: tile.id,
        data: {
            tile: tile,
            tileIndex: index,
            playerIndex
        }
    })

    return (
        <div ref={ref} style={{
            opacity: isDragging ? 0 : 1
        }}>
            <Tile tile={tile} {...props} />
        </div>
    )
}