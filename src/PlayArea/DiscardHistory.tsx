import clsx from "clsx"
import { DISCARD } from "../constants"
import Tile from "../Tile/Tile"
import useMahjongData from "../useMahjongData"

type Props = {
  className?: string
}

export default function DiscardHistory({ className }: Props) {
  const { discard, gameState } = useMahjongData()
  return (
    <div className={clsx(className)}>
      {discard.slice(0, gameState === DISCARD ? -1 : discard.length).map((tile, index) => (
        <Tile key={index} tile={tile} size="sm" />
      ))}
    </div>
  )
}