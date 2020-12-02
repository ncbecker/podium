import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import LogInPage from "./pages/Page/LogInPage";

const AppWrapper = styled.div`
  margin: 0 auto;
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
