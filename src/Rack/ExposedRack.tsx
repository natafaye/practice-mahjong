import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import clsx from "clsx"
import Tile from "../Tile/Tile"
import Button from "../Button"
import { useTheme } from "../useTheme/useTheme"
import useMahjongData from "../useMahjongData"
import { DropOverlay, EXPOSED_RACK_ID } from "../drag-and-drop"
import { sortTiles, checkIfMeldValid } from "../shared"
import type { MahjongPlayer, Size } from "../types"
import { THIS_PLAYER } from "../constants"
import { tileSizes } from "../Tile/tileSizes"

type Props = {
	player: MahjongPlayer
	size: Size
	bouncingTileId?: string | null
}

export default function ExposedRack({ player, size, bouncingTileId = null }: Props) {
	const { handsData, melding, dispatch } = useMahjongData()
	const { rackLight, rackDark } = useTheme()

	const handleCancel = () => dispatch({ type: "CANCEL_MELD" })
	const handleConfirm = () => dispatch({ type: "CONFIRM_MELD" })

	const meldIsValid = !!melding && checkIfMeldValid(melding, handsData.callableMelds)

	return (
		<div className={clsx("relative")} style={{ background: rackLight }}>
			{player.index === THIS_PLAYER && <>
				<div className="h-2 m:h-3" style={{ background: rackLight }}></div>
				<div className="h-2 m:h-3 -mb-3" style={{ background: rackDark }}></div>
				<DropOverlay dropId={EXPOSED_RACK_ID} data={{ player }} show={melding.length > 0}
					background={rackLight} textShadowColor={rackDark}
				>Add to Meld</DropOverlay>
			</>}
			<div className={clsx("flex justify-center px-3 pt-2 box-content", tileSizes[size].tileClassName)}>
				{player.exposed.map((tile, index) => typeof tile === "string" ?
					<div key={index} className="w-10"></div> :
					<Tile
						key={tile.id}
						tile={tile}
						size={size}
						className={clsx(bouncingTileId === tile.id && "animate-triple-bounce")}
					/>
				)}
				{player.index === THIS_PLAYER && melding.length > 0 &&
					<>
						{melding.toSorted(sortTiles).map(tile => (
							<Tile key={tile.id} tile={tile} size={size} />
						))}
						<div className="flex xl:flex-col gap-1 ms-2 justify-end items-center pt-2">
							<Button
								className="bg-red-400 border-red-500 text-red-900"
								onClick={handleCancel}
							>
								<FontAwesomeIcon icon={faXmark} />
							</Button>
							<Button
								className={clsx(
									"bg-emerald-400 border-emerald-500 text-emerald-900",
									"xl:order-first"
								)}
								disabled={!meldIsValid}
								onClick={handleConfirm}
							>
								<FontAwesomeIcon icon={faCheck} />
							</Button>
						</div>
					</>
				}
			</div>
			<div className="h-2 m:h-3 -mb-2 m:-mb-3 vertical-shadow"></div>
			<div className="h-2 m:h-3 relative" style={{ background: rackLight }}></div>
			<div className="h-2 m:h-3" style={{ background: rackDark }}></div>
		</div>
	)
}