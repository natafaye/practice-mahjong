import { describe, expect, it } from "vitest";
import { getUnseenTileCounts } from "../getWinWithHandChance/getUnseenTileCounts";
import { createTile, createFlower, createJoker } from "./testUtilities";
import { DOTS, BAMS, CRAKS, FLOWER_SUIT, JOKER_SUIT, WIND_SUIT } from "../../constants";
import type { MahjongPlayer } from "../../types";

describe("getUnseenTileCounts", () => {
  const createBasePlayers = (): MahjongPlayer[] => [
    { index: 0, concealed: [], exposed: [] },
    { index: 1, concealed: [], exposed: [] },
    { index: 2, concealed: [], exposed: [] },
    { index: 3, concealed: [], exposed: [] },
  ];

  it("should start with 4 of each suit tile and 8 of flowers/jokers", () => {
    const players = createBasePlayers();
    const [counts] = getUnseenTileCounts(players, 0, []);

    expect(counts.get(`${DOTS}_1`)).toBe(4);
    expect(counts.get(`${BAMS}_9`)).toBe(4);
    expect(counts.get(`${CRAKS}_D`)).toBe(4);
    expect(counts.get(`${WIND_SUIT}_N`)).toBe(4);
    expect(counts.get(`${FLOWER_SUIT}_`)).toBe(8);
    expect(counts.get(`${JOKER_SUIT}_`)).toBe(8);
  });

  it("should decrement counts for discards", () => {
    const players = createBasePlayers();
    const discard = [createTile(DOTS, 1), createTile(DOTS, 1)];
    const [counts] = getUnseenTileCounts(players, 0, discard);

    expect(counts.get(`${DOTS}_1`)).toBe(2);
  });

  it("should decrement counts for any player's exposed tiles", () => {
    const players = createBasePlayers();
    players[1].exposed = [createTile(BAMS, 5)];
    players[2].exposed = [createTile(BAMS, 5)];
    const [counts] = getUnseenTileCounts(players, 0, []);

    expect(counts.get(`${BAMS}_5`)).toBe(2);
  });

  it("should decrement counts for the current player's concealed tiles", () => {
    const players = createBasePlayers();
    players[0].concealed = [createTile(CRAKS, 2), createTile(CRAKS, 2)];
    const [counts] = getUnseenTileCounts(players, 0, []);

    expect(counts.get(`${CRAKS}_2`)).toBe(2);
  });

  it("should NOT decrement counts for other players' concealed tiles", () => {
    const players = createBasePlayers();
    players[1].concealed = [createTile(DOTS, 8)];
    const [counts] = getUnseenTileCounts(players, 0, []);

    expect(counts.get(`${DOTS}_8`)).toBe(4);
  });

  it("should handle flowers and jokers correctly", () => {
    const players = createBasePlayers();
    players[0].concealed = [createFlower(), createJoker()];
    const discard = [createFlower()];
    players[3].exposed = [createJoker()];
    
    const [counts] = getUnseenTileCounts(players, 0, discard);

    expect(counts.get(`${FLOWER_SUIT}_`)).toBe(6);
    expect(counts.get(`${JOKER_SUIT}_`)).toBe(6);
  });
});
