import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { useAuth } from "../contexts/AuthContext.js";
import {
  AddToSpotifyButton,
  ArrowBackButton,
} from "../components/IconButton.js";
import { ReactComponent as Logo } from "../assets/text-logo-iheart.svg";
import { ReactComponent as NotLiked } from "../assets/icon-heart-empty.svg";
import { ReactComponent as Liked } from "../assets/icon-heart-full.svg";
import {
  getEpisodeDetailsFromDB,
  updateEpisodeLikeInDB,
} from "../utils/api.js";

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: repeat(6, auto) 1fr;
`;

const TopBar = styled.div`
  width: 100%;
  grid-row: 1 / 2;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: "back logo .";
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

const TitleWrapper = styled.div`
  width: 320px;
  margin: 10px 0;
  padding-left: 20px;
  grid-row: 2 / 3;
  display: flex;
  justify-content: space-between;
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
  }
`;

const ShowTitle = styled.span`
  width: 320px;
  margin-bottom: 10px;
  padding-left: 20px;
  grid-row: 3 / 4;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Description = styled.span`
  width: 320px;
  margin-bottom: 10px;
  padding-left: 20px;
  grid-row: 4 / 5;
`;

const Stats = styled.span`
  width: 320px;
  margin-bottom: 10px;
  padding-left: 20px;
  grid-row: 5 / 6;
  font-size: 0.75rem;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ButtonWrapper = styled.div`
  width: 320px;
  margin-bottom: 10px;
  padding-left: 20px;
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
`;

function EpisodeDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [episodeDetails, setEpisodeDetails] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(null);

  useEffect(() => {
    const doFetch = async () => {
      const details = await getEpisodeDetailsFromDB(id, user.id);
      setEpisodeDetails(details);
    };
    if (id && user.id) {
      doFetch();
    }
  }, [id, user.id]);

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
    await updateEpisodeLikeInDB(id, user.id, !isLiked);
  };

  return (
    <PageWrapper>
      <TopBar>
        <ArrowBack />
        <LogoContainer>
          <Logo />
        </LogoContainer>
      </TopBar>
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
