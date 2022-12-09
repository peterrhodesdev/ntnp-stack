import { render, screen } from "@testing-library/react";
import DataUndefinedMessage from "./data-undefined-message";

test("renders message", () => {
  render(<DataUndefinedMessage />);
  const element = screen.queryByText(/waiting for data to be resolved.../i);

  expect(element).toBeInTheDocument();
});
