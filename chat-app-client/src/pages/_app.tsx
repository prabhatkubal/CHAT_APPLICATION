import { useState } from "react";
import type { AppProps } from "next/app";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/globalstyles";
import { CustomTheme, lightTheme, darkTheme } from "../styles/theme";
import { useToggleTheme } from "../theme/themeUtilis";
import { ApolloProvider } from "@apollo/client";
import client from "../api/apiInstance";

// const theme: DefaultTheme = {
//   colors: {
//     primary: "#111",
//     secondary: "#0070f3",
//   },
// };

const ToggleThemeButton = styled.button`
  /* styles for the toggle button */
`;

export default function App({ Component, pageProps }: AppProps) {
  const { isDarkMode, toggleTheme } = useToggleTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {/* <ToggleThemeButton onClick={toggleTheme}>
          Toggle Theme
        </ToggleThemeButton> */}
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}
