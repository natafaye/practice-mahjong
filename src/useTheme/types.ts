export type TileColors = {
  [property: string]: string;
};

export type TileImages = {
  [property: string]: string | { [property: string | number]: string | null };
};

export type Theme = {
  themeName: string;

  rackLight: string;
  rackMid: string;
  rackDark: string;
  rackVeryDark: string;

  tileLight: string;
  tileDark: string;

  tableLight: string;
  tableMid: string;
  tableDark: string;
  tableVeryDark: string;

  tileImages: TileImages;
  tileColors: TileColors;
  showJokerText: boolean;
};
