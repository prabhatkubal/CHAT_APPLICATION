import { useState } from "react";
import { CustomTheme, lightTheme, darkTheme } from "../styles/theme";

export const useToggleTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return { theme, toggleTheme };
};
