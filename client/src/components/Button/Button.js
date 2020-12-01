import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { ReactComponent as Spotify } from "../../assets/icon-spotify.svg";
import { InfoButton } from "./IconButton";

const ActionButton = styled.button`
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
    font-weight: medium;
    margin-right: 10px;
  }
  svg {
    fill: var(--icon-light);
  }
`;

export const LogInButton = () => {
  return (
    <ActionButton>
      <span>Log in with Spotify</span>
      <Spotify />
    </ActionButton>
  );
};

const SkipLogInWrapper = styled.div`
  display: flex;
  justify-content: center;
  > :first-child {
    margin-right: 0.5rem;
  }
`;

export const SkipLogIn = () => {
  return (
    <SkipLogInWrapper>
      <a href="/storybook">Skip and let me vote!</a>
      <InfoButton />
    </SkipLogInWrapper>
  );
};

LogInButton.propTypes = {
  onClick: PropTypes.func,
};

LogInButton.defaultProps = {
  onClick: undefined,
};
