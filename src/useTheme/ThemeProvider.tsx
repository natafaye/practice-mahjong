import { useState, type ReactNode } from "react";
import { ThemeContext } from "./useTheme";
import { THEMES } from "./themes";
import type { Theme } from "./types";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheTheme] = useState<Theme>(THEMES[0])

  const setTheme = (newTheme: Theme) => {
    setTheTheme(newTheme)
  }
  
  return (
    <ThemeContext.Provider value={{ ...theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};