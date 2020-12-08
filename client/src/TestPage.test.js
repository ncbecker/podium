import { render, screen } from "@testing-library/react";
import TestPage from "./TestPage";

test("renders text on TestPage", () => {
  render(<TestPage />);
  const linkElement = screen.getByText(/Test/i);
  expect(linkElement).toBeInTheDocument();
});
