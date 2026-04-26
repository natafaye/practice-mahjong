import { useSelector, useDispatch } from 'react-redux';
import { selectCardName, selectMelding, selectPlayers } from '../_store/selectors';
import { addToMeld, confirmMeld, cancelMeld } from '../_store/gameSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../Button"
import { faCheck, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { checkIfMeldValid, getHandsData, sortTiles } from "../_shared"
import Tile from "../Tile/Tile"
import type { Size } from "../types"
import { THIS_PLAYER, JOKER_SUIT } from "../constants"
import clsx from 'clsx';

type Props = {
  size: Size
  className: string
}

export default function MeldingSpot({ size, className }: Props) {
  const dispatch = useDispatch()
  const cardName = useSelector(selectCardName)
  const melding = useSelector(selectMelding)
  const players = useSelector(selectPlayers)
  const handsData = getHandsData(cardName)
  const meldIsValid = checkIfMeldValid(melding, handsData.callableMelds)

  // Get index of the tile to add if the quick add button is clicked (to see if button should be enabled)
  const firstTile = melding[0]
  const matchingTileIndex = players[THIS_PLAYER].concealed.findIndex(
    tile => typeof tile !== "string" && tile.suit === firstTile.suit && tile.number === firstTile.number
  )
  const jokerIndex = players[THIS_PLAYER].concealed.findIndex(
    tile => typeof tile !== "string" && tile.suit === JOKER_SUIT
  )
  const quickAddIndex = matchingTileIndex !== -1 ? matchingTileIndex : jokerIndex

  // Handle add / cancel / confirm
  const handleQuickAdd = () => {
    if (quickAddIndex !== -1) {
      dispatch(addToMeld({ playerIndex: THIS_PLAYER, tileIndexes: [quickAddIndex] }))
    }
  }
  const handleCancel = () => dispatch(cancelMeld())
  const handleConfirm = () => dispatch(confirmMeld({ playerIndex: THIS_PLAYER }))

  return (
    <div className={clsx(className, "flex")}>
      <div className="flex gap-1 me-2 justify-center items-center pb-2">
        <Button
          colors={{
            light: "var(--color-red-300)",
            mid: "var(--color-red-400)",
            dark: "var(--color-red-500)",
            text: "var(--color-red-900)"
          }}
          onClick={handleCancel}
        >
          <FontAwesomeIcon icon={faXmark} />
        </Button>
        <Button
          colors={{
            light: "var(--color-taupe-50)",
            mid: "var(--color-taupe-200)",
            dark: "var(--color-taupe-300)",
            text: "var(--color-taupe-900)"
          }}
          disabled={quickAddIndex === -1}
          onClick={handleQuickAdd}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <Button
          colors={{
            light: "var(--color-emerald-300)",
            mid: "var(--color-emerald-400)",
            dark: "var(--color-emerald-500)",
            text: "var(--color-emerald-800)"
          }}
          disabled={!meldIsValid}
          onClick={handleConfirm}
        >
          <FontAwesomeIcon icon={faCheck} />
        </Button>
      </div>
      {melding.toSorted(sortTiles).map(tile => (
        <Tile key={tile.id} tile={tile} size={size} />
      ))}
    </div>
  )
}