import { useState } from "react";
import styled from "styled-components/macro";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyle";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./routing/ProtectedRoute";
import LogInPage from "./pages/LogInPage";
import VotingPage from "./pages/VotingPage";
import EpisodeDetailsPage from "./pages/EpisodeDetailsPage";
import UserPage from "./pages/UserPage";
import MenuLogInPage from "./pages/MenuLogInPage";
import { dark, light } from "./utils/theme";

const AppWrapper = styled.div`
  max-width: 375px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

function App() {
  const [theme, setTheme] = useState(light);

  const handleChangeTheme = () => {
    setTheme(theme === dark ? light : dark);
  };

  return (
    <Router>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <AppWrapper>
            <GlobalStyle />
            <Switch>
              <Route exact path="/">
                <LogInPage toggleTheme={handleChangeTheme} />
              </Route>
              <Route path="/vote">
                <VotingPage />
              </Route>
              <ProtectedRoute path="/user" component={UserPage} />
              <ProtectedRoute path="/login" component={MenuLogInPage} />
              <Route path="/details/:id">
                <EpisodeDetailsPage />
              </Route>
            </Switch>
          </AppWrapper>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
