import styled from "styled-components/macro";
import { BurgerMenuButton, FilterButton } from "../components/IconButton.js";
import { ReactComponent as Logo } from "../assets/text-logo-iheart.svg";
import { EpisodeSearch } from "../components/EpisodeSearch.js";
import { EpisodeCard } from "../components/EpisodeCard.js";
import Placeholder from "../assets/placeholder-episode-pic.jpeg";

const PageWrapper = styled.div`
  height: 100vh;
  overflow-x: hidden;
  display: grid;
  grid-template-columns: minmax(auto, 834px);
  grid-template-rows: auto auto 1fr;
`;

const TopBar = styled.div`
  grid-row: 1 / 2;
  place-self: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: "menu logo .";
  place-items: center;
  width: 100%;
`;

const BurgerMenu = styled(BurgerMenuButton)`
  grid-area: "menu";
  justify-self: start;
`;

const LogoContainer = styled.div`
  grid-area: "logo";
  svg {
    width: 53.67px;
    height: 16px;
  }
`;

const SearchWrapper = styled.div`
  grid-row: 2 / 3;
  place-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
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
    userLiked: false,
    likes: 0,
  },
  {
    episodeId: 2,
    imgsrc: Placeholder,
    imgalt: "Placeholder",
    title: "Short title",
    userLiked: true,
    likes: 1,
  },
  {
    episodeId: 3,
    imgsrc: Placeholder,
    imgalt: "Placeholder",
    title:
      "Sehnsucht nach New York / Fernsehabend mit Jan und Olli und Sehnsucht nach New York / Fernsehabend mit Jan und Olli",
    userLiked: false,
    likes: 0,
  },
];

function VotingPage() {
  return (
    <PageWrapper>
      <TopBar>
        <BurgerMenu />
        <LogoContainer>
          <Logo />
        </LogoContainer>
      </TopBar>
      <SearchWrapper>
        <EpisodeSearch />
        <FilterButton />
      </SearchWrapper>
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

export default VotingPage;
