import { describe, expect, it } from "vitest";
import { createMeld } from "./testUtilities";
import { HANDS_2025 } from "../../useMahjongData/2025";
import { matchTilesToHand } from "../matchTilesToHand";
import { BAMS, CRAKS, DOTS } from "../../constants";


describe("matchTilesToHand", () => {
  describe("2025", () => {
    // FFFF 2025 222 555
    // Any 3 Suits, Like Pungs 2s or 5s in Opp. Suits
    const hand = HANDS_2025.find((h) => h.section === "2025")!; 

    it("should return 14 for a matching hand", () => {
      
      const tiles = [
        ...createMeld(CRAKS, "FFFF"),
        ...createMeld(DOTS, "2025"),
        ...createMeld(BAMS, "222"),
        ...createMeld(CRAKS, "222"),
      ];
      expect(matchTilesToHand(tiles, hand).matches).toBe(14);
    });

    it("should return number for a mismatched hand", () => {
      const tiles = [
        ...createMeld(CRAKS, "FFFF"),
        ...createMeld(DOTS, "2025"),
        ...createMeld(BAMS, "222"),
        ...createMeld(CRAKS, "555"), // Pungs have to match
      ];
      expect(matchTilesToHand(tiles, hand).matches).toBe(11);
    });
  });

  describe("2468", () => {
    // 222, 4444, 666, 8888 in 1 suit
    const hand = HANDS_2025.find((h) => h.section === "2468")!; 

    it("should return 14 for a matching hand", () => {
      const tiles = [
        ...createMeld(CRAKS, "222"),
        ...createMeld(CRAKS, "4444"),
        ...createMeld(CRAKS, "666"),
        ...createMeld(CRAKS, "8888"),
      ];
      expect(matchTilesToHand(tiles, hand).matches).toBe(14);
    });

    it("should return 13 when a tile is missing", () => {
      const tiles = [
        ...createMeld(CRAKS, "222"),
        ...createMeld(CRAKS, "4444"),
        ...createMeld(CRAKS, "666"),
        ...createMeld(CRAKS, "888"), // Only 3 eights
      ];
      expect(matchTilesToHand(tiles, hand).matches).toBe(13);
    });
  });

  describe("Any Like Numbers", () => {
    // FF (B), 1111 (G), D (G), 1111 (R), D (R), 11 (B)
    const hand = HANDS_2025.find((h) => h.section === "Any Like Numbers")!;

    it("should return 14 for a valid hand", () => {
      const tiles = [
        ...createMeld(CRAKS, "FF"),
        ...createMeld(DOTS, "1111"),
        ...createMeld(DOTS, "D"),
        ...createMeld(BAMS, "1111"),
        ...createMeld(BAMS, "D"),
        ...createMeld(CRAKS, "11"),
      ];
      expect(matchTilesToHand(tiles, hand).matches).toBe(14);
    });

    it("should return false when suits don't match the required pattern", () => {
      const tiles = [
        ...createMeld(CRAKS, "FF"), 
        ...createMeld(DOTS, "1111"),
        ...createMeld(DOTS, "D"),
        ...createMeld(BAMS, "1111"), 
        ...createMeld(BAMS, "D"),
        ...createMeld(BAMS, "11"),// Reused suit BAMS instead of CrakS
      ];
      expect(matchTilesToHand(tiles, hand).matches).toBe(12);
    });
  });

  describe("Quints", () => {
    // FF (B), 111 (G), 2222 (R), 33333 (B)
    const hand = HANDS_2025.find((h) => h.section === "Quints")!;

    it("should return 14 for a valid quint hand", () => {
      const tiles = [
        ...createMeld(CRAKS, "FF"),
        ...createMeld(DOTS, "111"),
        ...createMeld(BAMS, "2222"),
        ...createMeld(CRAKS, "33333"),
      ];
      expect(matchTilesToHand(tiles, hand).matches).toBe(14);
    });

    it("should return false for invalid consecutive numbers", () => {
      const tiles = [
        ...createMeld(CRAKS, "FF"),
        ...createMeld(DOTS, "111"),
        ...createMeld(BAMS, "2222"),
        ...createMeld(CRAKS, "44444"), // Skipped 3
      ];
      expect(matchTilesToHand(tiles, hand).matches).toBe(10);
    });
  });

  describe("Consecutive Run", () => {
    // 11, 222, 3333, 444, 55 in 1 suit
    const hand = HANDS_2025.find((h) => h.section === "Consecutive Run")!;

    it("should return 14 for a matching consecutive run", () => {
      const tiles = [
        ...createMeld(CRAKS, "11"),
        ...createMeld(CRAKS, "222"),
        ...createMeld(CRAKS, "3333"),
        ...createMeld(CRAKS, "444"),
        ...createMeld(CRAKS, "55"),
      ];
      expect(matchTilesToHand(tiles, hand).matches).toBe(14);
    });

    it("should return false if jokers are used incorrectly", () => {
      const tiles = [
        ...createMeld(CRAKS, "1J"),
        ...createMeld(CRAKS, "222"),
        ...createMeld(CRAKS, "3333"),
        ...createMeld(CRAKS, "444"),
        ...createMeld(CRAKS, "55"),
      ];
      expect(matchTilesToHand(tiles, hand).matches).toBe(13); 
    });
  });

  describe("13579", () => {
    // 11, 333, 5555, 777, 99 in 1 suit
    const hand = HANDS_2025.find((h) => h.section === "13579")!;

    it("should return 14 for a matching odds hand", () => {
      const tiles = [
        ...createMeld(CRAKS, "11"),
        ...createMeld(CRAKS, "333"),
        ...createMeld(CRAKS, "5555"),
        ...createMeld(CRAKS, "777"),
        ...createMeld(CRAKS, "99"),
      ];
      expect(matchTilesToHand(tiles, hand).matches).toBe(14);
    });

    it("should return false if evens are mixed in", () => {
      const tiles = [
        ...createMeld(CRAKS, "11"),
        ...createMeld(CRAKS, "333"),
        ...createMeld(CRAKS, "4444"),
        ...createMeld(CRAKS, "777"),
        ...createMeld(CRAKS, "99"),
      ];
      expect(matchTilesToHand(tiles, hand).matches).toBe(10);
    });
  });

  describe("Winds-Dragons", () => {
    // NNNN EEE WWW SSSS
    const hand = HANDS_2025.find((h) => h.section === "Winds-Dragons")!;

    it("should return 14 for a valid winds hand", () => {
      const tiles = [
        ...createMeld(CRAKS, "NNNN"),
        ...createMeld(CRAKS, "EEE"),
        ...createMeld(CRAKS, "WWW"),
        ...createMeld(CRAKS, "SSSS"),
      ];
      expect(matchTilesToHand(tiles, hand).matches).toBe(14);
    });

    it("should return false if a wind is the wrong length", () => {
      const tiles = [
        ...createMeld(CRAKS, "NNN"), // 3 instead of 4
        ...createMeld(CRAKS, "EEEE"), // 4 instead of 3
        ...createMeld(CRAKS, "WWW"),
        ...createMeld(CRAKS, "SSSS"),
      ];
      expect(matchTilesToHand(tiles, hand).matches).toBe(13);
    });
  });

  describe("369", () => {
    // 333 (G), 6666 (G), 666 (R), 9999 (R)
    const hand = HANDS_2025.find((h) => h.section === "369")!;

    it("should return 14 for a valid 369 hand", () => {
      const tiles = [
        ...createMeld(DOTS, "333"),
        ...createMeld(DOTS, "6666"),
        ...createMeld(BAMS, "666"),
        ...createMeld(BAMS, "9999"),
      ];
      expect(matchTilesToHand(tiles, hand).matches).toBe(14);
    });

    it("should return false if wrong numbers are provided", () => {
      const tiles = [
        ...createMeld(DOTS, "333"),
        ...createMeld(DOTS, "5555"), // Invalid number 5
        ...createMeld(BAMS, "666"),
        ...createMeld(BAMS, "9999"),
      ];
      expect(matchTilesToHand(tiles, hand).matches).toBe(10);
    });
  });

  describe("Singles and Pairs", () => {
    // NN, EW, SS, 11, 22, 33, 44
    const hand = HANDS_2025.find((h) => h.section === "Singles and Pairs")!;

    it("should return 14 for a valid singles and pairs hand", () => {
      const tiles = [
        ...createMeld(CRAKS, "NN"),
        ...createMeld(CRAKS, "EW"),
        ...createMeld(CRAKS, "SS"),
        ...createMeld(CRAKS, "11"),
        ...createMeld(CRAKS, "22"),
        ...createMeld(CRAKS, "33"),
        ...createMeld(CRAKS, "44"),
      ];
      expect(matchTilesToHand(tiles, hand).matches).toBe(14);
    });

    it("should return false if a pung is passed instead of pairs", () => {
      const tiles = [
        ...createMeld(CRAKS, "NN"),
        ...createMeld(CRAKS, "EW"),
        ...createMeld(CRAKS, "SS"),
        ...createMeld(CRAKS, "111"), // Pung instead of pair
        ...createMeld(CRAKS, "2"), // Single instead of pair
        ...createMeld(CRAKS, "33"),
        ...createMeld(CRAKS, "44"),
      ];
      expect(matchTilesToHand(tiles, hand).matches).toBe(13);
    });
  });
});