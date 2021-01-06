import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { ReactComponent as Spotify } from "../assets/icon-spotify.svg";

export const ActionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 248px;
  height: 57px;
  margin-bottom: 15px;
  background-color: ${(props) => props.theme.action};
  border: none;
  border-radius: 30px;
  box-shadow: ${(props) => props.theme.buttonShadow};
  cursor: pointer;
  span {
    color: ${(props) => props.theme.buttonText};
    font-weight: 500;
    margin-right: 10px;
  }
  svg {
    fill: ${(props) => props.theme.buttonText};
  }
`;

export const LogInButton = ({ onClick }) => {
  return (
    <ActionButton onClick={onClick}>
      <span>Log in with Spotify</span>
      <Spotify />
    </ActionButton>
  );
};

LogInButton.propTypes = {
  onClick: PropTypes.func,
};

LogInButton.defaultProps = {
  onClick: undefined,
};
