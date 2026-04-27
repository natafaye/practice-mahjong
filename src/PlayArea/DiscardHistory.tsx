import clsx from "clsx"
import { DISCARD } from "../constants"
import Tile from "../Tile/Tile"
import { useSelector } from "react-redux"
import { selectDiscard, selectGameState } from "../_store/selectors"

type Props = {
  className?: string
}

export default function DiscardHistory({ className }: Props) {
  const discard = useSelector(selectDiscard)
  const gameState = useSelector(selectGameState)
  return (
    <div className={clsx(className)}>
      {discard.slice(0, gameState === DISCARD ? -1 : discard.length).map((tile, index) => (
        <Tile key={index} tile={tile} layoutId={tile.id} size="sm" />
      ))}
    </div>
  )
}