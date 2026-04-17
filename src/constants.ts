// Gap
export const GAPS = ["gap_1", "gap_2", "gap_3", "gap_4", "gap_5", "gap_6"] as const
export const PASSING_GAPS = ["gap_7", "gap_8", "gap_9"]
export const EXPOSED_GAP = "" as const

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
export const CHARLESTONS = ["RIGHT_N_1", "OVER_N_1", "LEFT_B_1", "LEFT_N_2", "OVER_N_2", "RIGHT_B_2", "OVER_C_3"]
export const DRAWING = "DRAWING" as const;
export const MELDING = "MELDING" as const;
export const PLAYING = "PLAYING" as const;
export const DISCARD = "DISCARD" as const;
export const DISCARD_AI = "DISCARD_AI" as const;
export const GAME_OVER = "GAME_OVER" as const;
export const GAME_STATES = [...CHARLESTONS, DRAWING, MELDING, PLAYING, DISCARD, DISCARD_AI, GAME_OVER] as const

// Charleston State Legend
export const RIGHT = "RIGHT"
export const OVER = "OVER"
export const LEFT = "LEFT"
export const NORMAL_PASS = "N"
export const BLIND_PASS = "B"
export const COURTESY_PASS = "C"
