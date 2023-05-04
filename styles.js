import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui;
    background-color: #1F1F1F;
    color: #EBEBEB;
    padding: 50px 0;
  }
  
  h1 {
    font-weight: 600;
    font-size: 24px;
  }
`;
