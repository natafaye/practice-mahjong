import { describe, expect, it } from "vitest";
import { pickDiscardIndexes } from "../pickDiscardIndexes";
import { createMeld, createTile, createJoker } from "../../../_shared/tests/testUtilities";
import { DOTS, BAMS } from "../../../constants";
import type { MahjongGameData, MahjongPlayer } from "../../../types";

describe("pickDiscardIndexes", () => {
  const mockState = (): MahjongGameData => ({
    cardName: "2025",
    seed: "test-seed",
    players: [],
  } as Partial<MahjongGameData> as MahjongGameData);

  it("should pick a tile from leftovers", () => {
    // Hand 2025_4: 222 (B), 4444 (B), 666 (B), 8888 (B)
    const matchedTiles = [
        ...createMeld(DOTS, "222"),
        ...createMeld(DOTS, "4444"),
        ...createMeld(DOTS, "666"),
    ];
    const junkTile = createTile(BAMS, "9"); // This should be a leftover
    
    const player: MahjongPlayer = {
      index: 0,
      concealed: [...matchedTiles, junkTile],
      exposed: [],
    };
    
    const state = mockState();
    const result = pickDiscardIndexes(player, 1, state);
    
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(10); // Index of the junk tile
  });

  it("should pick multiple tiles from leftovers", () => {
    const matchedTiles = [
      ...createMeld(DOTS, "222"),
      ...createMeld(DOTS, "333"),
      ...createMeld(DOTS, "4444")
    ];
    const junkTiles = [
        createTile(BAMS, "1"),
        createTile(BAMS, "2"),
        createTile(BAMS, "3"),
    ];
    
    const player: MahjongPlayer = {
      index: 0,
      concealed: [...matchedTiles, ...junkTiles],
      exposed: [],
    };
    
    const state = mockState();
    const result = pickDiscardIndexes(player, 3, state);
    
    expect(result).toHaveLength(3);
    expect(result).toContain(10);
    expect(result).toContain(11);
    expect(result).toContain(12);
  });

  it("should pick random tiles if no leftovers are available", () => {
    // Fully matched hand
    const player: MahjongPlayer = {
      index: 0,
      concealed: [
        ...createMeld(DOTS, "222"),
        ...createMeld(DOTS, "4444"),
        ...createMeld(DOTS, "666"),
        ...createMeld(DOTS, "8888"),
      ],
      exposed: [],
    };
    
    const state = mockState();
    const result = pickDiscardIndexes(player, 1, state);
    
    expect(result).toHaveLength(1);
    expect(result[0]).toBeGreaterThanOrEqual(0);
    expect(result[0]).toBeLessThan(14);
  });

  it("should NOT pick a joker if allowJokers is false", () => {
    const matchedTiles = [
      ...createMeld(DOTS, "11"),
      ...createMeld(DOTS, "22"),
      ...createMeld(DOTS, "33"),
      ...createMeld(DOTS, "44"),
      ...createMeld(DOTS, "55"),
      ...createMeld(DOTS, "66"),
      ...createMeld(DOTS, "7"),
    ]
    const joker = createJoker();
    
    const player: MahjongPlayer = {
      index: 0,
      concealed: [...matchedTiles, joker],
      exposed: [],
    };

    const state = mockState();
    const result = pickDiscardIndexes(player, 1, state, false, false);
    
    expect(result).toHaveLength(1);
    expect(player.concealed[result[0]]).not.toEqual(joker);
    expect(result[0]).toBeLessThan(13); // Should be one of the matched 2s
  });

  it("should return fewer tiles if isAmountVariable is true and there are few leftovers", () => {
    const matchedTiles = createMeld(DOTS, "222");
    const junkTile = createTile(BAMS, "9");
    
    const player: MahjongPlayer = {
      index: 0,
      concealed: [...matchedTiles, junkTile],
      exposed: [],
    };
    
    // Requesting 3 discards, but only 1 leftover. isAmountVariable=true should return only 1.
    const state = mockState();
    const result = pickDiscardIndexes(player, 3, state, true);
    
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(3); // Index of the junk tile
  });

  it("should respect the amount limit even if there are more leftovers", () => {
    const junkTiles = [
        createTile(BAMS, "1"),
        createTile(BAMS, "2"),
        createTile(BAMS, "3"),
    ];
    
    const player: MahjongPlayer = {
      index: 0,
      concealed: junkTiles,
      exposed: [],
    };
    
    const state = mockState();
    const result = pickDiscardIndexes(player, 1, state);
    
    expect(result).toHaveLength(1);
    expect([0, 1, 2]).toContain(result[0]);
  });
});
