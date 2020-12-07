import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { ReactComponent as Spotify } from "../assets/icon-spotify.svg";
import { useHistory } from "react-router-dom";

export const ActionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 248px;
  height: 57px;
  margin-bottom: 15px;
  background-color: var(--action-light);
  border: none;
  border-radius: 30px;
  box-shadow: var(--button-shadow-light);
  cursor: pointer;
  span {
    color: var(--button-text-light);
    font-weight: 500;
    margin-right: 10px;
  }
  svg {
    fill: var(--icon-light);
  }
`;

export const LogInButton = () => {
  const history = useHistory();
  return (
    <ActionButton
      onClick={() => {
        history.push("/vote");
      }}
    >
      <span>Log in with Spotify</span>
      <Spotify />
    </ActionButton>
  );
};

ActionButton.propTypes = {
  onClick: PropTypes.func,
};

ActionButton.defaultProps = {
  onClick: undefined,
};
