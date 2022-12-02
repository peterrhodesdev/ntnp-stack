import { render, screen } from "@testing-library/react";
import Examples from "../../../src/pages/examples";

describe("examples", () => {
  test("renders a heading", () => {
    render(<Examples />);

    const heading = screen.getByRole("heading", {
      name: /examples/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
