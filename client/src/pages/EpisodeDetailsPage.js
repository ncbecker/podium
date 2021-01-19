import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled, { useTheme } from "styled-components/macro";
import { useAuth } from "../contexts/AuthContext.js";
import { useQuery } from "react-query";
import {
  AddToSpotifyButton,
  ArrowBackButton,
} from "../components/IconButton.js";
import { ReactComponent as Logo } from "../assets/text-logo-iheart.svg";
import { ReactComponent as LogoDark } from "../assets/text-logo-iheart-darktheme.svg";
import { ReactComponent as NotLiked } from "../assets/icon-heart-empty.svg";
import { ReactComponent as Liked } from "../assets/icon-heart-full.svg";
import {
  getEpisodeDetailsFromDB,
  addOrUpdateEpisodeInDB,
} from "../utils/api.js";

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: repeat(6, auto) 1fr;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0;
  }
`;

const TopBar = styled.div`
  min-height: 48px;
  grid-row: 1 / 2;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: "back logo .";
  place-items: center;
`;

const ArrowBack = styled(ArrowBackButton)`
  grid-area: back;
  justify-self: start;
`;

const LogoContainer = styled.div`
  grid-area: logo;
  svg {
    width: 53.67px;
    height: 16px;
  }
`;

const TitleWrapper = styled.div`
  margin: 10px 20px;
  grid-row: 2 / 3;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  img {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    margin-right: 10px;
  }
  span {
    font-size: 1.25rem;
    font-weight: 500;
    color: ${(props) => props.theme.textOnBg};
  }
`;

const ShowTitle = styled.span`
  margin: 10px 20px;
  grid-row: 3 / 4;
  font-weight: 500;
  color: ${(props) => props.theme.textOnBg};
`;

const Description = styled.span`
  margin: 10px 20px;
  grid-row: 4 / 5;
  color: ${(props) => props.theme.textOnBg};
  overflow-wrap: anywhere;
`;

const Stats = styled.span`
  margin: 10px 20px;
  grid-row: 5 / 6;
  font-size: 0.75rem;
  color: ${(props) => props.theme.textOnBg};
`;

const ButtonWrapper = styled.div`
  margin: 10px 20px;
  padding: 10px;
  grid-row: 6 / 7;
  display: flex;
  justify-content: flex-end;
`;

const LikedSmall = styled(Liked)`
  height: 23.09px;
  width: 24px;
  margin-left: 10px;
  display: block;
`;

const NotLikedSmall = styled(NotLiked)`
  height: 23.09px;
  width: 24px;
  margin-left: 10px;
  display: block;
  path {
    fill: ${(props) => props.theme.noLikeOnBg};
  }
`;

function EpisodeDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(null);

  const theme = useTheme().theme;

  const { data: episodeDetails, status: statusEpisodeDetails } = useQuery(
    ["voting", id, user.id],
    async () => {
      if (id && user.id) {
        const data = await getEpisodeDetailsFromDB(id, user.id);
        return data;
      }
    }
  );

  useEffect(() => {
    if (episodeDetails) {
      setIsLiked(episodeDetails.liked);
      setLikeCount(episodeDetails.likes);
    }
  }, [episodeDetails]);

  const handleClickLike = async () => {
    if (isLiked) {
      setIsLiked(!isLiked);
      setLikeCount(likeCount - 1);
    } else {
      setIsLiked(!isLiked);
      setLikeCount(likeCount + 1);
    }
    await addOrUpdateEpisodeInDB(id, user.id, !isLiked);
  };

  return (
    <PageWrapper>
      <TopBar>
        <ArrowBack />
        <LogoContainer>
          {theme === "light" ? <Logo /> : <LogoDark />}
        </LogoContainer>
      </TopBar>
      {statusEpisodeDetails === "loading" && <div>Loading...</div>}
      {statusEpisodeDetails === "error" && (
        <div>An unexpected error occured - please go back to homepage!</div>
      )}
      {episodeDetails && (
        <>
          <TitleWrapper>
            <img
              src={episodeDetails.images[1]?.url}
              alt={episodeDetails.name}
            />
            <span>{episodeDetails.name}</span>
          </TitleWrapper>
          <ShowTitle>{episodeDetails.show.name}</ShowTitle>
          <Description>{episodeDetails.description}</Description>
          <Stats>
            {episodeDetails.release_date +
              " | " +
              episodeDetails.duration_min +
              " Min. | " +
              likeCount +
              " Likes"}
          </Stats>
          <ButtonWrapper>
            <AddToSpotifyButton
              as="a"
              href={episodeDetails.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            />
            <button onClick={handleClickLike}>
              {isLiked ? <LikedSmall /> : <NotLikedSmall />}
            </button>
          </ButtonWrapper>
        </>
      )}
    </PageWrapper>
  );
}

export default EpisodeDetailsPage;
