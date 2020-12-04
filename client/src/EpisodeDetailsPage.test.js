import { render, screen } from "@testing-library/react";
import EpisodeDetailsPage from "./pages/EpisodeDetailsPage";

test("renders link on LogInPage", () => {
  render(<EpisodeDetailsPage />);
  const linkElement = screen.getByText(/EpisodeDetailsPage/i);
  expect(linkElement).toBeInTheDocument();
});
