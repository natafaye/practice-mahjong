import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../Button"
import { faCheck, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { checkIfMeldValid, getHandsData, sortTiles } from "../_shared"
import useMahjongData from "../useMahjongData"
import Tile from "../Tile/Tile"
import type { Size } from "../types"
import { THIS_PLAYER, JOKER_SUIT } from "../constants"

type Props = {
  size: Size
}

export default function MeldingSpot({ size }: Props) {
  const { cardName, melding, dispatch, players } = useMahjongData()
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

  // Handle button events
  const handleQuickAdd = () => {
    if (quickAddIndex !== -1) {
      dispatch({ type: "ADD_TO_MELD", payload: { playerIndex: THIS_PLAYER, tileIndexes: [quickAddIndex] } })
    }
  }
  const handleCancel = () => dispatch({ type: "CANCEL_MELD" })
  const handleConfirm = () => dispatch({ type: "CONFIRM_MELD", payload: { playerIndex: THIS_PLAYER } })

  return (
    <>
      {melding.toSorted(sortTiles).map(tile => (
        <Tile key={tile.id} tile={tile} size={size} />
      ))}
      <div className="flex xl:flex-col gap-1 ms-2 justify-end items-center pb-2">
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
          className="xl:order-first"
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
    </>
  )
}