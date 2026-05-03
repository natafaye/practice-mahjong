import { useSelector } from "react-redux";
import { THIS_PLAYER } from "../constants";
import { DropOverlay, EXPOSED_RACK_ID, useIsDragging } from "../DraggingContext";
import { selectCurrentPlayer, selectPlayers } from "../_store/selectors";
import { getJokerSwapIndex } from "../_shared";
import { useTheme } from "../useTheme";
import { useMemo } from "react";

type Props = {
  playerIndex?: number
};
export default function JokerSwapDropOverlay({ playerIndex = undefined }: Props) {
  const { rackLight, rackDark } = useTheme();
  const currentPlayer = useSelector(selectCurrentPlayer);
  const players = useSelector(selectPlayers);
  const { draggingTile } = useIsDragging();
  const jokerSwapPlayerIndex = useMemo(() => {
    if (!draggingTile) return undefined
    if (playerIndex !== undefined) {
      const index = getJokerSwapIndex(draggingTile, players[playerIndex].exposed)
      return index !== -1 ? playerIndex : undefined
    } else {
      const index = players.findIndex((p) => getJokerSwapIndex(draggingTile, p.exposed) !== -1)
      return index !== -1 ? index : undefined
    }
  }, [draggingTile]);

  return (
    <DropOverlay
      dropId={EXPOSED_RACK_ID + (playerIndex !== undefined ? playerIndex : "ALL")}
      data={{ player: jokerSwapPlayerIndex && players[jokerSwapPlayerIndex] }}
      show={currentPlayer === THIS_PLAYER && jokerSwapPlayerIndex !== undefined}
      background={rackLight}
      textShadowColor={rackDark}
      className="text-xl"
    >
      Joker Swap
    </DropOverlay>
  );
}
