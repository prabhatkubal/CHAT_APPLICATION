// themeContext.tsx
import React, { createContext, useContext, useState } from "react";
import { darkTheme, lightTheme } from "../styles/theme";

const ThemeContext = createContext<any>(null);

interface ThemeProps {
  children: React.ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
