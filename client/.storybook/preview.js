import GlobalStyle from "../src/GlobalStyle";
import { MemoryRouter } from "react-router-dom";

export const decorators = [
  (Story) => (
    <>
      <MemoryRouter>
        <GlobalStyle />
        <Story />
      </MemoryRouter>
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "fullscreen",
};
