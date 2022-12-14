import { render, screen } from "@testing-library/react";
import Home from "../../src/pages/index";

describe("home", () => {
  test("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /home/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
