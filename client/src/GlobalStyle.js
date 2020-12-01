import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*,*::before,*::after {
  box-sizing: border-box;
};

:root {
// general vars
  --font-family: 'Roboto', sans-serif;
// vars light theme
  --bg-light: linear-gradient(117deg, #48CAE4, #ADE8F4);
  --icon-light: #000000;
  --button-text-light: #000000;
  --button-shadow-light: 3px 3px 5px #00000029;
  --text-light: #404040;
  --action-light: #80FFDB;
  --info-bubble-light: #33333333;
  --input-overlay-light: #CAF0F8;
  --cards-light: #CAF0F8CB;
  --like-light: #EF476F;
  --no-like-light: #33333380;
  --timestamp-light: #2D00F7;
// vars dark theme
  --bg-dark: #03045E;
  --icon-dark: #CAF0F8;
  --button-text-dark: #000000;
  --button-shadow-dark: 3px 3px 5px #00000029;
  --text-dark: #404040;
  --action-dark: #80FFDB;
  --info-bubble-dark: #CAF0F8CB;
  --input-overlay-dark: #CAF0F8;
  --cards-dark: #CAF0F8CB;
  --like-dark: #EF476F;
  --no-like-dark: #33333380;
  --timestamp-dark: #2D00F7;
// additional vars for dark theme
  --text-on-bg-dark: #CAF0F8;
  --no-like-on-bg-dark: #CAF0F8CB;
}

html{
  font-size: 16px;
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--font-family);
  color: var(--text-light);
  background: var(--bg-light);
  height: 100vh
}

button {
  font: inherit;
  padding: 0px;
  background: none;
  border: none;
  cursor: pointer;
}

a {
  text-decoration: none;
  color: inherit;
  }
`;

export default GlobalStyle;
