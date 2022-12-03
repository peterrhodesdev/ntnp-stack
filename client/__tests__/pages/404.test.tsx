import { render, screen } from "@testing-library/react";
import Custom404 from "../../src/pages/404";

describe("404", () => {
  test("renders a heading", () => {
    render(<Custom404 />);

    const heading = screen.getByRole("heading", {
      name: /page not found/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
