export type MahjongTile = { 
    suit: string
    number?: number | string 
    id: string
}

export const GAP = "" as const

export type MahjongTileRow = Array<MahjongTile | typeof GAP>

export type MahjongHand = {
    exposed: MahjongTileRow
    unexposed: MahjongTileRow
}

export type MahjongData = {
    hands: MahjongHand[]
    wall: MahjongTile[]
    discard: MahjongTile[]
}

export type Size = "sm" | "md" | "lg"

export type MahjongHandSet = {
    numbers: string[];
    suit: "G" | "R" | "B";
};

export type MahjongHandData = {
    section: string;
    sets: MahjongHandSet[];
    text: string;
    value: number;
    concealed: boolean;
};
