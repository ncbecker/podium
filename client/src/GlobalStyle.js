import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*,*::before,*::after {
  box-sizing: border-box;
};

:root {
  --font-family: 'Roboto', sans-serif;
}

html{
  font-size: 16px;
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--font-family);
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.bg};
  height: 100vh;
  width: 100vw;
}

button {
  font: inherit;
  padding: 0px;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
}

a {
  text-decoration: none;
  color: inherit;
  }
`;

export default GlobalStyle;
