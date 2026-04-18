import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import clsx from "clsx"
import Tile from "../Tile/Tile"
import Button from "../Button"
import { useTheme } from "../useTheme/useTheme"
import useMahjongData from "../useMahjongData"
import { DropOverlay, EXPOSED_RACK_ID, useIsDragging } from "../drag-and-drop"
import { sortTiles, checkIfMeldValid, getJokerSwapIndex } from "../shared"
import type { MahjongPlayer, Size } from "../types"
import { THIS_PLAYER } from "../constants"
import { tileSizes } from "../Tile/tileSizes"

type Props = {
	player: MahjongPlayer
	size: Size
	bouncingTileId?: string | null
}

export default function ExposedRack({ player, size, bouncingTileId = null }: Props) {
	const { handsData, melding, currentPlayer, dispatch } = useMahjongData()
	const { rackLight, rackDark } = useTheme()
	const { draggingTile } = useIsDragging()

	const handleCancel = () => dispatch({ type: "CANCEL_MELD" })
	const handleConfirm = () => dispatch({ type: "CONFIRM_MELD" })

	const meldIsValid = !!melding && checkIfMeldValid(melding, handsData.callableMelds)
	const hasJokerSwap = !!draggingTile && getJokerSwapIndex(draggingTile, player.exposed) !== -1

	return (
		<div className={clsx("relative")} style={{ background: rackLight }}>
			{player.index === THIS_PLAYER && <>
				<div className="h-2 m:h-3" style={{ background: rackLight }}></div>
				<div className="h-2 m:h-3 -mb-3" style={{ background: rackDark }}></div>
			</>}
			<DropOverlay
				dropId={EXPOSED_RACK_ID}
				data={{ player }}
				show={(player.index === THIS_PLAYER && melding.length > 0) || currentPlayer === THIS_PLAYER && hasJokerSwap}
				background={rackLight} textShadowColor={rackDark}
			>
				{ melding.length > 0 ? "Add to Meld" : "Joker Swap" }
			</DropOverlay>
			<div className={clsx("flex justify-center px-3 pt-2 box-content", tileSizes[size].tileClassName)}>
				{player.exposed.map((tile, index) => typeof tile === "string" ?
					<div key={index} className="w-10"></div> :
					<Tile
						key={tile.id}
						tile={tile}
						size={size}
						className={clsx(bouncingTileId === tile.id && "animate-double-bounce")}
					/>
				)}
				{player.index === THIS_PLAYER && melding.length > 0 &&
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
				}
			</div>
			<div className="h-1.5 m:h-3 -mb-1.5 m:-mb-3 vertical-shadow"></div>
			<div className="h-1.5 m:h-3 relative" style={{ background: rackLight }}></div>
			<div className="h-1.5 m:h-3" style={{ background: rackDark }}></div>
		</div>
	)
}