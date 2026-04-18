import { basicTileColors, basicTileImages } from "./basic"
import type { Theme } from "./types"

export const unicornTheme: Theme = {
  themeName: "unicorn",

  rackLight: "var(--color-cyan-600)",
  rackMid: "#0084a6",
  rackDark: "var(--color-cyan-700)",
  rackVeryDark: "var(--color-cyan-800)",

  tileLight: "var(--color-fuchsia-700)",
  tileDark: "var(--color-fuchsia-800)",

  tableLight: "var(--color-fuchsia-200)",
  tableMid: "var(--color-fuchsia-300)",
  tableDark: "var(--color-fuchsia-400)",
  tableVeryDark: "var(--color-fuchsia-600)",

  tileImages: basicTileImages,
  tileColors: basicTileColors,
  showJokerText: true
}


export const lavenderTheme: Theme = {
  themeName: "lavender",

  rackLight: "#ccabd8",
  rackMid: "#a890bc",
  rackDark: "#8474a1",
  rackVeryDark: "#6a5d81",

  tileLight: "#08979d",
  tileDark: "#06797c",

  tableLight: "#ccabd8",
  tableMid: "#8474a1",
  tableDark: "#8474a1",
  tableVeryDark: "#564b69",

  tileImages: basicTileImages,
  tileColors: basicTileColors,
  showJokerText: true
}

export const puceTheme: Theme = {
  themeName: "puce",

  rackLight: "#8e9c97",
  rackMid: "#79908a",
  rackDark: "#677d7d",
  rackVeryDark: "#586a6a",

  tileLight: "#b37f95",
  tileDark: "#b37f95",

  tableLight: "#d0b4ab",
  tableMid: "#ccaca1",
  tableDark: "#a38d89",
  tableVeryDark: "#000000",

  tileImages: basicTileImages,
  tileColors: basicTileColors,
  showJokerText: true
}


export const peachTheme: Theme = {
  themeName: "peach",

  rackLight: "color-mix(in srgb, #697f4e, white 8%)",
  rackMid: "#697f4e",
  rackDark: "color-mix(in srgb, #697f4e, black 10%)",
  rackVeryDark: "color-mix(in srgb, #697f4e, black 20%)",

  tileLight: "#a7585b",
  tileDark: "color-mix(in srgb, #a7585b, black 15%)",

  tableLight: "color-mix(in srgb, #eabbab, white 20%)",
  tableMid: "#eabbab",
  tableDark: "color-mix(in srgb, #eabbab, black 20%)",
  tableVeryDark: "color-mix(in srgb, #eabbab, black 40%)",

  tileImages: basicTileImages,
  tileColors: basicTileColors,
  showJokerText: true,
}

// Theme 1: Derived from Palette 1 (Soft Blues & Greens)
export const serenityTheme: Theme = {
    themeName: "serenity",

    rackLight: "color-mix(in srgb, #6B7D7D, white 8%)",
    rackMid: "#6B7D7D",
    rackDark: "color-mix(in srgb, #6B7D7D, black 10%)",
    rackVeryDark: "color-mix(in srgb, #6B7D7D, black 20%)",

    tileLight: "#C6CBBD",
    tileDark: "color-mix(in srgb, #C6CBBD, black 15%)",

    tableLight: "color-mix(in srgb, #E5E5E5, white 20%)",
    tableMid: "#E5E5E5",
    tableDark: "color-mix(in srgb, #E5E5E5, black 20%)",
    tableVeryDark: "color-mix(in srgb, #E5E5E5, black 40%)",

    tileImages: basicTileImages,
    tileColors: basicTileColors,
    showJokerText: true,
}

// Theme 2: Derived from Palette 2 (Pink & Red Tones)
export const blossomTheme: Theme = {
    themeName: "blossom",

    rackLight: "color-mix(in srgb, #DBC0C0, white 8%)",
    rackMid: "#DBC0C0",
    rackDark: "color-mix(in srgb, #DBC0C0, black 10%)",
    rackVeryDark: "color-mix(in srgb, #DBC0C0, black 20%)",

    tileLight: "#5A4B4B",
    tileDark: "color-mix(in srgb, #5A4B4B, black 15%)",

    tableLight: "color-mix(in srgb, #F2DED3, white 20%)",
    tableMid: "#F2DED3",
    tableDark: "color-mix(in srgb, #F2DED3, black 20%)",
    tableVeryDark: "color-mix(in srgb, #F2DED3, black 40%)",

    tileImages: basicTileImages,
    tileColors: basicTileColors,
    showJokerText: true,
}

// Theme 3: Derived from Palette 3 (Blues, Oranges, & Yellows)
export const coastTheme: Theme = {
    themeName: "coast",

    rackLight: "color-mix(in srgb, #6A8CA7, white 8%)",
    rackMid: "#6A8CA7",
    rackDark: "color-mix(in srgb, #6A8CA7, black 10%)",
    rackVeryDark: "color-mix(in srgb, #6A8CA7, black 20%)",

    tileLight: "#E8B180",
    tileDark: "color-mix(in srgb, #E8B180, black 15%)",

    tableLight: "color-mix(in srgb, #F8F1C3, white 20%)",
    tableMid: "#F8F1C3",
    tableDark: "color-mix(in srgb, #F8F1C3, black 20%)",
    tableVeryDark: "color-mix(in srgb, #F8F1C3, black 40%)",

    tileImages: basicTileImages,
    tileColors: basicTileColors,
    showJokerText: true,
}

// Theme 4: Derived from Palette 4 (Dark Greens & Earthy Browns)
export const natureTheme: Theme = {
    themeName: "nature",

    rackLight: "color-mix(in srgb, #4A5F4F, white 8%)",
    rackMid: "#4A5F4F",
    rackDark: "color-mix(in srgb, #4A5F4F, black 10%)",
    rackVeryDark: "color-mix(in srgb, #4A5F4F, black 20%)",

    tileLight: "#C7A65A",
    tileDark: "color-mix(in srgb, #C7A65A, black 15%)",

    tableLight: "color-mix(in srgb, #C9BD88, white 20%)",
    tableMid: "#C9BD88",
    tableDark: "color-mix(in srgb, #C9BD88, black 20%)",
    tableVeryDark: "color-mix(in srgb, #C9BD88, black 40%)",

    tileImages: basicTileImages,
    tileColors: basicTileColors,
    showJokerText: true,
}

// Theme 5: Derived from Palette 5 (Purples, Creams, & Greens)
export const springTheme: Theme = {
    themeName: "spring",

    rackLight: "color-mix(in srgb, #8D73A2, white 8%)",
    rackMid: "#8D73A2",
    rackDark: "color-mix(in srgb, #8D73A2, black 10%)",
    rackVeryDark: "color-mix(in srgb, #8D73A2, black 20%)",

    tileLight: "#8D9A69",
    tileDark: "color-mix(in srgb, #8D9A69, black 15%)",

    tableLight: "color-mix(in srgb, #EDE6CF, white 20%)",
    tableMid: "#EDE6CF",
    tableDark: "color-mix(in srgb, #EDE6CF, black 20%)",
    tableVeryDark: "color-mix(in srgb, #EDE6CF, black 40%)",

    tileImages: basicTileImages,
    tileColors: basicTileColors,
    showJokerText: true,
}

export const THEMES = [unicornTheme, lavenderTheme, puceTheme, peachTheme, natureTheme, coastTheme, springTheme, blossomTheme, serenityTheme]