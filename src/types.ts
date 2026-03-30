export type MahjongTile = { 
    suit: string
    number?: number | string 
    id: string
}

export const GAP = "" as const

export type MahjongTileRow = Array<MahjongTile | typeof GAP>

export type MahjongPlayer = {
    index: number
    isHuman: boolean
    exposed: MahjongTileRow
    unexposed: MahjongTileRow
}

export const DRAWING = "DRAWING" as const
export const PLAYING = "PLAYING" as const
export const DISCARD = "DISCARD" as const
export const DISCARD_AI = "DISCARD_AI" as const
export const GAME_OVER = "GAME_OVER" as const

export type GameState = typeof DRAWING | typeof PLAYING | typeof DISCARD | typeof DISCARD_AI | typeof GAME_OVER

export type MahjongData = {
    currentPlayer: number
    players: MahjongPlayer[]
    wall: MahjongTile[]
    discard: MahjongTile[]
    melding: MahjongTile[]
    gameState: GameState
}

export type Size = "sm" | "md" | "lg"

export type MahjongHandSet = {
    numbers: string[];
    suit: "G" | "R" | "B";
};

export type MahjongHand = {
    section: string;
    sets: MahjongHandSet[];
    text: string;
    value: number;
    concealed: boolean;
};
