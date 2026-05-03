import { createContext, useRef, useState, type ReactNode } from "react";
import {
  DragDropProvider,
  DragOverlay,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/react";
import Tile from "../Tile/Tile";
import { getJokerSwapIndex } from "../_shared";
import type { MahjongTile } from "../types";
import { CHARLESTONS, PASSING_GAPS, THIS_PLAYER } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { selectGameState, selectPlayers } from "../_store/selectors";
import {
  addToPass,
  discard,
  pickUpDiscard,
  rearrangeConcealed,
  removeFromPass,
  swapJoker,
} from "../_store/gameSlice";

export const GAP_ID = "GAP_";
export const SLOT_ID = "SLOT_";
export const DISCARD_ID = "DISCARD";
export const PASSING_ID = "PASSING";
export const PLAY_AREA_ID = "PLAY_AREA";
export const EXPOSED_RACK_ID = "EXPOSED_RACK_";
export const WHOLE_RACK_ID = "WHOLE_RACK";

type DraggingData = {
  tile?: MahjongTile;
  tileIndex?: number;
  isGap?: boolean;
  playerIndex: number | typeof DISCARD_ID | typeof PASSING_ID;
};

type DraggingContextType = {
  draggingData: DraggingData | undefined;
};

export const DraggingStateContext = createContext<DraggingContextType>({
  draggingData: undefined,
});

type Props = {
  children: ReactNode;
};

export function DraggingContext({ children }: Props) {
  const gameState = useSelector(selectGameState);
  const players = useSelector(selectPlayers);
  const dispatch = useDispatch();
  const [activeTile, setActiveTile] = useState<MahjongTile | null>(null);
  const [draggingData, setDraggingData] = useState<DraggingData | undefined>(undefined);
  const currentDragIndex = useRef<number | null>(null);

  const onDragStart: DragStartEvent = ({ operation: { source } }) => {
    console.log("Started dragging", source?.id);
    if (source) {
      currentDragIndex.current = source.data.tileIndex;
      const tile = source.data.tile as MahjongTile;
      setActiveTile(tile);
      setDraggingData(source.data as DraggingData);
    }
  };

  const onDragOver: DragOverEvent = ({ operation: { source, target } }) => {
    console.log(`Dragged ${source?.id} over ${target?.id}`);
    if (!target || !source || currentDragIndex.current === null) return;
    const targetId = String(target.id);
    if (targetId.startsWith(SLOT_ID)) {
      const [, targetSlotIndexString] = targetId.split("_");
      const targetSlotIndex = parseInt(targetSlotIndexString);

      let startIndex = source.data.tileIndex;
      if (source.data.playerIndex === PASSING_ID) {
        // Find the index of the corresponding gap in the rack to move that around
        const player = players[THIS_PLAYER];
        const existingGaps = player.concealed
          .filter((t) => typeof t === "string" && PASSING_GAPS.includes(t))
          .toSorted();
        const gapToMove = existingGaps[source.data.tileIndex];
        startIndex = player.concealed.indexOf(gapToMove);
      }

      dispatch(
        rearrangeConcealed({
          startIndex,
          endIndex: targetSlotIndex,
        }),
      );
      currentDragIndex.current = targetSlotIndex;
    }
  };

  const onDragEnd: DragEndEvent = ({ operation: { source, target, canceled } }) => {
    // Clear the current drag index and active tile even if it isn't a valid drop target
    const finalIndex = currentDragIndex.current;
    currentDragIndex.current = null;
    setActiveTile(null);
    setDraggingData(undefined);

    if (!target || !source || canceled || finalIndex === null) return;
    console.log(`Dropped ${source.id} onto ${target.id}`);

    if (target.id === PLAY_AREA_ID && !source.id.toString().startsWith(GAP_ID)) {
      if (CHARLESTONS.includes(gameState)) {
        // Add to Charleston Pass
        dispatch(
          addToPass({
            playerIndex: THIS_PLAYER,
            tileIndexes: [finalIndex],
          }),
        );
      } else {
        // Discard
        dispatch(
          discard({
            playerIndex: THIS_PLAYER,
            tileIndex: finalIndex,
          }),
        );
      }
    } else if (target.id === WHOLE_RACK_ID || target.id.toString().startsWith(SLOT_ID)) {
      if (source.data.playerIndex === PASSING_ID) {
        dispatch(
          removeFromPass({
            playerIndex: THIS_PLAYER,
            passingTileIndex: source.data.tileIndex, // TODO: finalIndex??
          }),
        );
      } else if (target.id === WHOLE_RACK_ID) {
        // Pick up discard
        dispatch(
          pickUpDiscard({
            playerIndex: THIS_PLAYER,
          }),
        );
      }
    } else if (target.id.toString().startsWith(EXPOSED_RACK_ID)) {
      // Check for a joker swap
      const jokerSwapIndex = getJokerSwapIndex(source.data.tile, target.data.player.exposed);
      if (jokerSwapIndex !== -1) {
        dispatch(swapJoker({
          sourcePlayerIndex: THIS_PLAYER,
          sourceTileIndex: finalIndex,
          targetPlayerIndex: target.data.player.index,
          targetTileIndex: jokerSwapIndex,
        }));
      }
    }
  };

  return (
    <DraggingStateContext.Provider value={{ draggingData }}>
      <DragDropProvider onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd}>
        {children}
        {activeTile && (
          <DragOverlay dropAnimation={null}>
            <Tile tile={activeTile} layoutId={activeTile.id} />
          </DragOverlay>
        )}
      </DragDropProvider>
    </DraggingStateContext.Provider>
  );
}
