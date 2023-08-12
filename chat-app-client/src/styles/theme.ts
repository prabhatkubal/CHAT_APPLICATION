import { DefaultTheme } from "styled-components";

export interface CustomTheme extends DefaultTheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    backgroundOffSet: string;
    bgInputColor: string;
    backgroundalt: string;
    backgroundaltrev: string;
    text: string;
    button: string;
    buttonlg: string;
  };

  borders: {
    headerBtmBorder: string;
    borderRight: string;
  };

  tabs: {
    tabActiveBgColor: string;
    tabInActiveBgColor: string;
    tabActiveColor: string;
    tabInActiveColor: string;
    tabBorder: string;
    tabActiveBorderBtm: string;
    tabInActiveBorderBtm: string;
  };
}

export const lightTheme: CustomTheme = {
  colors: {
    primary: "#000000",
    secondary: "#ffffff",
    background: "#ffffff",
    backgroundOffSet: "#ffffff",
    bgInputColor: "#ffffff",
    backgroundalt: "#f9f9f9",
    backgroundaltrev: "#161616",
    text: "#000000",
    button: "#000000",
    buttonlg: "#f0f0f0",
  },

  borders: {
    headerBtmBorder: "1px solid #ebebeb",
    borderRight: "1px solid #ebebeb",
  },

  tabs: {
    tabActiveBgColor: "#f9f9f9",
    tabInActiveBgColor: "#f0f0f0",
    tabActiveColor: "#000000",
    tabInActiveColor: "#888888",
    tabBorder: "1px solid #e0e0e0",
    tabActiveBorderBtm: "none",
    tabInActiveBorderBtm: "1px solid #e0e0e0",
  },
};

export const darkTheme: CustomTheme = {
  colors: {
    primary: "#ffffff",
    secondary: "#000000",
    background: "#161616",
    backgroundOffSet: "#282828",
    bgInputColor: "#333333",
    backgroundalt: "#161616",
    backgroundaltrev: "#f9f9f9",
    text: "#efefef",
    button: "#062641",
    buttonlg: "#303235",
  },

  borders: {
    headerBtmBorder: "1px solid #252525",
    borderRight: "1px solid #1e1c27",
  },

  tabs: {
    tabActiveBgColor: "#161616",
    tabInActiveBgColor: "#333333",
    tabActiveColor: "#ffffff",
    tabInActiveColor: "#ffffff",
    tabBorder: "1px solid #4d4d4d",
    tabActiveBorderBtm: "none",
    tabInActiveBorderBtm: "1px solid #4d4d4d",
  },
};
