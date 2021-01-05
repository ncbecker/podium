import { useState } from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../assets/lotties/heart-burst.json";
import { ReactComponent as NotLiked } from "../assets/icon-heart-empty.svg";
import { ReactComponent as Liked } from "../assets/icon-heart-full.svg";
import { updateEpisodeLikeInDB } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";

const Card = styled.div`
  width: 320px;
  height: 115px;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 15px;
  background: var(--cards-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EpisodeInfos = styled.div`
  min-width: 250px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  cursor: pointer;
  img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
  }
  span {
    height: 80px;
    margin: 0 10px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const LikeContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LikeButton = styled.button`
  margin-bottom: 5px;
`;

const LikeCounter = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--button-text-light);
`;

const LottieContainer = styled.div`
  position: absolute;
  top: -180px;
  left: -180px;
  pointer-events: none;
`;

export const EpisodeCard = ({
  episodeId,
  imgsrc,
  imgalt,
  title,
  liked,
  likes,
}) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [playLottie, setPlayLottie] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const history = useHistory();
  const { user } = useAuth();

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleClickLike = async () => {
    if (isLiked) {
      setIsLiked(!isLiked);
      setLikeCount(likeCount - 1);
    } else {
      setIsLiked(!isLiked);
      setPlayLottie(!playLottie);
      setLikeCount(likeCount + 1);
    }
    await updateEpisodeLikeInDB(episodeId, user.id, !isLiked);
  };

  return (
    <Card>
      <EpisodeInfos
        onClick={() => {
          history.push(`/details/${episodeId}`);
        }}
      >
        <img src={imgsrc} alt={imgalt} />
        <span title={title}>{title}</span>
      </EpisodeInfos>
      <LikeContainer>
        <LikeButton onClick={handleClickLike}>
          {isLiked ? <Liked /> : <NotLiked />}
        </LikeButton>
        <LikeCounter>{likeCount}</LikeCounter>
        <LottieContainer>
          <Lottie
            options={defaultOptions}
            height={400}
            width={400}
            isStopped={!playLottie}
          />
        </LottieContainer>
      </LikeContainer>
    </Card>
  );
};

EpisodeCard.propTypes = {
  episodeId: PropTypes.string,
  imgsrc: PropTypes.string,
  imgalt: PropTypes.string,
  title: PropTypes.string,
  liked: PropTypes.bool,
  likes: PropTypes.number,
};
