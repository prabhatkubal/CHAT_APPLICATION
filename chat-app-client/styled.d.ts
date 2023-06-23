import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme extends CustomTheme {
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
}
