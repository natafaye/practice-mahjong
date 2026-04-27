import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Tile from "../../Tile/Tile"
import type { MahjongTileRow } from "../../types"
import { useTheme } from "../../useTheme"
import { faTrophy } from "@fortawesome/free-solid-svg-icons"
import clsx from "clsx"

type Props = {
  tiles: MahjongTileRow
  isWinner?: boolean
}

export default function MiniRack({ tiles, isWinner = false }: Props) {
  const { rackMid } = useTheme()
  return (
    <div className="relative flex items-center" style={{ background: rackMid }}>
      <div className={clsx("basis-14 text-center min-w-0", isWinner ? "shrink-0" : "shrink-999")}>
        {isWinner && <FontAwesomeIcon icon={faTrophy} className="text-amber-400 text-4xl" />}
      </div>
      <div className="flex grow min-w-0 overflow-x-auto p-3">
        <div className="flex mx-auto">
          {tiles.map((tile, index) => (
            typeof tile === "string" ? <div key={index} className="w-2 md:w-3"></div> :
              <Tile key={tile.id} tile={tile} size="sm" />
          ))}
        </div>
      </div>
    </div>
  )
}