import EpisodeDetailsPage from "./EpisodeDetailsPage";
import PlaceholderIMG from "../assets/placeholder-episode-pic.jpeg";

export default {
  title: "Podium/Pages",
  component: EpisodeDetailsPage,
};

const Template = (args) => <EpisodeDetailsPage {...args} />;

export const EpisodeDetailsExample = Template.bind({});
EpisodeDetailsExample.args = {
  imgsrc: PlaceholderIMG,
  imgalt: "Placeholder",
  title: "Sehnsucht nach New York / Fernsehabend mit Jan und Olli",
  show: "Fest & Flauschig",
  description:
    "Füße hoch und Chips bereithalten, Jan und Olli kommentieren quasi live die Verleihung vom Deutschen Comedypreis. Sie telefonieren in einer Werbepause mit der großartigen Katrin Bauerfeind (die direkt danach wieder auf die Bühne muss) und nebenbei erfahren wir, dass eine bekannte Politikerin im selben Krankenhaus geboren wurde wie Olli Schulz!Füße hoch und Chips bereithalten, Jan und Olli kommentieren quasi live die Verleihung vom Deutschen Comedypreis. Sie telefonieren in einer Werbepause mit der großartigen Katrin Bauerfeind (die direkt danach wieder auf die Bühne muss) und nebenbei erfahren wir, dass eine bekannte Politikerin im selben Krankenhaus geboren wurde wie Olli Schulz!",
  date: "3. Okt.",
  duration: "85 Min.",
  likes: 42,
  userLiked: false,
};
