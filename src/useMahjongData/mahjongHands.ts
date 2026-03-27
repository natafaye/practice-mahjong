import type { MahjongHandData } from "../types";

export const mahjongHandSections = [
    "2025", "2468", "Any Like Numbers", "Quints", "Consecutive Run", 
    "13579", "Winds-Dragons", "369", "Singles and Pairs"
]

export const mahjongHands: MahjongHandData[] = [
    // #region 2025
    {
        section: "2025",
        sets: [
            { numbers: ["FFFF"], suit: "B" },
            { numbers: ["2026"], suit: "G" },
            { numbers: ["222", "555"], suit: "R" },
            { numbers: ["222", "555"], suit: "B" },
        ],
        text: "Any 3 Suits, Like Pungs 2s or 5s in Opp. Suits",
        value: 25,
        concealed: false
    },
    {
        section: "2025",
        sets: [
            { numbers: ["222"], suit: "G" },
            { numbers: ["0000"], suit: "B" },
            { numbers: ["222"], suit: "R" },
            { numbers: ["5555"], suit: "R" },
        ],
        text: "Any 2 Suits",
        value: 25,
        concealed: false
    },
    {
        section: "2025",
        sets: [
            { numbers: ["2025"], suit: "G" },
            { numbers: ["222"], suit: "R" },
            { numbers: ["555"], suit: "R" },
            { numbers: ["DDDD"], suit: "B" },
        ],
        text: "Any 3 Suits",
        value: 30,
        concealed: false
    },
    {
        section: "2025",
        sets: [
            { numbers: ["FF"], suit: "B" },
            { numbers: ["222"], suit: "G" },
            { numbers: ["000"], suit: "B" },
            { numbers: ["222"], suit: "R" },
            { numbers: ["555"], suit: "R" },
        ],
        text: "Any 3 Suits",
        value: 30,
        concealed: true
    },
    // #endregion

    // #region 2468
    {
        section: "2468",
        sets: [
            { numbers: ["222"], suit: "B" },
            { numbers: ["4444"], suit: "B" },
            { numbers: ["666"], suit: "B" },
            { numbers: ["8888"], suit: "B" },
        ],
        text: "Any 1 or 2 Suits",
        value: 25,
        concealed: false
    },
    {
        section: "2468",
        sets: [
            { numbers: ["222"], suit: "G" },
            { numbers: ["4444"], suit: "G" },
            { numbers: ["666"], suit: "R" },
            { numbers: ["8888"], suit: "R" },
        ],
        text: "Any 1 or 2 Suits",
        value: 25,
        concealed: false
    },
    {
        section: "2468",
        sets: [
            { numbers: ["FF"], suit: "B" },
            { numbers: ["2222"], suit: "G" },
            { numbers: ["4444"], suit: "R" },
            { numbers: ["6666"], suit: "B" },
        ],
        text: "Any 3 Suits",
        value: 25,
        concealed: false
    },
    {
        section: "2468",
        sets: [
            { numbers: ["FF"], suit: "B" },
            { numbers: ["2222"], suit: "G" },
            { numbers: ["6666"], suit: "R" },
            { numbers: ["8888"], suit: "B" },
        ],
        text: "Any 3 Suits",
        value: 25,
        concealed: false
    },
    {
        section: "2468",
        sets: [
            { numbers: ["22"], suit: "B" },
            { numbers: ["444"], suit: "B" },
            { numbers: ["66"], suit: "B" },
            { numbers: ["888"], suit: "B" },
            { numbers: ["DDDD"], suit: "B" },
        ],
        text: "Any 1 Suit",
        value: 25,
        concealed: false
    },
    {
        section: "2468",
        sets: [
            { numbers: ["FFFF"], suit: "B" },
            { numbers: ["2468"], suit: "G" },
            { numbers: ["222", "444", "666", "888"], suit: "R" },
            { numbers: ["222", "444", "666", "888"], suit: "R" },
        ],
        text: "Any 3 Suits, Like Pungs Any Even No.",
        value: 25,
        concealed: false
    },
    {
        section: "2468",
        sets: [
            { numbers: ["FFF"], suit: "B" },
            { numbers: ["22"], suit: "B" },
            { numbers: ["44"], suit: "B" },
            { numbers: ["666"], suit: "B" },
            { numbers: ["8888"], suit: "B" },
        ],
        text: "Any 1 Suit",
        value: 25,
        concealed: false
    },
    {
        section: "2468",
        sets: [
            { numbers: ["222"], suit: "G" },
            { numbers: ["4444"], suit: "G" },
            { numbers: ["666"], suit: "G" },
            { numbers: ["88"], suit: "R" },
            { numbers: ["88"], suit: "B" },
        ],
        text: "Any 3 Suits, Pairs 8s Only",
        value: 25,
        concealed: false
    },
    {
        section: "2468",
        sets: [
            { numbers: ["FF"], suit: "B" },
            { numbers: ["2222", "4444", "6666", "8888"], suit: "G" },
            { numbers: ["DDDD"], suit: "R" },
            { numbers: ["2222", "4444", "6666", "8888"], suit: "B" },
        ],
        text: "Any 3 Suits, Like Kongs Any Even No.",
        value: 25,
        concealed: false
    },
    {
        section: "2468",
        sets: [
            { numbers: ["22"], suit: "G" },
            { numbers: ["44"], suit: "G" },
            { numbers: ["66"], suit: "G" },
            { numbers: ["88"], suit: "G" },
            { numbers: ["222", "444", "666", "888"], suit: "R" },
            { numbers: ["222", "444", "666", "888"], suit: "R" },
        ],
        text: "Any 3 Suits, Like Pungs Any Even No.",
        value: 30,
        concealed: true
    },
    // #endregion

    // #region ANY LIKE NUMBERS
    {
        section: "Any Like Numbers",
        sets: [
            { numbers: ["FF"], suit: "B" },
            { numbers: ["1111", "2222", "3333", "4444", "5555", "6666", "7777", "8888", "9999"], suit: "G" },
            { numbers: ["D"], suit: "G" },
            { numbers: ["1111", "2222", "3333", "4444", "5555", "6666", "7777", "8888", "9999"], suit: "R" },
            { numbers: ["D"], suit: "R" },
            { numbers: ["11", "22", "33", "44", "55", "66", "77", "88", "99"], suit: "B" },
        ],
        text: "Any 3 Suits",
        value: 25,
        concealed: false
    },
    {
        section: "Any Like Numbers",
        sets: [
            { numbers: ["FFFF"], suit: "B" },
            { numbers: ["11", "22", "33", "44", "55", "66", "77", "88", "99"], suit: "G" },
            { numbers: ["111", "222", "333", "444", "555", "666", "777", "888", "999"], suit: "G" },
            { numbers: ["111", "222", "333", "444", "555", "666", "777", "888", "999"], suit: "B" },
            { numbers: ["11", "22", "33", "44", "55", "66", "77", "88", "99"], suit: "B" },
        ],
        text: "Any 3 Suits, Pairs Must Be Same Suit",
        value: 30,
        concealed: false
    },
    {
        section: "Any Like Numbers",
        sets: [
            { numbers: ["FF"], suit: "B" },
            { numbers: ["111", "222", "333", "444", "555", "666", "777", "888", "999"], suit: "B" },
            { numbers: ["111", "222", "333", "444", "555", "666", "777", "888", "999"], suit: "G" },
            { numbers: ["111", "222", "333", "444", "555", "666", "777", "888", "999"], suit: "R" },
            { numbers: ["DDD"], suit: "B" },
        ],
        text: "Any 3 Suits, Any Dragon",
        value: 30,
        concealed: true
    },
    // #endregion

    // #region QUINTS
    {
        section: "Quints",
        sets: [
            { numbers: ["FF"], suit: "B" },
            { numbers: ["111", "222", "333", "444", "555", "666", "777"], suit: "G" },
            { numbers: ["2222", "3333", "4444", "5555", "6666", "7777", "8888"], suit: "R" },
            { numbers: ["33333", "44444", "55555", "66666", "77777", "88888", "99999"], suit: "B" },
        ],
        text: "Any 3 Suits, Any 3 Consec. Nos.",
        value: 40,
        concealed: false
    },
    {
        section: "Quints",
        sets: [
            { numbers: ["11111", "22222", "33333", "44444", "55555", "66666", "77777", "88888"], suit: "B" },
            { numbers: ["NNNN", "EEEE", "WWWW", "SSSS"], suit: "B" },
            { numbers: ["22222", "33333", "44444", "55555", "66666", "77777", "88888", "99999"], suit: "B" },
        ],
        text: "Any 1 Suit, Any 2 Consec. Nos., Any Wind",
        value: 45,
        concealed: false
    },
    {
        section: "Quints",
        sets: [
            { numbers: ["FF"], suit: "B" },
            { numbers: ["11111", "22222", "33333", "44444", "55555", "66666", "77777", "88888", "99999"], suit: "G" },
            { numbers: ["11", "22", "33", "44", "55", "66", "77", "88", "99"], suit: "B" },
            { numbers: ["11111", "22222", "33333", "44444", "55555", "66666", "77777", "88888", "99999"], suit: "R" },
        ],
        text: "Any 3 Suits, Any Like Nos.",
        value: 45,
        concealed: false
    },
    // #endregion

    // #region CONSECUTIVE RUN
    {
        section: "Consecutive Run",
        sets: [
            { numbers: ["11"], suit: "B" },
            { numbers: ["222"], suit: "B" },
            { numbers: ["3333"], suit: "B" },
            { numbers: ["444"], suit: "B" },
            { numbers: ["55"], suit: "B" },
        ],
        text: "Any 1 Suit, These Nos. Only",
        value: 25,
        concealed: false
    },
    {
        section: "Consecutive Run",
        sets: [
            { numbers: ["55"], suit: "B" },
            { numbers: ["666"], suit: "B" },
            { numbers: ["7777"], suit: "B" },
            { numbers: ["888"], suit: "B" },
            { numbers: ["99"], suit: "B" },
        ],
        text: "Any 1 Suit, These Nos. Only",
        value: 25,
        concealed: false
    },
    {
        section: "Consecutive Run",
        sets: [
            { numbers: ["111", "222", "333", "444", "555", "666"], suit: "G" },
            { numbers: ["2222", "3333", "4444", "5555", "6666", "7777"], suit: "G" },
            { numbers: ["333", "444", "555", "666", "777", "888"], suit: "G" },
            { numbers: ["4444", "5555", "6666", "7777", "8888", "9999"], suit: "G" },
        ],
        text: "Any 1 or 2 Suits, Any 4 Consec. Nos.",
        value: 25,
        concealed: false
    },
    {
        section: "Consecutive Run",
        sets: [
            { numbers: ["111", "222", "333", "444", "555", "666"], suit: "G" },
            { numbers: ["2222", "3333", "4444", "5555", "6666", "7777"], suit: "G" },
            { numbers: ["333", "444", "555", "666", "777", "888"], suit: "R" },
            { numbers: ["4444", "5555", "6666", "7777", "8888", "9999"], suit: "R" },
        ],
        text: "Any 1 or 2 Suits, Any 4 Consec. Nos.",
        value: 25,
        concealed: false
    },
    {
        section: "Consecutive Run",
        sets: [
            { numbers: ["FFFF"], suit: "B" },
            { numbers: ["1111", "2222", "3333", "4444", "5555", "6666", "7777"], suit: "G" },
            { numbers: ["22", "33", "44", "55", "66", "77", "88"], suit: "G" },
            { numbers: ["3333", "4444", "5555", "6666", "7777", "8888", "9999"], suit: "G" },
        ],
        text: "Any 1 or 3 Suits, Any 3 Consec. Nos.",
        value: 25,
        concealed: false
    },
    {
        section: "Consecutive Run",
        sets: [
            { numbers: ["FFFF"], suit: "B" },
            { numbers: ["1111", "2222", "3333", "4444", "5555", "6666", "7777"], suit: "G" },
            { numbers: ["22", "33", "44", "55", "66", "77", "88"], suit: "R" },
            { numbers: ["3333", "4444", "5555", "6666", "7777", "8888", "9999"], suit: "B" },
        ],
        text: "Any 1 or 3 Suits, Any 3 Consec. Nos.",
        value: 25,
        concealed: false
    },
    {
        section: "Consecutive Run",
        sets: [
            { numbers: ["FFF"], suit: "B" },
            { numbers: ["123", "234", "345", "456", "567"], suit: "G" },
            { numbers: ["4444", "5555", "6666", "7777", "8888"], suit: "R" },
            { numbers: ["5555", "6666", "7777", "8888", "9999"], suit: "R" },
        ],
        text: "Any 3 Suits, Any 5 Consec. Nos.",
        value: 25,
        concealed: false
    },
    {
        section: "Consecutive Run",
        sets: [
            { numbers: ["FF"], suit: "B" },
            { numbers: ["11", "22", "33", "44", "55", "66", "77"], suit: "G" },
            { numbers: ["222", "333", "444", "555", "666", "777", "888"], suit: "G" },
            { numbers: ["3333", "4444", "5555", "6666", "7777", "8888", "9999"], suit: "G" },
            { numbers: ["DDD"], suit: "G" },
        ],
        text: "Any 1 Suit, Any 3 Consec. Nos.",
        value: 25,
        concealed: false
    },
    {
        section: "Consecutive Run",
        sets: [
            { numbers: ["111", "222", "333", "444", "555", "666", "777"], suit: "G" },
            { numbers: ["222", "333", "444", "555", "666", "777", "888"], suit: "G" },
            { numbers: ["3333", "4444", "5555", "6666", "7777", "8888", "9999"], suit: "G" },
            { numbers: ["DD"], suit: "R" },
            { numbers: ["DD"], suit: "B" },
        ],
        text: "Any 3 Suits, Any 3 Consec. Nos. w Opp. Dragons",
        value: 25,
        concealed: false
    },
    {
        section: "Consecutive Run",
        sets: [
            { numbers: ["112345", "223456", "334567", "445678", "556789"], suit: "G" },
            { numbers: ["1111", "2222", "3333", "4444", "5555"], suit: "R" },
            { numbers: ["1111", "2222", "3333", "4444", "5555"], suit: "B" },
        ],
        text: "Any 5 Consec. Nos., Pair Any No. in Run, Kongs Match Pair",
        value: 30,
        concealed: false
    },
    {
        section: "Consecutive Run",
        sets: [
            { numbers: ["FF"], suit: "B" },
            { numbers: ["1", "2", "3", "4", "5", "6", "7"], suit: "G" },
            { numbers: ["22", "33", "44", "55", "66", "77", "88"], suit: "G" },
            { numbers: ["333", "444", "555", "666", "777", "888", "999"], suit: "G" },
            { numbers: ["1", "2", "3", "4", "5", "6", "7"], suit: "R" },
            { numbers: ["22", "33", "44", "55", "66", "77", "88"], suit: "R" },
            { numbers: ["333", "444", "555", "666", "777", "888", "999"], suit: "R" },
        ],
        text: "Any 2 Suits, Any Same 3 Consec. Nos.",
        value: 30,
        concealed: true
    },
    // #endregion

    // #region 13579
    {
        section: "13579",
        sets: [
            { numbers: ["11"], suit: "B" },
            { numbers: ["333"], suit: "B" },
            { numbers: ["5555"], suit: "B" },
            { numbers: ["777"], suit: "B" },
            { numbers: ["99"], suit: "B" },
        ],
        text: "Any 1 or 3 Suits",
        value: 25,
        concealed: false
    },
    {
        section: "13579",
        sets: [
            { numbers: ["11"], suit: "G" },
            { numbers: ["333"], suit: "G" },
            { numbers: ["5555"], suit: "R" },
            { numbers: ["777"], suit: "B" },
            { numbers: ["99"], suit: "B" },
        ],
        text: "Any 1 or 3 Suits",
        value: 25,
        concealed: false
    },
    {
        section: "13579",
        sets: [
            { numbers: ["111"], suit: "G" },
            { numbers: ["3333"], suit: "G" },
            { numbers: ["333"], suit: "R" },
            { numbers: ["5555"], suit: "R" },
        ],
        text: "Any 2 Suits",
        value: 25,
        concealed: false
    },
    {
        section: "13579",
        sets: [
            { numbers: ["555"], suit: "G" },
            { numbers: ["7777"], suit: "G" },
            { numbers: ["777"], suit: "R" },
            { numbers: ["9999"], suit: "R" },
        ],
        text: "Any 2 Suits",
        value: 25,
        concealed: false
    },
    {
        section: "13579",
        sets: [
            { numbers: ["1111"], suit: "B" },
            { numbers: ["333"], suit: "B" },
            { numbers: ["5555"], suit: "B" },
            { numbers: ["DDD"], suit: "B" },
        ],
        text: "Any 1 Suit",
        value: 25,
        concealed: false
    },
    {
        section: "13579",
        sets: [
            { numbers: ["5555"], suit: "B" },
            { numbers: ["777"], suit: "B" },
            { numbers: ["9999"], suit: "B" },
            { numbers: ["DDD"], suit: "B" },
        ],
        text: "Any 1 Suit",
        value: 25,
        concealed: false
    },
    {
        section: "13579",
        sets: [
            { numbers: ["FFFF"], suit: "B" },
            { numbers: ["1111"], suit: "G" },
            { numbers: ["9999"], suit: "G" },
            { numbers: ["10"], suit: "R" },
        ],
        text: "Any 2 Suits, These Nos. Only",
        value: 25,
        concealed: false
    },
    {
        section: "13579",
        sets: [
            { numbers: ["FFF"], suit: "B" },
            { numbers: ["135"], suit: "B" },
            { numbers: ["7777"], suit: "B" },
            { numbers: ["9999"], suit: "B" },
        ],
        text: "Any 1 or 3 Suits",
        value: 25,
        concealed: false
    },
    {
        section: "13579",
        sets: [
            { numbers: ["FFF"], suit: "B" },
            { numbers: ["135"], suit: "G" },
            { numbers: ["7777"], suit: "R" },
            { numbers: ["9999"], suit: "B" },
        ],
        text: "Any 1 or 3 Suits",
        value: 25,
        concealed: false
    },
    {
        section: "13579",
        sets: [
            { numbers: ["111"], suit: "G" },
            { numbers: ["333"], suit: "G" },
            { numbers: ["5555"], suit: "G" },
            { numbers: ["DD"], suit: "R" },
            { numbers: ["DD"], suit: "B" },
        ],
        text: "Any 3 Suits w Opp. Dragons",
        value: 25,
        concealed: false
    },
    {
        section: "13579",
        sets: [
            { numbers: ["555"], suit: "G" },
            { numbers: ["777"], suit: "G" },
            { numbers: ["9999"], suit: "G" },
            { numbers: ["DD"], suit: "R" },
            { numbers: ["DD"], suit: "B" },
        ],
        text: "Any 3 Suits w Opp. Dragons",
        value: 25,
        concealed: false
    },
    {
        section: "13579",
        sets: [
            { numbers: ["11"], suit: "G" },
            { numbers: ["333"], suit: "G" },
            { numbers: ["NEWS"], suit: "B" },
            { numbers: ["333"], suit: "R" },
            { numbers: ["55"], suit: "R" },
        ],
        text: "Any 2 Suits",
        value: 30,
        concealed: false
    },
    {
        section: "13579",
        sets: [
            { numbers: ["55"], suit: "G" },
            { numbers: ["777"], suit: "G" },
            { numbers: ["NEWS"], suit: "B" },
            { numbers: ["777"], suit: "R" },
            { numbers: ["99"], suit: "R" },
        ],
        text: "Any 2 Suits",
        value: 30,
        concealed: false
    },
    {
        section: "13579",
        sets: [
            { numbers: ["1111"], suit: "G" },
            { numbers: ["33"], suit: "R" },
            { numbers: ["55"], suit: "R" },
            { numbers: ["77"], suit: "R" },
            { numbers: ["9999"], suit: "G" },
        ],
        text: "Any 2 Suits",
        value: 30,
        concealed: false
    },
    {
        section: "13579",
        sets: [
            { numbers: ["FF"], suit: "B" },
            { numbers: ["11"], suit: "G" },
            { numbers: ["33"], suit: "G" },
            { numbers: ["111"], suit: "R" },
            { numbers: ["333"], suit: "R" },
            { numbers: ["55"], suit: "R" },
        ],
        text: "Any 3 Suits",
        value: 30,
        concealed: true
    },
    {
        section: "13579",
        sets: [
            { numbers: ["FF"], suit: "B" },
            { numbers: ["55"], suit: "G" },
            { numbers: ["77"], suit: "G" },
            { numbers: ["555"], suit: "R" },
            { numbers: ["777"], suit: "R" },
            { numbers: ["99"], suit: "R" },
        ],
        text: "Any 3 Suits",
        value: 30,
        concealed: true
    },
    // #endregion

    // #region WINDS-DRAGONS
    {
        section: "Winds-Dragons",
        sets: [
            { numbers: ["NNNN"], suit: "B" },
            { numbers: ["EEE"], suit: "B" },
            { numbers: ["WWW"], suit: "B" },
            { numbers: ["SSSS"], suit: "B" },
        ],
        text: "",
        value: 25,
        concealed: false
    },
    {
        section: "Winds-Dragons",
        sets: [
            { numbers: ["FF"], suit: "B" },
            { numbers: ["123", "234", "345", "456", "567", "678", "789"], suit: "G" },
            { numbers: ["DD"], suit: "G" },
            { numbers: ["DDD"], suit: "B" },
            { numbers: ["DDDD"], suit: "R" },
        ],
        text: "Any 3 Consec. Nos. in Any 1 Suit, Any 3 Dragons",
        value: 25,
        concealed: false
    },
    {
        section: "Winds-Dragons",
        sets: [
            { numbers: ["FFF"], suit: "B" },
            { numbers: ["NN"], suit: "B" },
            { numbers: ["EE"], suit: "B" },
            { numbers: ["WWW"], suit: "B" },
            { numbers: ["SSSS"], suit: "B" },
        ],
        text: "",
        value: 25,
        concealed: false
    },
    {
        section: "Winds-Dragons",
        sets: [
            { numbers: ["FFFF"], suit: "B" },
            { numbers: ["DDD"], suit: "G" },
            { numbers: ["NEWS"], suit: "B" },
            { numbers: ["DDD"], suit: "R" },
        ],
        text: "Dragons Any 2 Suits",
        value: 25,
        concealed: false
    },
    {
        section: "Winds-Dragons",
        sets: [
            { numbers: ["NNNN"], suit: "B" },
            { numbers: ["1", "3", "5", "7", "9"], suit: "G" },
            { numbers: ["11", "33", "55", "77", "99"], suit: "R" },
            { numbers: ["111", "333", "555", "777", "999"], suit: "B" },
            { numbers: ["SSSS"], suit: "B" },
        ],
        text: "Any Like Odd Nos. in 3 Suits",
        value: 25,
        concealed: false
    },
    {
        section: "Winds-Dragons",
        sets: [
            { numbers: ["EEEE"], suit: "B" },
            { numbers: ["2", "4", "6", "8"], suit: "G" },
            { numbers: ["22", "44", "66", "88"], suit: "R" },
            { numbers: ["222", "444", "666", "888"], suit: "B" },
            { numbers: ["WWWW"], suit: "B" },
        ],
        text: "Any Like Even Nos. in 3 Suits",
        value: 25,
        concealed: false
    },
    {
        section: "Winds-Dragons",
        sets: [
            { numbers: ["NN"], suit: "B" },
            { numbers: ["EEE"], suit: "B" },
            { numbers: ["WWW"], suit: "B" },
            { numbers: ["SS"], suit: "B" },
            { numbers: ["2025"], suit: "G" },
        ],
        text: "2025 Any 1 Suit",
        value: 30,
        concealed: false
    },
    {
        section: "Winds-Dragons",
        sets: [
            { numbers: ["NNN"], suit: "B" },
            { numbers: ["EE"], suit: "B" },
            { numbers: ["WW"], suit: "B" },
            { numbers: ["SSS"], suit: "B" },
            { numbers: ["2025"], suit: "G" },
        ],
        text: "Any 1 Suit",
        value: 30,
        concealed: false
    },
    {
        section: "Winds-Dragons",
        sets: [
            { numbers: ["NN"], suit: "B" },
            { numbers: ["EE"], suit: "B" },
            { numbers: ["WWW"], suit: "B" },
            { numbers: ["SSS"], suit: "B" },
            { numbers: ["DDDD"], suit: "B" },
        ],
        text: "Kong Any Dragon",
        value: 30,
        concealed: true
    },
    // #endregion

    // #region 369
    {
        section: "369",
        sets: [
            { numbers: ["333"], suit: "G" },
            { numbers: ["6666"], suit: "G" },
            { numbers: ["666"], suit: "R" },
            { numbers: ["9999"], suit: "R" },
        ],
        text: "Any 2 or 3 Suits",
        value: 25,
        concealed: false
    },
    {
        section: "369",
        sets: [
            { numbers: ["333"], suit: "G" },
            { numbers: ["6666"], suit: "G" },
            { numbers: ["666"], suit: "R" },
            { numbers: ["9999"], suit: "B" },
        ],
        text: "Any 2 or 3 Suits",
        value: 25,
        concealed: false
    },
    {
        section: "369",
        sets: [
            { numbers: ["FF"], suit: "B" },
            { numbers: ["3333"], suit: "B" },
            { numbers: ["6666"], suit: "B" },
            { numbers: ["9999"], suit: "B" },
        ],
        text: "Any 1 or 3 Suits",
        value: 25,
        concealed: false
    },
    {
        section: "369",
        sets: [
            { numbers: ["FF"], suit: "B" },
            { numbers: ["3333"], suit: "G" },
            { numbers: ["6666"], suit: "R" },
            { numbers: ["9999"], suit: "B" },
        ],
        text: "Any 1 or 3 Suits",
        value: 25,
        concealed: false
    },
    {
        section: "369",
        sets: [
            { numbers: ["3333", "6666", "9999"], suit: "G" },
            { numbers: ["DDD"], suit: "G" },
            { numbers: ["3333", "6666", "9999"], suit: "R" },
            { numbers: ["DDD"], suit: "R" },
        ],
        text: "Any 2 Suits, Like Kongs 3, 6 or 9 w Matching Dragons",
        value: 25,
        concealed: false
    },
    {
        section: "369",
        sets: [
            { numbers: ["FFF"], suit: "B" },
            { numbers: ["3333"], suit: "G" },
            { numbers: ["369"], suit: "R" },
            { numbers: ["9999"], suit: "G" },
        ],
        text: "Any 2 Suits",
        value: 25,
        concealed: false
    },
    {
        section: "369",
        sets: [
            { numbers: ["33"], suit: "G" },
            { numbers: ["66"], suit: "G" },
            { numbers: ["99"], suit: "G" },
            { numbers: ["3333", "6666", "9999"], suit: "R" },
            { numbers: ["3333", "6666", "9999"], suit: "B" },
        ],
        text: "Any 3 Suits, Like Kongs 3, 6, or 9",
        value: 25,
        concealed: false
    },
    {
        section: "369",
        sets: [
            { numbers: ["FF"], suit: "B" },
            { numbers: ["333"], suit: "G" },
            { numbers: ["D"], suit: "G" },
            { numbers: ["666"], suit: "R" },
            { numbers: ["D"], suit: "R" },
            { numbers: ["999"], suit: "B" },
            { numbers: ["D"], suit: "B" },
        ],
        text: "Any 3 Suits w Matching Dragons",
        value: 30,
        concealed: true
    },
    // #endregion

    // #region SINGLES AND PAIRS
    {
        section: "Singles and Pairs",
        sets: [
            { numbers: ["NN"], suit: "B" },
            { numbers: ["EW"], suit: "B" },
            { numbers: ["SS"], suit: "B" },
            { numbers: ["11", "22", "33", "44", "55", "66"], suit: "B" },
            { numbers: ["22", "33", "44", "55", "66", "77"], suit: "B" },
            { numbers: ["33", "44", "55", "66", "77", "88"], suit: "B" },
            { numbers: ["44", "55", "66", "77", "88", "99"], suit: "B" },
        ],
        text: "Any 1 Suit, Any 4 Consec. Nos.",
        value: 50,
        concealed: true
    },
    {
        section: "Singles and Pairs",
        sets: [
            { numbers: ["FF"], suit: "B" },
            { numbers: ["2468"], suit: "G" },
            { numbers: ["DD"], suit: "G" },
            { numbers: ["2468"], suit: "R" },
            { numbers: ["DD"], suit: "R" },
        ],
        text: "Any 2 Suits w Matching Dragons",
        value: 50,
        concealed: true
    },
    {
        section: "Singles and Pairs",
        sets: [
            { numbers: ["33"], suit: "G" },
            { numbers: ["66"], suit: "G" },
            { numbers: ["99"], suit: "G" },
            { numbers: ["33"], suit: "R" },
            { numbers: ["66"], suit: "R" },
            { numbers: ["99"], suit: "R" },
            { numbers: ["33", "66", "99"], suit: "B" },
        ],
        text: "Any 3 Suits, Pair 3, 6, or 9 in Third Suit",
        value: 50,
        concealed: true
    },
    {
        section: "Singles and Pairs",
        sets: [
            { numbers: ["FF"], suit: "B" },
            { numbers: ["11", "22", "33", "44", "55", "66", "77", "88"], suit: "G" },
            { numbers: ["22", "33", "44", "55", "66", "77", "88", "99"], suit: "G" },
            { numbers: ["11", "22", "33", "44", "55", "66", "77", "88"], suit: "R" },
            { numbers: ["22", "33", "44", "55", "66", "77", "88", "99"], suit: "R" },
            { numbers: ["11", "22", "33", "44", "55", "66", "77", "88"], suit: "B" },
            { numbers: ["22", "33", "44", "55", "66", "77", "88", "99"], suit: "B" },
        ],
        text: "Any 3 Suits, Any 2 Consec. Nos.",
        value: 50,
        concealed: true
    },
    {
        section: "Singles and Pairs",
        sets: [
            { numbers: ["11"], suit: "G" },
            { numbers: ["33"], suit: "G" },
            { numbers: ["55"], suit: "G" },
            { numbers: ["77"], suit: "G" },
            { numbers: ["99"], suit: "G" },
            { numbers: ["11", "33", "55", "77", "99"], suit: "R" },
            { numbers: ["11", "33", "55", "77", "99"], suit: "B" },
        ],
        text: "Any 3 Suits, Pairs Any Like Odd Nos. in Opp.Suits",
        value: 50,
        concealed: true
    },
    {
        section: "Singles and Pairs",
        sets: [
            { numbers: ["FF"], suit: "B" },
            { numbers: ["2025"], suit: "G" },
            { numbers: ["2025"], suit: "R" },
            { numbers: ["2025"], suit: "B" },
        ],
        text: "Any 3 Suits",
        value: 75,
        concealed: true
    }
    // #endregion
]