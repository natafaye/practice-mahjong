import { createContext, useContext, type ReactNode } from "react";

const defaultTheme = {
  rackLight: "var(--color-cyan-600)",
  rackMid: "#0084a6",
  rackDark: "var(--color-cyan-700)",
  tileLight: "var(--color-fuchsia-700)",
  tileDark: "var(--color-fuchsia-800)",
  table: "var(--color-fuchsia-200)",
  tableMid: "var(--color-fuchsia-300)",
  tableDark: "var(--color-fuchsia-400)",
  tableVeryDark: "var(--color-fuchsia-600)",
}

const ThemeContext = createContext<typeof defaultTheme | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={defaultTheme}>
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