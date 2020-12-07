import GlobalStyle from "../src/GlobalStyle";
import { MemoryRouter } from "react-router-dom";
import styled from "styled-components/macro";

const AppWrapper = styled.div`
  max-width: 375px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

export const decorators = [
  (Story) => (
    <>
      <MemoryRouter>
        <AppWrapper>
          <GlobalStyle />
          <Story />
        </AppWrapper>
      </MemoryRouter>
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "fullscreen",
};
