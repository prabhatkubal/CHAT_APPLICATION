import { useState } from "react";
import { CustomTheme, lightTheme, darkTheme } from "../styles/theme";

export const useToggleTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  console.log("themeUtils");

  return { theme, toggleTheme };
};
