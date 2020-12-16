import { useState } from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { InfoButton } from "./IconButton";

const SkipLogInWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  > :first-child {
    margin-right: 0.5rem;
  }
`;

const InfoBubbleWrapper = styled.div`
  position: absolute;
  top: 40px;
  left: 21px;
`;

const InfoBubble = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  position: relative;
  width: 215px;
  height: 75px;
  padding: 0px;
  background: var(--info-bubble-light);
  border-radius: 10px;
  ::after {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 0 10px 20px;
    border-color: var(--info-bubble-light) transparent;
    display: block;
    width: 0;
    z-index: 1;
    top: -20px;
    left: 170px;
  }
`;

export const SkipLogIn = () => {
  const [visible, setVisible] = useState(false);
  const handleClickInfo = () => {
    setVisible(!visible);
  };
  return (
    <>
      <SkipLogInWrapper>
        <Link to="/">
          <span>Skip and let me vote!</span>
        </Link>
        <InfoButton onClick={handleClickInfo} />
        {visible && (
          <InfoBubbleWrapper>
            <InfoBubble visible={visible}>
              <p>Please log in with Spotify to save your favorites!</p>
            </InfoBubble>
          </InfoBubbleWrapper>
        )}
      </SkipLogInWrapper>
    </>
  );
};

InfoBubble.propTypes = {
  visible: PropTypes.bool,
};

InfoBubble.defaultProps = {
  visible: false,
};
