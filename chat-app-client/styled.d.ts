import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme extends CustomTheme {
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
}
