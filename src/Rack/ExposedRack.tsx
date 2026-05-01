import { useSelector } from 'react-redux';
import { selectMelding, selectCurrentPlayer, selectCallingPlayer } from '../_store/selectors';
import clsx from "clsx"
import Tile from "../Tile/Tile"
import { useTheme } from "../useTheme/useTheme"
import { DropOverlay, EXPOSED_RACK_ID, useIsDragging } from "../DraggingContext"
import { getJokerSwapIndex } from "../_shared"
import type { MahjongPlayer, Size } from "../types"
import { THIS_PLAYER } from "../constants"
import MeldingSpot from "./MeldingSpot"

type Props = {
  player: MahjongPlayer
  size: Size
}

export default function ExposedRack({ player, size }: Props) {
  const melding = useSelector(selectMelding)
  const currentPlayer = useSelector(selectCurrentPlayer)
  const callingPlayer = useSelector(selectCallingPlayer)
  const { rackLight, rackDark } = useTheme()
  const { draggingTile } = useIsDragging()
  const hasJokerSwap = !!draggingTile && getJokerSwapIndex(draggingTile, player.exposed) !== -1

  return (
    <div className={clsx("relative")} style={{ background: rackLight }}>
      {player.index === THIS_PLAYER && <>
        <div className="h-1.5 lg:h-2"/>
        <div className="h-1.5 -mb-1.5 lg:h-2 lg:-mb-2" style={{ background: rackDark }}/>
      </>}
      <DropOverlay
        dropId={EXPOSED_RACK_ID}
        data={{ player }}
        show={currentPlayer === THIS_PLAYER && hasJokerSwap}
        background={["green", "yellow", "blue", "red"][player.index]} //rackLight} 
        textShadowColor={rackDark}
      >
        {melding.length > 0 ? "Add to Meld" : "Joker Swap"}
      </DropOverlay>
      <div className={clsx(
        "flex px-3 pt-1 box-content",
        { sm: "h-6 lg:h-8 xl:h-10",
          md: "h-7 lg:h-10 xl:h-13",
          lg: "h-9 lg:h-12 xl:h-15"
        }[size]
      )}>
        <div className="me-auto">
          {player.index === THIS_PLAYER && callingPlayer === THIS_PLAYER && melding.length > 0 && (
            <MeldingSpot size={size} className="me-10" />
          )}
        </div>
        <div className="flex grow justify-center">
          {player.exposed.slice(0, -1).map((tile, index) => typeof tile === "string" ?
            <div key={index} className="w-10"></div> :
            <Tile
              key={tile.id}
              tile={tile}
              size={size}
              layoutId={tile.id}
              animateIn
            />
          )}
        </div>
      </div>
    </div>
  )
}