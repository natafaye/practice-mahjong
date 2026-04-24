import { useSelector } from 'react-redux';
import { selectMelding, selectCurrentPlayer, selectCallingPlayer } from '../store/selectors';
import clsx from "clsx"
import Tile from "../Tile/Tile"
import { useTheme } from "../useTheme/useTheme"
import { DropOverlay, EXPOSED_RACK_ID, useIsDragging } from "../DraggingContext"
import { getJokerSwapIndex } from "../_shared"
import type { MahjongPlayer, Size } from "../types"
import { THIS_PLAYER } from "../constants"
import { tileSizes } from "../Tile/tileSizes"
import MeldingSpot from "./MeldingSpot"

type Props = {
	player: MahjongPlayer
	size: Size
	bouncingTileId?: string | null
}

export default function ExposedRack({ player, size, bouncingTileId = null }: Props) {
	const melding = useSelector(selectMelding)
	const currentPlayer = useSelector(selectCurrentPlayer)
	const callingPlayer = useSelector(selectCallingPlayer)
	const { rackLight, rackDark } = useTheme()
	const { draggingTile } = useIsDragging()

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
				{melding.length > 0 ? "Add to Meld" : "Joker Swap"}
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
				{player.index === THIS_PLAYER && callingPlayer === THIS_PLAYER && melding.length > 0 &&  (
					<MeldingSpot size={size} />
				)}
			</div>
			<div className="h-1.5 m:h-3 -mb-1.5 m:-mb-3 vertical-shadow"></div>
			<div className="h-1.5 m:h-3 relative" style={{ background: rackLight }}></div>
			<div className="h-1.5 m:h-3" style={{ background: rackDark }}></div>
		</div>
	)
}