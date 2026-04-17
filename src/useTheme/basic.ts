import { BAMS, CRAKS, DOTS, FLOWER_SUIT, JOKER_SUIT, WIND_SUIT } from "../constants";
import bam_1 from "./basic/bam_1.svg";
import bam_2 from "./basic/bam_2.svg";
import bam_3 from "./basic/bam_3.svg";
import bam_4 from "./basic/bam_4.svg";
import bam_5 from "./basic/bam_5.svg";
import bam_6 from "./basic/bam_6.svg";
import bam_7 from "./basic/bam_7.svg";
import bam_8 from "./basic/bam_8.svg";
import bam_9 from "./basic/bam_9.svg";
import bam_d from "./basic/bam_d.svg";
import crak_1 from "./basic/crak_1.svg";
import crak_2 from "./basic/crak_2.svg";
import crak_3 from "./basic/crak_3.svg";
import crak_4 from "./basic/crak_4.svg";
import crak_5 from "./basic/crak_5.svg";
import crak_6 from "./basic/crak_6.svg";
import crak_7 from "./basic/crak_7.svg";
import crak_8 from "./basic/crak_8.svg";
import crak_9 from "./basic/crak_9.svg";
import crak_d from "./basic/crak_d.svg";
import dot_1 from "./basic/dot_1.svg";
import dot_2 from "./basic/dot_2.svg";
import dot_3 from "./basic/dot_3.svg";
import dot_4 from "./basic/dot_4.svg";
import dot_5 from "./basic/dot_5.svg";
import dot_6 from "./basic/dot_6.svg";
import dot_7 from "./basic/dot_7.svg";
import dot_8 from "./basic/dot_8.svg";
import dot_9 from "./basic/dot_9.svg";
import wind_north from "./basic/winds_north.svg";
import wind_east from "./basic/winds_east.svg";
import wind_west from "./basic/winds_west.svg";
import wind_south from "./basic/winds_south.svg";
import flower from "./basic/flower.svg";
import joker from "./basic/joker.svg";
import type { TileColors, TileImages } from "./types";

export const basicTileColors: TileColors = {
  [BAMS]: "#004900",
  [CRAKS]: "#b93c3c",
  [DOTS]: "#000037",
  [WIND_SUIT]: "#19328c",
  [JOKER_SUIT]: "transparent",
  [FLOWER_SUIT]: "transparent"
}

export const basicTileImages: TileImages = {
  [BAMS]: {
    1: bam_1,
    2: bam_2,
    3: bam_3,
    4: bam_4,
    5: bam_5,
    6: bam_6,
    7: bam_7,
    8: bam_8,
    9: bam_9,
    D: bam_d,
  },
  [CRAKS]: {
    1: crak_1,
    2: crak_2,
    3: crak_3,
    4: crak_4,
    5: crak_5,
    6: crak_6,
    7: crak_7,
    8: crak_8,
    9: crak_9,
    D: crak_d,
  },
  [DOTS]: {
    1: dot_1,
    2: dot_2,
    3: dot_3,
    4: dot_4,
    5: dot_5,
    6: dot_6,
    7: dot_7,
    8: dot_8,
    9: dot_9,
    D: null,
  },
  [WIND_SUIT]: {
    N: wind_north,
    E: wind_east,
    W: wind_west,
    S: wind_south,
  },
  [FLOWER_SUIT]: flower,
  [JOKER_SUIT]: joker,
};
