import { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { ArrowBackButton, LogOutButton } from "../components/IconButton.js";
import { ReactComponent as Logo } from "../assets/text-logo-iheart.svg";
import { EpisodeCard } from "../components/EpisodeCard.js";
import { useAuth } from "../contexts/AuthContext.js";
import { getAllLikedEpisodes } from "../utils/api.js";

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  display: grid;
  grid-template-rows: repeat(3, auto) 1fr;
`;

const TopBar = styled.div`
  width: 100%;
  grid-row: 1 / 2;
  display: grid;
  grid-template-areas: "back logo logout";
  place-items: center;
`;

const ArrowBack = styled(ArrowBackButton)`
  grid-area: "back";
  justify-self: start;
`;

const LogoContainer = styled.div`
  grid-area: "logo";
  place-self: center;
  svg {
    width: 53.67px;
    height: 16px;
  }
`;

const LogOut = styled(LogOutButton)`
  grid-area: "logout";
  justify-self: end;
`;

const WelcomeWrapper = styled.span`
  grid-row: 2 / 3;
  justify-self: self-start;
  font-size: 2rem;
  font-weight: 500;
  margin: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const TitleWrapper = styled.span`
  grid-row: 3 / 4;
  justify-self: self-start;
  font-size: 2rem;
  font-weight: 500;
  margin: 20px;
`;

const CardsWrapper = styled.div`
  grid-row: 4 / 5;
  align-self: start;
  justify-self: center;
`;

function UserPage() {
  const [fetchData, setFetchData] = useState([]);

  const { user, logout } = useAuth();

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
          <Logo />
        </LogoContainer>
        <LogOut onClick={logout} />
      </TopBar>
      <WelcomeWrapper>Welcome {user.display_name} 👋</WelcomeWrapper>
      <TitleWrapper>Your favorites</TitleWrapper>
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
