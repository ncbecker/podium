import { EpisodeCard, placeholderInfo } from "./EpisodeCard";

export default {
  title: "Podium/Cards",
  parameters: { layout: "centered" },
  component: EpisodeCard,
};

const Template = (args) => <EpisodeCard {...args} />;

export const ExampleEpisode = Template.bind({});
ExampleEpisode.args = {
  imgsrc: placeholderInfo.imgsrc,
  imgalt: placeholderInfo.imgalt,
  title: placeholderInfo.title,
  userLiked: placeholderInfo.userLiked,
  likes: placeholderInfo.likes,
};
