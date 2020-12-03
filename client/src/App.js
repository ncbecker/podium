import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
// import LogInPage from "./pages/LogInPage";
import VotingPage from "./pages/VotingPage";

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <AppWrapper>
      <GlobalStyle />
      {/* <LogInPage /> */}
      <VotingPage />
    </AppWrapper>
  );
}

export default App;
