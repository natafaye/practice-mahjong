import type { MahjongHandData, MahjongHandSet, MahjongTile } from "../types";
import { FLOWERS, JOKER_SUIT } from "./generateTiles";

// Types matching your dataset structure


// Helper: Get all permutations of game suits mapped to G, R, B
const getSuitPermutations = () => [
    { G: "🎍", R: "🔵", B: "中" },
    { G: "🎍", R: "中", B: "🔵" },
    { G: "🔵", R: "🎍", B: "中" },
    { G: "🔵", R: "中", B: "🎍" },
    { G: "中", R: "🎍", B: "🔵" },
    { G: "中", R: "🔵", B: "🎍" },
];

// Helper: Cartesian product to get all combinations of number choices across sets
const getNumberCombinations = (sets: MahjongHandSet[]): string[][] => {
    return sets.reduce<string[][]>((acc, set) => {
        const nextAcc: string[][] = [];
        for (const existing of acc) {
            for (const numberOption of set.numbers) {
                nextAcc.push([...existing, numberOption]);
            }
        }
        return nextAcc;
    }, [[]]);
};

// Main matching function
export const checkHandMatch = (playerTiles: MahjongTile[], targetHand: MahjongHandData): number => {
    // 1. Convert player hand to an inventory map
    const baseInventory: Record<string, number> = {};
    
    for (const tile of playerTiles) {
        let key = "";
        if (tile.suit === JOKER_SUIT) {
            key = "JOKER";
        } else if (FLOWERS.includes(tile.suit)) {
            key = "FLOWER";
        } else {
            key = `${tile.suit}_${tile.number}`;
        }
        baseInventory[key] = (baseInventory[key] || 0) + 1;
    }

    let maxMatchedTiles = 0;
    const suitPermutations = getSuitPermutations();
    const targetNumberCombinations = getNumberCombinations(targetHand.sets);

    // 2. Brute force all suit assignments and number string choices
    for (const colorMap of suitPermutations) {
        for (const numberCombo of targetNumberCombinations) {
            // Clone inventory for this simulation
            const inventory = { ...baseInventory };
            let currentMatchCount = 0;

            // 3. Evaluate each set in the current combination
            for (let i = 0; i < numberCombo.length; i++) {
                const reqString = numberCombo[i];
                const setSuitColor = targetHand.sets[i].suit as "G" | "R" | "B";
                
                // Group characters in the requirement string (e.g. "2026" -> {'2':2, '0':1, '6':1})
                const charCounts: Record<string, number> = {};
                for (const char of reqString) {
                    charCounts[char] = (charCounts[char] || 0) + 1;
                }

                // 4. Match tiles against each required character group
                for (const [char, reqCount] of Object.entries(charCounts)) {
                    let reqKey = "";

                    // Determine what physical tile this character requires
                    if (char === "F") {
                        reqKey = "FLOWER";
                    } else if (char === "0") {
                        reqKey = `🔵_D`; // "0" is the White Dragon (Soap), standardly the Dots Dragon
                    } else if (["N", "E", "W", "S"].includes(char)) {
                        reqKey = `🍃_${char}`;
                    } else if (char === "D") {
                        reqKey = `${colorMap[setSuitColor]}_D`;
                    } else {
                        reqKey = `${colorMap[setSuitColor]}_${char}`;
                    }

                    // Use natural tiles first
                    const availableNatural = inventory[reqKey] || 0;
                    const usedNatural = Math.min(availableNatural, reqCount);
                    inventory[reqKey] -= usedNatural;
                    currentMatchCount += usedNatural;

                    // If natural tiles aren't enough, see if we can use Jokers
                    const missing = reqCount - usedNatural;
                    if (missing > 0) {
                        // NMJL Rule: Jokers can only be used in Pungs (3), Kongs (4), Quints (5), etc.
                        if (reqCount >= 3) {
                            const availableJokers = inventory["JOKER"] || 0;
                            const usedJokers = Math.min(availableJokers, missing);
                            inventory["JOKER"] -= usedJokers;
                            currentMatchCount += usedJokers;
                        }
                    }
                }
            }

            // Keep track of the permutation that yielded the highest match
            if (currentMatchCount > maxMatchedTiles) {
                maxMatchedTiles = currentMatchCount;
            }
        }
    }

    return maxMatchedTiles;
};