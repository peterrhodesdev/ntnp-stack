import { render, screen } from "@testing-library/react";
import Loading from "./loading";

test("renders message", () => {
  render(<Loading />);
  const element = screen.queryByText(/loading.../i);

  expect(element).toBeInTheDocument();
});
