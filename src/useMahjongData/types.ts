import type { ActionDispatch } from "react";

export type MahjongAction =
    | { type: 'ADD_TO_PASS'; payload: { playerIndex: number, tileIndexes: number[] } }
    | { type: 'REMOVE_FROM_PASS'; payload: { playerIndex: number, passingTileIndex: number } }
    | { type: 'MARK_READY_TO_PASS'; payload: { playerIndex: number } }
    | { type: 'RESTART'; payload: { cardName: string, numberOfPlayers: number } }
    | { type: 'DRAW_FROM_WALL'; payload: { playerIndex: number } }
    | { type: 'JOKER_SWAP'; payload: {
        sourcePlayerIndex: number,
        sourceTileIndex: number,
        targetPlayerIndex: number,
        targetTileIndex: number
      }}
    | { type: 'ADD_TO_MELD'; payload: { tileIndex: number } }
    | { type: 'CANCEL_MELD' }
    | { type: 'CONFIRM_MELD' }
    | { type: 'DISCARD_TILE'; payload: { playerIndex: number; tileIndex: number } }
    | { type: 'PICK_UP_DISCARD'; payload: { playerIndex: number } }
    | { type: 'SKIP_DISCARD' }
    | { type: 'SKIP_DISCARD_AI' }
    | { type: 'REARRANGE_UNEXPOSED'; payload: { startIndex: number; endIndex: number } }

    | { type: 'EXPOSE_TILES'; payload: { playerIndex: number; tileIndices: number[] } }

export type MahjongDispatch = ActionDispatch<[action: MahjongAction]>