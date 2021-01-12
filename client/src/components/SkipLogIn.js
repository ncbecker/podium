import { useState } from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { InfoButton } from "./IconButton";

const SkipLogInWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  > :first-child {
    color: ${(props) => props.theme.textOnBg};
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
  background: ${(props) => props.theme.infoBubble};
  border-radius: 10px;
  ::after {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 0 10px 20px;
    border-color: ${(props) => props.theme.infoBubble} transparent;
    display: block;
    width: 0;
    z-index: 1;
    top: -20px;
    left: 170px;
  }
  p {
    color: ${(props) => props.theme.text};
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
        <button
          onClick={() =>
            toast("Unauthenticated app not yet supported", {
              style: {
                "font-size": "12px",
              },
            })
          }
        >
          <span>Skip and let me vote!</span>
        </button>
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
