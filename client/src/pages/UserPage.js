import styled from "styled-components/macro";
import { ArrowBackButton, LogOutButton } from "../components/IconButton.js";
import { ReactComponent as Logo } from "../assets/text-logo-iheart.svg";
import { EpisodeCard } from "../components/EpisodeCard.js";
import Placeholder from "../assets/placeholder-episode-pic.jpeg";

const PageWrapper = styled.div`
  height: 100vh;
  overflow-x: hidden;
  width: 100%;
  display: grid;
  grid-template-rows: auto auto 1fr;
`;

const TopBar = styled.div`
  width: 320px;
  grid-row: 1 / 2;
  place-self: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: "back logo logout";
  place-items: center;
`;

const ArrowBack = styled(ArrowBackButton)`
  grid-area: "back";
  justify-self: start;
`;

const LogoContainer = styled.div`
  grid-area: "logo";
  svg {
    width: 53.67px;
    height: 16px;
  }
`;

const LogOut = styled(LogOutButton)`
  grid-area: "logout";
  justify-self: end;
`;

const CardsWrapper = styled.div`
  grid-row: 3 / 4;
  align-self: start;
  justify-self: center;
`;

const placeholderInfoArray = [
  {
    episodeId: 1,
    imgsrc: Placeholder,
    imgalt: "Placeholder",
    title: "Sehnsucht nach New York / Fernsehabend mit Jan und Olli",
    userLiked: true,
    likes: 1,
  },
];

function UserPage() {
  return (
    <PageWrapper>
      <TopBar>
        <ArrowBack />
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <LogOut />
      </TopBar>
      <CardsWrapper>
        {placeholderInfoArray.map((placeholderInfo) => (
          <EpisodeCard
            key={placeholderInfo.episodeId.toString()}
            imgsrc={placeholderInfo.imgsrc}
            imgalt={placeholderInfo.imgalt}
            title={placeholderInfo.title}
            userLiked={placeholderInfo.userLiked}
            likes={placeholderInfo.likes}
          />
        ))}
      </CardsWrapper>
    </PageWrapper>
  );
}

export default UserPage;
