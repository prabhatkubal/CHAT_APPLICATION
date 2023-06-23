import { DefaultTheme } from "styled-components";

export interface CustomTheme extends DefaultTheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    backgroundalt: string;
    borderRight: string;
    text: string;
    button: string;
  };
}

export const lightTheme: CustomTheme = {
  colors: {
    primary: "#000000",
    secondary: "#ffffff",
    background: "#ffffff",
    backgroundalt: "#f9f9f9",
    borderRight: "1px solid #ebebeb",
    text: "#000000",
    button: "#000000",
  },
};

export const darkTheme: CustomTheme = {
  colors: {
    primary: "#ffffff",
    secondary: "#000000",
    background: "#252331",
    backgroundalt: "#1e1c27",
    borderRight: "1px solid #1e1c27",
    text: "#efefef",
    button: "#062641",
  },
};
