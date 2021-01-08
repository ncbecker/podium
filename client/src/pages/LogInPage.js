import styled, { useTheme } from "styled-components/macro";
import PropTypes from "prop-types";
import { ThemeTogglerButton } from "../components/IconButton.js";
import { ReactComponent as Logo } from "../assets/text-logo-iheart.svg";
import { ReactComponent as LogoDark } from "../assets/text-logo-iheart-darktheme.svg";
import { LogInButton } from "../components/Button.js";
import { SkipLogIn } from "../components/SkipLogIn.js";

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr 2fr 2fr 1fr;
`;

const TopBar = styled.div`
  grid-row: 1 / 2;
  justify-self: end;
`;

const LogoWrapper = styled.div`
  grid-row: 3 / 4;
  place-self: center;
`;

const ButtonWrapper = styled.div`
  grid-row: 4 / 5;
  place-self: center;
`;

function LogInPage({ toggleTheme }) {
  const createDevUrl = () => {
    if (process.env.NODE_ENV === "development") {
      return "http://localhost:3001/oauth/spotify/authorize";
    } else {
      return "https://ncbecker-podium.herokuapp.com/oauth/spotify/authorize";
    }
  };
  const authUrl = createDevUrl();
  const theme = useTheme().theme;

  return (
    <PageWrapper>
      <TopBar>
        <ThemeTogglerButton onClick={toggleTheme} />
      </TopBar>
      <LogoWrapper>{theme === "light" ? <Logo /> : <LogoDark />}</LogoWrapper>
      <ButtonWrapper>
        <a href={authUrl}>
          <LogInButton />
        </a>
        <SkipLogIn />
      </ButtonWrapper>
    </PageWrapper>
  );
}

LogInPage.propTypes = {
  toggleTheme: PropTypes.func,
};

export default LogInPage;
