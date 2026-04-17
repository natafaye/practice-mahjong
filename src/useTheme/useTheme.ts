import { createContext, useContext } from "react";
import type { Theme } from "./types";

type ThemeContextData = Theme & { setTheme: (theme: Theme) => void } | undefined
export const ThemeContext = createContext<ThemeContextData>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};