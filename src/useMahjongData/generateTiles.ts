import type { MahjongTile } from "../types";

const SUITS = ["🎍", "🔵", "中"]
const WIND_SUIT = "🍃"
const WINDS = ["N", "E", "W", "S"]
export const FLOWERS = ["🌸", "💮", "🌷", "🪻", "🌼", "🌻", "🌹", "🏵️"]
export const JOKER_SUIT = "🦄"

export const generateTiles = () => {
	const tiles: MahjongTile[] = [];

	// Four of each
	for (let j = 0; j < 4; j++) {
		// Three suits
		for (const suit of SUITS) {
			// Nine numbers
			for (let i = 1; i <= 9; i++) {
				tiles.push({ suit, number: i, id: suit + i + j });
			}
			// Dragons
			tiles.push({ suit, number: "D", id: suit + "D" + j });
		}

		// Winds
		for (const wind of WINDS) {
			tiles.push({ suit: WIND_SUIT, number: wind, id: WIND_SUIT + wind + j })
		}
	}

	// Flowers
	for (const flower of FLOWERS) {
		tiles.push({ suit: flower, id: flower })
	}

	// Jokers
	for(let i = 0; i < 8; i++) {
		tiles.push({ suit: JOKER_SUIT, id: JOKER_SUIT + i })
	}

	return tiles
};
