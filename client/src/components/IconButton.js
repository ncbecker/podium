import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { ReactComponent as ThemeToggler } from "../assets/icon-sun-empty.svg";
import { ReactComponent as BurgerMenu } from "../assets/icon-burger-menu.svg";
import { ReactComponent as Close } from "../assets/icon-close.svg";
import { ReactComponent as ArrowBack } from "../assets/icon-arrow-back.svg";
import { ReactComponent as LogOut } from "../assets/icon-logout.svg";
import { ReactComponent as Filter } from "../assets/icon-filter.svg";
import { ReactComponent as Search } from "../assets/icon-search.svg";
import { ReactComponent as Info } from "../assets/icon-info-full.svg";
import { ReactComponent as AddToSpotify } from "../assets/add-to-spotify.svg";

export const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.nav ? "48px" : "auto")};
  height: ${(props) => (props.nav ? "48px" : "auto")};
  svg {
    fill: var(--icon-light);
  }
`;

export const ThemeTogglerButton = ({ onClick }) => {
  return (
    <IconButton nav onClick={onClick}>
      <ThemeToggler />
    </IconButton>
  );
};

export const BurgerMenuButton = ({ ...props }) => {
  const history = useHistory();

  return (
    <IconButton
      nav
      onClick={() => {
        history.push("/user");
      }}
      {...props}
    >
      <BurgerMenu />
    </IconButton>
  );
};

export const CloseButton = ({ onClick }) => {
  return (
    <IconButton nav onClick={onClick}>
      <Close />
    </IconButton>
  );
};

export const ArrowBackButton = ({ ...props }) => {
  const history = useHistory();

  return (
    <IconButton
      nav
      onClick={() => {
        history.goBack();
      }}
      {...props}
    >
      <ArrowBack />
    </IconButton>
  );
};

export const LogOutButton = ({ onClick, ...props }) => {
  return (
    <IconButton nav onClick={onClick} {...props}>
      <LogOut />
    </IconButton>
  );
};

export const FilterButton = ({ onClick }) => {
  return (
    <>
      <IconButton onClick={onClick}>
        <Filter />
      </IconButton>
    </>
  );
};

export const SearchButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <Search />
    </IconButton>
  );
};

export const InfoButton = ({ ...props }) => {
  return (
    <IconButton {...props}>
      <Info />
    </IconButton>
  );
};

export const AddToSpotifyButton = ({ ...props }) => {
  return (
    <IconButton {...props}>
      <AddToSpotify />
    </IconButton>
  );
};

IconButton.propTypes = {
  nav: PropTypes.bool,
  onClick: PropTypes.func,
};

IconButton.defaultProps = {
  onClick: undefined,
};

ThemeTogglerButton.propTypes = {
  onClick: PropTypes.func,
};

FilterButton.propTypes = {
  onClick: PropTypes.func,
};

SearchButton.propTypes = {
  onClick: PropTypes.func,
};

CloseButton.propTypes = {
  onClick: PropTypes.func,
};

LogOutButton.propTypes = {
  onClick: PropTypes.func,
};
