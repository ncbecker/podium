import { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components/macro";
import { ArrowBackButton, LogOutButton } from "../components/IconButton.js";
import { ReactComponent as Logo } from "../assets/text-logo-iheart.svg";
import { ReactComponent as LogoDark } from "../assets/text-logo-iheart-darktheme.svg";
import { EpisodeCard } from "../components/EpisodeCard.js";
import { useAuth } from "../contexts/AuthContext.js";
import { getAllLikedEpisodes } from "../utils/api.js";

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: repeat(4, auto) 1fr;
  overflow-x: hidden;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0;
  }
`;

const TopBar = styled.div`
  width: 100%;
  grid-row: 1 / 2;
  display: grid;
  grid-template-areas: "back logo logout";
  place-items: center;
`;

const ArrowBack = styled(ArrowBackButton)`
  grid-area: back;
  justify-self: start;
`;

const LogoContainer = styled.div`
  grid-area: logo;
  place-self: center;
  svg {
    width: 53.67px;
    height: 16px;
  }
`;

const LogOut = styled(LogOutButton)`
  grid-area: logout;
  justify-self: end;
`;

const WelcomeWrapper = styled.span`
  grid-row: 2 / 3;
  justify-self: self-start;
  font-size: 2rem;
  font-weight: 500;
  margin: 20px;
  color: ${(props) => props.theme.textOnBg};
`;
const TitleWrapper = styled.span`
  grid-row: 3 / 4;
  justify-self: self-start;
  font-size: 2rem;
  font-weight: 500;
  margin: 20px;
  color: ${(props) => props.theme.textOnBg};
`;

const CardsWrapper = styled.div`
  grid-row: 4 / 5;
  align-self: start;
  justify-self: center;
`;

function UserPage() {
  const [fetchData, setFetchData] = useState([]);

  const { user, logout } = useAuth();

  const theme = useTheme().theme;

  useEffect(() => {
    const doFetch = async () => {
      const allLikedEpisodes = await getAllLikedEpisodes(user.id);
      setFetchData(allLikedEpisodes);
    };

    doFetch();
  }, [user.id]);

  return (
    <PageWrapper>
      <TopBar>
        <ArrowBack />
        <LogoContainer>
          {theme === "light" ? <Logo /> : <LogoDark />}
        </LogoContainer>
        <LogOut onClick={logout} />
      </TopBar>
      <WelcomeWrapper>
        <span>Welcome {user.display_name} 👋</span>
      </WelcomeWrapper>
      <TitleWrapper>
        <span>Your favorites</span>
      </TitleWrapper>
      <CardsWrapper>
        {fetchData?.map((episodeInfo) => (
          <EpisodeCard
            key={episodeInfo.id}
            episodeId={episodeInfo.id}
            imgsrc={episodeInfo.images[1]?.url}
            imgalt={episodeInfo.show.name}
            title={episodeInfo.name}
            liked={episodeInfo.liked}
            likes={episodeInfo.likes}
          />
        ))}
      </CardsWrapper>
    </PageWrapper>
  );
}

export default UserPage;
