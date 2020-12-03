import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import LogInPage from "./pages/LogInPage";

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <AppWrapper>
      <GlobalStyle />
      <LogInPage />
    </AppWrapper>
  );
}

export default App;
