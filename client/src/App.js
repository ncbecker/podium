import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import VotingPage, { placeholderInfoArray } from "./pages/VotingPage";
import EpisodeDetailsPage from "./pages/EpisodeDetailsPage";
import UserPage from "./pages/UserPage";
import MenuLogInPage from "./pages/MenuLogInPage";
import ProtectedRoute from "./routing/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

const AppWrapper = styled.div`
  max-width: 375px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const placeholderInfo = placeholderInfoArray[0];

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppWrapper>
          <GlobalStyle />
          <Switch>
            <Route exact path="/">
              <LogInPage />
            </Route>
            <Route path="/vote">
              <VotingPage />
            </Route>
            <ProtectedRoute path="/user" component={UserPage} />
            <ProtectedRoute path="/login" component={MenuLogInPage} />
            <Route path="/details">
              <EpisodeDetailsPage
                imgsrc={placeholderInfo.imgsrc}
                imgalt={placeholderInfo.imgalt}
                title={placeholderInfo.title}
                show={placeholderInfo.show}
                description={placeholderInfo.description}
                date={placeholderInfo.date}
                duration={placeholderInfo.duration}
                likes={placeholderInfo.likes}
                userLiked={placeholderInfo.userLiked}
              />
            </Route>
          </Switch>
        </AppWrapper>
      </AuthProvider>
    </Router>
  );
}

export default App;
