import styled from "styled-components/macro";
import { ArrowBackButton } from "../components/IconButton.js";
import { ReactComponent as Logo } from "../assets/text-logo-iheart.svg";
import { LogInButton } from "../components/Button.js";

const PageWrapper = styled.div`
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

function MenuLogInPage() {
  return (
    <PageWrapper>
      <TopBar>
        <ArrowBackButton />
      </TopBar>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <ButtonWrapper>
        <LogInButton />
      </ButtonWrapper>
    </PageWrapper>
  );
}

export default MenuLogInPage;
