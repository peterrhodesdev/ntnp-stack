import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./header";

const title = "title";

describe("header", () => {
  test("renders title", () => {
    render(<Header title={title} />);

    const titleElement = screen.getByText(new RegExp(title));

    expect(titleElement).toBeInTheDocument();
  });

  test("renders a link to home", () => {
    render(<Header title={title} />);

    const link = screen.getByRole("link", {
      name: /home/i,
    });

    expect(link).toBeInTheDocument();
  });
});
