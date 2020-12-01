import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { ReactComponent as ThemeToggler } from "../../assets/icon-sun-empty.svg";
import { ReactComponent as BurgerMenu } from "../../assets/icon-burger-menu.svg";
import { ReactComponent as Close } from "../../assets/icon-close.svg";
import { ReactComponent as ArrowBack } from "../../assets/icon-arrow-back.svg";
import { ReactComponent as LogOut } from "../../assets/icon-logout.svg";
import { ReactComponent as Filter } from "../../assets/icon-filter.svg";
import { ReactComponent as Info } from "../../assets/icon-info-full.svg";
import { ReactComponent as AddToSpotify } from "../../assets/add-to-spotify.svg";

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

export const ThemeTogglerButton = () => {
  return (
    <IconButton nav>
      <ThemeToggler />
    </IconButton>
  );
};

export const BurgerMenuButton = () => {
  return (
    <IconButton nav>
      <BurgerMenu />
    </IconButton>
  );
};

export const CloseButton = () => {
  return (
    <IconButton>
      <Close />
    </IconButton>
  );
};

export const ArrowBackButton = () => {
  return (
    <IconButton nav>
      <ArrowBack />
    </IconButton>
  );
};

export const LogOutButton = () => {
  return (
    <IconButton nav>
      <LogOut />
    </IconButton>
  );
};

export const FilterButton = () => {
  return (
    <IconButton>
      <Filter />
    </IconButton>
  );
};

export const InfoButton = () => {
  return (
    <IconButton>
      <Info />
    </IconButton>
  );
};

export const AddToSpotifyButton = () => {
  return (
    <IconButton>
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
