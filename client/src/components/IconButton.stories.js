import { IconButton } from "./IconButton";
import { ReactComponent as ThemeToggler } from "../assets/icon-sun-empty.svg";
import { ReactComponent as BurgerMenu } from "../assets/icon-burger-menu.svg";
import { ReactComponent as Close } from "../assets/icon-close.svg";
import { ReactComponent as ArrowBack } from "../assets/icon-arrow-back.svg";
import { ReactComponent as LogOut } from "../assets/icon-logout.svg";
import { ReactComponent as Filter } from "../assets/icon-filter.svg";
import { ReactComponent as Info } from "../assets/icon-info-full.svg";
import { ReactComponent as AddToSpotify } from "../assets/add-to-spotify.svg";

export default {
  title: "Podium/IconButton",
  parameters: { layout: "centered" },
  component: IconButton,
};

const Template = (args) => <IconButton {...args} />;

export const ThemeTogglerButton = Template.bind({});
ThemeTogglerButton.args = {
  nav: true,
  children: <ThemeToggler />,
};

export const BurgerMenuButton = Template.bind({});
BurgerMenuButton.args = {
  nav: true,
  children: <BurgerMenu />,
};

export const CloseButton = Template.bind({});
CloseButton.args = {
  nav: false,
  children: <Close />,
};

export const ArrowBackButton = Template.bind({});
ArrowBackButton.args = {
  nav: true,
  children: <ArrowBack />,
};

export const LogOutButton = Template.bind({});
LogOutButton.args = {
  nav: true,
  children: <LogOut />,
};

export const FilterButton = Template.bind({});
FilterButton.args = {
  nav: false,
  children: <Filter />,
};

export const InfoButton = Template.bind({});
InfoButton.args = {
  nav: false,
  children: <Info />,
};

export const AddToSpotifyButton = Template.bind({});
AddToSpotifyButton.args = {
  nav: false,
  children: <AddToSpotify />,
};
