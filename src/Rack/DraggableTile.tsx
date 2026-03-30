import Tile, { type TileProps } from "./Tile"
import type { MahjongTile } from "../types"
import { useSortable } from "@dnd-kit/react/sortable"

type Props = TileProps & {
    index: number
    playerIndex: number
    tile: MahjongTile
}

export default function DraggableTile({ tile, index, playerIndex, ...props }: Props) {
    const { ref } = useSortable({
        index,
        id: tile.id,
        data: { 
            tile: tile,
            tileIndex: index,
            playerIndex
        }
    })

    return (
        <div ref={ref}>
            <Tile tile={tile} {...props} />
        </div>
    )
}