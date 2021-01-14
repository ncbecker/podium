import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../contexts/AuthContext.js";
import styled, { useTheme } from "styled-components/macro";
import { BurgerMenuButton, FilterButton } from "../components/IconButton.js";
import { ReactComponent as Logo } from "../assets/text-logo-iheart.svg";
import { ReactComponent as LogoDark } from "../assets/text-logo-iheart-darktheme.svg";
import { EpisodeSearch } from "../components/EpisodeSearch.js";
import { EpisodeCard } from "../components/EpisodeCard.js";
import FilterPage from "./FilterPage.js";
import { searchEpisode, getAllEpisodesAndLikes } from "../utils/api.js";

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 0;
  }
  display: grid;
  grid-template-rows: auto auto 1fr;
`;

const TopBar = styled.div`
  width: 100%;
  grid-row: 1 / 2;
  place-self: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: "usermenu logo .";
  place-items: center;
`;

const BurgerMenu = styled(BurgerMenuButton)`
  grid-area: usermenu;
  justify-self: start;
`;

const LogoContainer = styled.div`
  grid-area: logo;
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

function VotingPage() {
  const [open, setOpen] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [suggestions, setSuggestions] = useState(null);

  const { user, login } = useAuth();

  const theme = useTheme().theme;

  const {
    data: votedEpisodes,
    status: statusVotedEpisodes,
    refetch: refetchVotedEpisodes,
  } = useQuery(
    ["voting", user],
    async () => {
      if (user) {
        const data = getAllEpisodesAndLikes(user.id);
        return data;
      }
    },
    {
      enabled: false,
    }
  );

  const { data: searchResults, refetch: refetchSearch } = useQuery(
    ["search", searchData],
    searchEpisode,
    { enabled: false }
  );

  useEffect(() => {
    const doLogin = async () => {
      await login();
    };
    doLogin();

    refetchVotedEpisodes();
  }, [login, refetchVotedEpisodes]);

  useEffect(() => {
    const doFetch = async () => {
      if (searchData.length === 0) {
        setSuggestions(null);
        return;
      }
      refetchSearch();
      setSuggestions(searchResults);
    };
    const timeoutId = setTimeout(doFetch, 600);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchData, refetchSearch, searchResults]);

  const handleClickFilter = () => {
    setOpen(!open);
  };

  const handleChangeSearch = async (event) => {
    setSearchData(event.target.value);
  };

  return (
    <PageWrapper>
      <TopBar>
        <BurgerMenu />
        <LogoContainer>
          {theme === "light" ? <Logo /> : <LogoDark />}
        </LogoContainer>
      </TopBar>
      <SearchWrapper>
        <EpisodeSearch
          value={searchData}
          onChange={handleChangeSearch}
          suggestions={suggestions}
        />
        <FilterButton onClick={handleClickFilter} />
      </SearchWrapper>
      <FilterPage open={open} onClick={handleClickFilter} />
      <CardsWrapper>
        {statusVotedEpisodes === "loading" && <div>Loading...</div>}
        {statusVotedEpisodes === "error" && (
          <div>An unexpected error occured - please restart!</div>
        )}
        {statusVotedEpisodes === "success" &&
          votedEpisodes?.map((episodeInfo) => (
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

export default VotingPage;
