import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders storybook react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Skip and let me vote!/i);
  expect(linkElement).toBeInTheDocument();
});
