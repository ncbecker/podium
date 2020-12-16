import styled from "styled-components/macro";
import { ArrowBackButton, LogOutButton } from "../components/IconButton.js";
import { ReactComponent as Logo } from "../assets/text-logo-iheart.svg";
import { EpisodeCard } from "../components/EpisodeCard.js";
import Placeholder from "../assets/placeholder-episode-pic.jpeg";
import { useAuth } from "../contexts/AuthContext.js";

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
  const { user, logout } = useAuth();

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
