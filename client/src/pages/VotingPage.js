import styled from "styled-components/macro";
import {
  BurgerMenuButton,
  FilterButton,
  SearchButton,
} from "../components/IconButton.js";
import { ReactComponent as Logo } from "../assets/text-logo-iheart.svg";
import { EpisodeSearch } from "../components/EpisodeSearch.js";
import { EpisodeCard } from "../components/EpisodeCard.js";
import Placeholder from "../assets/placeholder-episode-pic.jpeg";
import FilterPage from "./FilterPage.js";
import { useState } from "react";
import { getAppAccessToken, getEpisodeInfo } from "../utils/api.js";

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  display: grid;
  grid-template-rows: auto auto 1fr;
`;

const TopBar = styled.div`
  width: 100%;
  grid-row: 1 / 2;
  place-self: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: "menu logo .";
  place-items: center;
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
  width: 320px;
  grid-row: 2 / 3;
  place-self: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const CardsWrapper = styled.div`
  grid-row: 3 / 4;
  align-self: start;
  justify-self: center;
`;

export const placeholderInfoArray = [
  {
    episodeId: 1,
    imgsrc: Placeholder,
    imgalt: "Placeholder",
    title:
      "Sehnsucht nach New York / Fernsehabend mit Jan und Olli Sehnsucht nach New York / Fernsehabend mit Jan und Olli",
    show:
      "Fest & Flauschig Fest & Flauschig Fest & Flauschig Fest & Flauschig Fest & Flauschig Fest & Flauschig Fest & Flauschig",
    description:
      "Füße hoch und Chips bereithalten, Jan und Olli kommentieren quasi live die Verleihung vom Deutschen Comedypreis. Sie telefonieren in einer Werbepause mit der großartigen Katrin Bauerfeind (die direkt danach wieder auf die Bühne muss) und nebenbei erfahren wir, dass eine bekannte Politikerin im selben Krankenhaus geboren wurde wie Olli Schulz!Füße hoch und Chips bereithalten, Jan und Olli kommentieren quasi live die Verleihung vom Deutschen Comedypreis. Sie telefonieren in einer Werbepause mit der großartigen Katrin Bauerfeind (die direkt danach wieder auf die Bühne muss) und nebenbei erfahren wir, dass eine bekannte Politikerin im selben Krankenhaus geboren wurde wie Olli Schulz!",
    date: "3. Okt.",
    duration: 4139102,
    userLiked: false,
    likes: 12,
  },
  {
    episodeId: 2,
    imgsrc: Placeholder,
    imgalt: "Placeholder",
    title: "Short title",
    show: "Fest & Flauschig",
    description:
      "Füße hoch und Chips bereithalten, Jan und Olli kommentieren quasi live die Verleihung vom Deutschen Comedypreis. Sie telefonieren in einer Werbepause mit der großartigen Katrin Bauerfeind (die direkt danach wieder auf die Bühne muss) und nebenbei erfahren wir, dass eine bekannte Politikerin im selben Krankenhaus geboren wurde wie Olli Schulz!Füße hoch und Chips bereithalten, Jan und Olli kommentieren quasi live die Verleihung vom Deutschen Comedypreis. Sie telefonieren in einer Werbepause mit der großartigen Katrin Bauerfeind (die direkt danach wieder auf die Bühne muss) und nebenbei erfahren wir, dass eine bekannte Politikerin im selben Krankenhaus geboren wurde wie Olli Schulz!",
    date: "3. Okt.",
    duration: 4139102,
    userLiked: true,
    likes: 15,
  },
  {
    episodeId: 3,
    imgsrc: Placeholder,
    imgalt: "Placeholder",
    title:
      "Sehnsucht nach New York / Fernsehabend mit Jan und Olli und Sehnsucht nach New York / Fernsehabend mit Jan und Olli",
    show: "Fest & Flauschig",
    description:
      "Füße hoch und Chips bereithalten, Jan und Olli kommentieren quasi live die Verleihung vom Deutschen Comedypreis. Sie telefonieren in einer Werbepause mit der großartigen Katrin Bauerfeind (die direkt danach wieder auf die Bühne muss) und nebenbei erfahren wir, dass eine bekannte Politikerin im selben Krankenhaus geboren wurde wie Olli Schulz!Füße hoch und Chips bereithalten, Jan und Olli kommentieren quasi live die Verleihung vom Deutschen Comedypreis. Sie telefonieren in einer Werbepause mit der großartigen Katrin Bauerfeind (die direkt danach wieder auf die Bühne muss) und nebenbei erfahren wir, dass eine bekannte Politikerin im selben Krankenhaus geboren wurde wie Olli Schulz!",
    date: "3. Okt.",
    duration: 4139102,
    userLiked: false,
    likes: 0,
  },
];

function VotingPage() {
  const [open, setOpen] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [fetchData, setFetchData] = useState([]);

  const handleClickFilter = () => {
    setOpen(!open);
  };

  const handleChangeSearch = (event) => {
    setSearchData(event.target.value);
    console.log(searchData);
  };

  const handleSubmitSearch = async (event) => {
    event.preventDefault();
    const apptoken = await getAppAccessToken();
    const episodeData = await getEpisodeInfo(apptoken, searchData);
    setFetchData([
      ...fetchData,
      { ...episodeData, userLiked: false, likes: 0 },
    ]);
    console.log(fetchData);
    setSearchData("");
  };

  return (
    <PageWrapper>
      <TopBar>
        <BurgerMenu />
        <LogoContainer>
          <Logo />
        </LogoContainer>
      </TopBar>
      <SearchWrapper>
        <FilterButton onClick={handleClickFilter} />
        <EpisodeSearch value={searchData} onChange={handleChangeSearch} />
        <SearchButton onClick={handleSubmitSearch} />
      </SearchWrapper>
      <FilterPage open={open} onClick={handleClickFilter} />
      <CardsWrapper>
        {fetchData?.map((episodeInfo) => (
          <EpisodeCard
            key={episodeInfo.id}
            imgsrc={episodeInfo.images[1].url}
            imgalt={episodeInfo.show.name}
            title={episodeInfo.name}
            userLiked={episodeInfo.userLiked}
            likes={episodeInfo.likes}
          />
        ))}
      </CardsWrapper>
    </PageWrapper>
  );
}

export default VotingPage;
