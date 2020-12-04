import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import VotingPage from "./pages/VotingPage";
import FilterPage from "./pages/FilterPage";
import UserPage from "./pages/UserPage";
import MenuLogInPage from "./pages/MenuLogInPage";

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <Router>
      <AppWrapper>
        <GlobalStyle />
        <Switch>
          <Route exact path="/">
            <LogInPage />
          </Route>
          <Route path="/vote">
            <VotingPage />
          </Route>
          <Route path="/user">
            <UserPage />
          </Route>
          <Route path="/login">
            <MenuLogInPage />
          </Route>
          <Route path="/filter">
            <FilterPage />
          </Route>
        </Switch>
      </AppWrapper>
    </Router>
  );
}

export default App;
