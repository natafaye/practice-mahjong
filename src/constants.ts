// Gap
export const GAP = "" as const;

// Tiles
export const DOTS = "🔵"
export const BAMS = "🎍"
export const CRAKS = "中"
export const SUITS = [DOTS, BAMS, CRAKS]
export const WIND_SUIT = "🍃"
export const WINDS = ["N", "E", "W", "S"]
export const FLOWER_SUIT = "🌸" // ["🌸", "💮", "🌷", "🪻", "🌼", "🌻", "🌹", "🏵️"]
export const JOKER_SUIT = "🦄"
export const SUIT_ORDER = [FLOWER_SUIT, ...SUITS, JOKER_SUIT, WIND_SUIT]

// Players
export const THIS_PLAYER = 0

// Game States
export const DRAWING = "DRAWING" as const;
export const MELDING = "MELDING" as const;
export const PLAYING = "PLAYING" as const;
export const DISCARD = "DISCARD" as const;
export const DISCARD_AI = "DISCARD_AI" as const;
export const GAME_OVER = "GAME_OVER" as const;
export const GAME_STATES = [DRAWING, MELDING, PLAYING, DISCARD, DISCARD_AI, GAME_OVER] as const
