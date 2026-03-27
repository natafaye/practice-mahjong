import { createContext, useContext, type ReactNode } from "react";

export type Theme = {
  rackLight: string
  rackDark: string
  tileLight: string
  tileDark: string
  table: string
  tableMid: string
  tableDark: string
};

const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={{
      rackLight: "var(--color-cyan-600)",
      rackDark: "var(--color-cyan-700)",
      tileLight: "var(--color-fuchsia-700)",
      tileDark: "var(--color-fuchsia-800)",
      table: "var(--color-fuchsia-200)",
      tableMid: "var(--color-fuchsia-300)",
      tableDark: "var(--color-fuchsia-400)",
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};