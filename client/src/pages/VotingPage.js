import { useState, useEffect, useRef, useCallback, Fragment } from "react";
import { useQuery, useInfiniteQuery } from "react-query";
import { useAuth } from "../contexts/AuthContext.js";
import styled, { useTheme } from "styled-components/macro";
import { BurgerMenuButton, FilterButton } from "../components/IconButton.js";
import { ReactComponent as Logo } from "../assets/text-logo-iheart.svg";
import { ReactComponent as LogoDark } from "../assets/text-logo-iheart-darktheme.svg";
import { EpisodeSearch } from "../components/EpisodeSearch.js";
import { EpisodeCard } from "../components/EpisodeCard.js";
import FilterPage from "./FilterPage.js";
import { searchEpisode, getAllVotedEpisodes } from "../utils/api.js";
import LoadingIndicator from "../components/LoadingIndicator.js";
import useDebounce from "../utils/useDebounce.js";

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

  const { user, login } = useAuth();

  const theme = useTheme().theme;

  useEffect(() => {
    const doLogin = async () => {
      await login();
    };
    doLogin();
  }, [login]);

  const {
    data: votedEpisodes,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    "voting",
    ({ pageParam = 0 }) => getAllVotedEpisodes(user.id, pageParam),
    {
      enabled: !!user,
      getNextPageParam: (lastPage) => lastPage.nextSkip ?? false,
    }
  );

  const observer = useRef();

  const lastEpisodeCardRef = useCallback(
    (node) => {
      if (status === "loading") return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        {
          root: null,
          threshold: 0,
          rootMargin: "0px",
        }
      );
      if (node) observer.current.observe(node);
    },
    [status, hasNextPage, fetchNextPage]
  );

  const debouncedSearchData = useDebounce(searchData, 600);

  const { data: suggestions } = useQuery(
    ["search", debouncedSearchData],
    () => searchEpisode(debouncedSearchData),
    { enabled: !!debouncedSearchData }
  );

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
        {status === "loading" && <LoadingIndicator />}
        {status === "error" && (
          <div>An unexpected error occured - please go back to homepage!</div>
        )}
        {status === "success" &&
          votedEpisodes.pages.map((group, i) => (
            <Fragment key={i}>
              {group.data.map((episodeInfo, index) => {
                if (
                  votedEpisodes.pages.length === i + 1 &&
                  group.data.length === index + 1
                ) {
                  return (
                    <EpisodeCard
                      lastEpisodeCardRef={lastEpisodeCardRef}
                      key={episodeInfo.id}
                      episodeId={episodeInfo.id}
                      imgsrc={episodeInfo.images[1]?.url}
                      imgalt={episodeInfo.show.name}
                      title={episodeInfo.name}
                      liked={episodeInfo.liked}
                      likes={episodeInfo.likes}
                    />
                  );
                } else {
                  return (
                    <EpisodeCard
                      key={episodeInfo.id}
                      episodeId={episodeInfo.id}
                      imgsrc={episodeInfo.images[1]?.url}
                      imgalt={episodeInfo.show.name}
                      title={episodeInfo.name}
                      liked={episodeInfo.liked}
                      likes={episodeInfo.likes}
                    />
                  );
                }
              })}
            </Fragment>
          ))}
      </CardsWrapper>
      {isFetchingNextPage && <LoadingIndicator />}
    </PageWrapper>
  );
}

export default VotingPage;
