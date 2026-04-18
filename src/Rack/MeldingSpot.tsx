import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../Button"
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import { checkIfMeldValid, sortTiles } from "../_shared"
import useMahjongData from "../useMahjongData"
import Tile from "../Tile/Tile"
import type { Size } from "../types"
import { THIS_PLAYER } from "../constants"

type Props = {
	size: Size
}

export default function MeldingSpot({ size }: Props) {
	const { handsData, melding, dispatch } = useMahjongData()
	const meldIsValid = !!melding && checkIfMeldValid(melding, handsData.callableMelds)

	const handleCancel = () => dispatch({ type: "CANCEL_MELD" })
	const handleConfirm = () => dispatch({ type: "CONFIRM_MELD", payload: { playerIndex: THIS_PLAYER } })

	return (
		<>
			{melding.toSorted(sortTiles).map(tile => (
				<Tile key={tile.id} tile={tile} size={size} />
			))}
			<div className="flex xl:flex-col gap-1 ms-2 justify-end items-center pt-2">
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