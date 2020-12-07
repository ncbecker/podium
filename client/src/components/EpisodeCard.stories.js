import { EpisodeCard } from "./EpisodeCard";
import PlaceholderIMG from "../assets/placeholder-episode-pic.jpeg";

export default {
  title: "Podium/Cards",
  parameters: { layout: "centered" },
  component: EpisodeCard,
};

const Template = (args) => <EpisodeCard {...args} />;

export const ExampleEpisode = Template.bind({});
ExampleEpisode.args = {
  imgsrc: PlaceholderIMG,
  imgalt: "Placeholder",
  title: "Sehnsucht nach New York / Fernsehabend mit Jan und Olli",
  userLiked: false,
  likes: 42,
};
