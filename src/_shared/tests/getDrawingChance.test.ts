import { describe, expect, it } from "vitest";
import { getDrawingChance } from "../getWinWithHandChance/getDrawingChance";

describe("getDrawingChance", () => {
  it("should return 0 if more tiles are needed than turns left", () => {
    const neededTiles = [
      { tileKey: "DOTS_1", totalNeeded: 3, nonCallable: 0, callable: 3 }
    ];
    const unseenTileCounts = new Map([["DOTS_1", 4]]);
    const totalUnseenTiles = 100;
    const thisPlayerTurnsLeft = 2;

    expect(getDrawingChance(neededTiles, unseenTileCounts, totalUnseenTiles, thisPlayerTurnsLeft)).toBe(0);
  });

  it("should return 0 if a needed tile is not available and there are no jokers", () => {
    const neededTiles = [
      { tileKey: "DOTS_1", totalNeeded: 1, nonCallable: 0, callable: 1 }
    ];
    const unseenTileCounts = new Map([["DOTS_1", 0]]);
    const totalUnseenTiles = 100;
    const thisPlayerTurnsLeft = 10;

    expect(getDrawingChance(neededTiles, unseenTileCounts, totalUnseenTiles, thisPlayerTurnsLeft)).toBe(0);
  });

  it("should return 1.0 if 0 tiles are needed", () => {
    const neededTiles: any[] = [];
    const unseenTileCounts = new Map();
    const totalUnseenTiles = 100;
    const thisPlayerTurnsLeft = 10;

    expect(getDrawingChance(neededTiles, unseenTileCounts, totalUnseenTiles, thisPlayerTurnsLeft)).toBe(1);
  });

  it("should calculate correct probability for a single needed tile (Exactly 1)", () => {
    // If we need 1 DOTS_1, and there is 1 available, and we have 1 turn, and 1 total tile
    const neededTiles = [
      { tileKey: "DOTS_1", totalNeeded: 1, nonCallable: 0, callable: 1 }
    ];
    const unseenTileCounts = new Map([["DOTS_1", 1]]);
    const totalUnseenTiles = 1;
    const thisPlayerTurnsLeft = 1;

    expect(getDrawingChance(neededTiles, unseenTileCounts, totalUnseenTiles, thisPlayerTurnsLeft)).toBe(1);
  });

  it("should calculate correct probability for drawing 1 tile in 2 turns", () => {
    // Need 1 DOTS_1, 1 available, 2 total tiles, 2 turns
    const neededTiles = [
      { tileKey: "DOTS_1", totalNeeded: 1, nonCallable: 0, callable: 1 }
    ];
    const unseenTileCounts = new Map([["DOTS_1", 1]]);
    const totalUnseenTiles = 2;
    const thisPlayerTurnsLeft = 2;

    expect(getDrawingChance(neededTiles, unseenTileCounts, totalUnseenTiles, thisPlayerTurnsLeft)).toBe(1);
  });

  it("should handle joker substitution", () => {
    // Need 1 DOTS_1, 0 available, 1 Joker available, 1 turn
    // generateCombosForDrawingJokers should produce a combo that uses the joker.
    // Combo 1 (0 jokers used): {DOTS_1: 1, JOKER_: 0} -> dead (0 DOTS_1 avail)
    // Combo 2 (1 joker used):  {DOTS_1: 0, JOKER_: 1} -> success!
    // So there's a 100% chance, because we have a 100% chance of drawing the joker
    const neededTiles = [
      { tileKey: "DOTS_1", totalNeeded: 1, nonCallable: 0, callable: 1 }
    ];
    const unseenTileCounts = new Map([
      ["DOTS_1", 0],
      ["JOKER_", 1]
    ]);
    const totalUnseenTiles = 1;
    const thisPlayerTurnsLeft = 1;

    const chance = getDrawingChance(neededTiles, unseenTileCounts, totalUnseenTiles, thisPlayerTurnsLeft);
    expect(chance).toBe(1);
  });

  it("should return higher chance if more of a tile is available", () => {
    const neededTiles = [
      { tileKey: "DOTS_1", totalNeeded: 1, nonCallable: 0, callable: 1 }
    ];
    const totalUnseenTiles = 100;
    const thisPlayerTurnsLeft = 10;

    const chance1 = getDrawingChance(neededTiles, new Map([["DOTS_1", 1]]), totalUnseenTiles, thisPlayerTurnsLeft);
    const chance2 = getDrawingChance(neededTiles, new Map([["DOTS_1", 4]]), totalUnseenTiles, thisPlayerTurnsLeft);

    expect(chance2).toBeGreaterThan(chance1);
  });

  it("should return higher chance if more turns are left", () => {
    const neededTiles = [
      { tileKey: "DOTS_1", totalNeeded: 1, nonCallable: 0, callable: 1 }
    ];
    const unseenTileCounts = new Map([["DOTS_1", 4]]);
    const totalUnseenTiles = 100;

    const chance1 = getDrawingChance(neededTiles, unseenTileCounts, totalUnseenTiles, 5);
    const chance2 = getDrawingChance(neededTiles, unseenTileCounts, totalUnseenTiles, 10);

    expect(chance2).toBeGreaterThan(chance1);
  });

  it("should NOT return a probability greater than 1", () => {
    // Scenario:
    // 3 tiles left in total (A, B, C)
    // 2 turns left for the player
    // Player needs EITHER tile A OR tile B to win.
    // Combinations of 2 from {A, B, C}: {A,B}, {A,C}, {B,C}
    // All 3 combinations contain either A or B, so win chance is 100% (1.0).
    
    const neededTiles = [
      { tileKey: "TILE_A", totalNeeded: 1, nonCallable: 0, callable: 1 }
    ];
    const unseenTileCounts = new Map([
      ["TILE_A", 1],
      ["TILE_B", 1], // Not needed for the "base" hand, but can be substituted via Joker logic
      ["JOKER_", 1]  // TILE_B will be substituted by this Joker in Combo 2
    ]);
    
    // In this specific setup:
    // Combo 1: Need TILE_A. P = nCr(1,1)*nCr(3-1, 2-1)/nCr(3,2) = 1*2/3 = 0.666...
    // Combo 2: Need JOKER (substituting for TILE_A). P = nCr(1,1)*nCr(3-1, 2-1)/nCr(3,2) = 0.666...
    // Total = 1.333...
    
    const totalUnseenTiles = 3;
    const thisPlayerTurnsLeft = 2;

    const chance = getDrawingChance(neededTiles, unseenTileCounts, totalUnseenTiles, thisPlayerTurnsLeft);
    
    // This expectation will FAIL currently because the result will be ~1.33
    expect(chance).toBeLessThanOrEqual(1);
  });

  it("should count drawing 'more than enough' as a win", () => {
    // Scenario:
    // 3 tiles left in the wall: [Flower, Flower, Junk]
    // You have 2 turns.
    // You need 1 Flower to win.
    
    // Possible draws of 2 tiles from 3:
    // 1. [Flower1, Flower2] -> Win! (You have the 1 you need)
    // 2. [Flower1, Junk]    -> Win!
    // 3. [Flower2, Junk]    -> Win!
    // There are NO losing draws. Win chance should be 1.0.

    const neededTiles = [
      { tileKey: "FLOWER", totalNeeded: 1, nonCallable: 0, callable: 1 }
    ];
    const unseenTileCounts = new Map([["FLOWER", 2]]);
    const totalUnseenTiles = 3;
    const thisPlayerTurnsLeft = 2;

    const chance = getDrawingChance(neededTiles, unseenTileCounts, totalUnseenTiles, thisPlayerTurnsLeft);
    
    // CURRENT CODE will return 0.666 (it only counts drawing EXACTLY 1 Flower)
    // It should be 1.0
    expect(chance).toBe(1);
  });
});
