import { useState } from "react";
import type { AppProps } from "next/app";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/globalstyles";
import { CustomTheme, lightTheme, darkTheme } from "../styles/theme";
import { useToggleTheme } from "../theme/themeUtilis";
import { ApolloProvider } from "@apollo/client";
import client from "../api/apiInstance";
import { GetServerSideProps } from "next";
import { ThemeContextProvider } from "../theme/themeContext";

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
  const { theme, toggleTheme } = useToggleTheme();
  // const theme = isDarkMode ? darkTheme : lightTheme;

  console.log("_app");

  return (
    <>
      <ApolloProvider client={client}>
        <ThemeContextProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <ToggleThemeButton onClick={toggleTheme}>
              Toggle Theme
            </ToggleThemeButton>
            <Component {...pageProps} />
          </ThemeProvider>
        </ThemeContextProvider>
      </ApolloProvider>
    </>
  );
}
