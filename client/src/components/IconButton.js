import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { ReactComponent as ThemeToggler } from "../assets/icon-sun-empty.svg";
import { ReactComponent as BurgerMenu } from "../assets/icon-burger-menu.svg";
import { ReactComponent as Close } from "../assets/icon-close.svg";
import { ReactComponent as ArrowBack } from "../assets/icon-arrow-back.svg";
import { ReactComponent as LogOut } from "../assets/icon-logout.svg";
import { ReactComponent as Filter } from "../assets/icon-filter.svg";
import { ReactComponent as Info } from "../assets/icon-info-full.svg";
import { ReactComponent as AddToSpotify } from "../assets/add-to-spotify.svg";
import { useHistory } from "react-router-dom";

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

export const ThemeTogglerButton = ({ ...props }) => {
  return (
    <IconButton nav {...props}>
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

export const CloseButton = ({ ...props }) => {
  const history = useHistory();

  return (
    <IconButton
      onClick={() => {
        history.goBack();
      }}
      {...props}
    >
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

export const LogOutButton = ({ ...props }) => {
  const history = useHistory();

  return (
    <IconButton
      nav
      onClick={() => {
        history.push("/login");
      }}
      {...props}
    >
      <LogOut />
    </IconButton>
  );
};

export const FilterButton = ({ ...props }) => {
  const history = useHistory();

  return (
    <IconButton
      onClick={() => {
        history.push("/filter");
      }}
      {...props}
    >
      <Filter />
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
