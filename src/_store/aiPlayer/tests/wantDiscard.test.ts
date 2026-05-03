import { describe, expect, it } from "vitest";
import { wantDiscard } from "../wantDiscard";
import { createMeld, createTile, createFlower, createJoker } from "../../../_shared/tests/testUtilities";
import { BAMS, CRAKS, DOTS, FLOWER_SUIT } from "../../../constants";
import type { MahjongGameData, MahjongPlayer, MahjongTile } from "../../../types";

describe("wantDiscard", () => {
  const mockState = (discardTile: MahjongTile): MahjongGameData => ({
    cardName: "2025",
    discard: [discardTile],
    players: [],
  } as Partial<MahjongGameData> as MahjongGameData);

  it("should return undefined if the discard is a Joker", () => {
    const player: MahjongPlayer = {
      index: 0,
      concealed: createMeld(DOTS, "11"),
      exposed: [],
    };
    const state = mockState(createJoker());
    expect(wantDiscard(player, state)).toBeUndefined();
  });

  it("should return tileIndexes for Mahjong", () => {
    // Hand 2025_4: 222 (B), 4444 (B), 666 (B), 8888 (B)
    const player: MahjongPlayer = {
      index: 0,
      concealed: [
        ...createMeld(DOTS, "222"),
        ...createMeld(DOTS, "4444"),
        ...createMeld(DOTS, "666"),
        ...createMeld(DOTS, "888"), // Missing one 8
      ],
      exposed: [],
    };
    const discard = createTile(DOTS, "8");
    const state = mockState(discard);
    const result = wantDiscard(player, state);
    expect(result).toBeDefined();
    expect(result?.tileIndexes).toEqual([]);
  });

  it("should return tileIndexes to complete a Kong (callable meld)", () => {
    // Hand 2025_4: 222 (B), 4444 (B), 666 (B), 8888 (B)
    const player: MahjongPlayer = {
      index: 0,
      concealed: [
        ...createMeld(DOTS, "222"),
        ...createMeld(DOTS, "444"), // Missing one 4
        ...createMeld(DOTS, "66"),  // Missing one 6
      ],
      exposed: [],
    };
    // Indexes: 222 [0,1,2], 444 [3,4,5], 66 [6,7]
    const discard = createTile(DOTS, "4");
    const state = mockState(discard);
    const result = wantDiscard(player, state);
    expect(result).toBeDefined();
    expect(result?.tileIndexes).toEqual([3, 4, 5]);
  });

  it("should NOT call for a Pair (non-callable meld)", () => {
    // Hand 2025_6: FF (pair), 2222 (G), 4444 (R), 6666 (B)
    const player: MahjongPlayer = {
      index: 0,
      concealed: [
        createFlower(), // Missing one Flower
        ...createMeld(BAMS, "2222"),
        ...createMeld(CRAKS, "444"), // Missing one 4
        ...createMeld(DOTS, "666"), // Missing one 6
      ],
      exposed: [],
    };
    const discard = createFlower();
    const state = mockState(discard);
    const result = wantDiscard(player, state);
    expect(result).toBeUndefined();
  });

  it("should NOT call for a meld if the hand is concealed", () => {
    // Hand 2025_3: FF, 222, 000, 222, 555 (CONCEALED)
    const player: MahjongPlayer = {
      index: 0,
      concealed: [
        ...createMeld(FLOWER_SUIT, "FF"),
        ...createMeld(BAMS, "222"),
        ...createMeld(DOTS, "000"),
        ...createMeld(CRAKS, "22"), // Missing one 2
        ...createMeld(CRAKS, "55"), // Missing one 5
      ],
      exposed: [],
    };
    const discard = createTile(CRAKS, "2");
    const state = mockState(discard);
    const result = wantDiscard(player, state);
    // Even though it completes a Pung, the hand is concealed so we can't call unless it's Mahjong
    expect(result).toBeUndefined();
  });

  it("should NOT call if it doesn't increase match count", () => {
    // Already have 222 (B), needing 4444 (B), 666 (B), 8888 (B)
    const player: MahjongPlayer = {
      index: 0,
      concealed: [
        ...createMeld(DOTS, "222"),
        ...createMeld(DOTS, "444"), // Missing one 4
        ...createMeld(DOTS, "666"),
      ],
      exposed: [],
    };
    // Discard is another "2". We already have a complete Pung of 2s.
    const discard = createTile(DOTS, "2");
    const state = mockState(discard);
    const result = wantDiscard(player, state);
    expect(result).toBeUndefined();
  });
});
