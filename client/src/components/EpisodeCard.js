import { useState } from "react";
import styled from "styled-components/macro";
import Lottie from "react-lottie";
import animationData from "../assets/lotties/heart-burst.json";
import { ReactComponent as NotLiked } from "../assets/icon-heart-empty.svg";
import { ReactComponent as Liked } from "../assets/icon-heart-full.svg";
import Placeholder from "../assets/placeholder-episode-pic.jpeg";

const Card = styled.div`
  width: 320px;
  height: 115px;
  border-radius: 5px;
  padding: 10px;
  background: var(--cards-light);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EpisodeInfos = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
  }
  span {
    margin: 0 5px;
    overflow: hidden;
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
  z-index: 1;
`;

const LikeCounter = styled.div`
  font-size: 0.75rem;
  font-weight: medium;
  color: var(--button-text-light);
`;

const LottieContainer = styled.div`
  position: absolute;
  top: -180px;
  left: -180px;
`;

export const EpisodeCard = () => {
  const [isLiked, setIsLiked] = useState(false);

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleClickLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Card>
      <EpisodeInfos>
        <img src={Placeholder} alt="Placeholder" />
        <span>Sehnsucht nach New York / Fernsehabend mit Jan und Olli</span>
      </EpisodeInfos>
      <LikeContainer>
        <LikeButton onClick={handleClickLike}>
          {!isLiked && <NotLiked />}
          {isLiked && <Liked />}
        </LikeButton>
        <LikeCounter>148</LikeCounter>
        <LottieContainer>
          <Lottie
            options={defaultOptions}
            height={400}
            width={400}
            isStopped={!isLiked}
          />
        </LottieContainer>
      </LikeContainer>
    </Card>
  );
};
