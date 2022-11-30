import { render, screen } from "@testing-library/react";
import Home from "../../src/pages/index";
import "@testing-library/jest-dom";

describe("home", () => {
  test("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /home/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
