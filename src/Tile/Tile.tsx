import clsx from "clsx";
import type { MahjongTile, Size } from "../types";
import { generateBoxShadow } from "./generateBoxShadow";
import { tileSizes } from "./tileSizes";
import { getTileImage, useTheme } from "../useTheme";
import { FLOWER_SUIT, JOKER_SUIT, WIND_SUIT } from "../constants";
import { motion } from "framer-motion";

export type TileProps = {
  tile?: MahjongTile;
  size?: Size;
  tipped?: boolean;
  message?: string | number;
  animateIn?: boolean;
  className?: string;
  layoutId?: string;
};

export default function Tile({
  tile,
  className,
  size = "lg",
  tipped = false,
  message = "",
  layoutId,
  animateIn = false,
}: TileProps) {
  const { tileLight, tileDark, tileImages, tileColors, showJokerText } = useTheme();
  const { shadowHeight, tileClassName, numberClassName } = tileSizes[size];

  const showNumber = tile && (typeof tile.number === "number" || tile.suit === WIND_SUIT);

  const tileStyle = !tile
    ? {
      background: tileLight,
      borderColor: tileDark,
      boxShadow: generateBoxShadow(shadowHeight, tipped, "var(--color-taupe-200)", tileDark),
    }
    : {
      boxShadow: generateBoxShadow(shadowHeight, tipped, tileDark, "var(--color-taupe-200)"),
    };

  return (
    <motion.div
      layoutId={layoutId}
      initial={animateIn && { y: "-3rem", opacity: 0 }}
      animate={{ y: "0", opacity: 1 }}
      className={clsx(
        className,
        tileClassName,
        "relative flex justify-center aspect-2/3 rounded-lg bg-taupe-50 border border-taupe-200",
      )}
      style={tileStyle}
    >
      {tile && (
        <>
          {showNumber && (
            <span
              className={clsx("absolute top-0 left-0 font-bold bg-taupe-50 pe-1 rounded-xl", numberClassName)}
              style={{ color: tileColors[tile.suit] }}
            >
              &nbsp;{tile.number}
            </span>
          )}
          {tile.suit === JOKER_SUIT && showJokerText && (
            <span
              className={clsx(
                "absolute top-1 left-0 right-0 font-bold scale-65 text-center",
                {
                  sm: "text-[0.5rem] mt-0.5 lg:text-xs lg:mt-1",
                  md: "text-xs mt-1",
                  lg: "text-xs lg:text-sm xl:text-base",
                }[size],
              )}
              style={{ color: tileDark }}
            >
              JOKER
            </span>
          )}
          <div
            className="border-3 rounded-lg flex justify-center items-center m-1 grow"
            style={{ borderColor: tileColors[tile.suit] }}
          >
            <img
              src={getTileImage(tile, tileImages)}
              className={clsx(
                "relative no-text-callout",
                showNumber && "mt-2",
                tile.suit === FLOWER_SUIT ? "w-[95%]" : "w-[80%]",
                tile.suit === JOKER_SUIT && showJokerText && "mt-3",
              )}
            />
          </div>
        </>
      )}
      {message && (
        <div className="flex justify-center items-center text-white text-[0.8rem] md:text-base text-center opacity-50">
          {message}
        </div>
      )}
    </motion.div>
  );
}
