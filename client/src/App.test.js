import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders storybook react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/To Storybook/i);
  expect(linkElement).toBeInTheDocument();
});
