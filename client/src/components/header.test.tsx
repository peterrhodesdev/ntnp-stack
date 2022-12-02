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

  test("renders links", () => {
    render(<Header title={title} />);
    const links = screen.getAllByRole("link");
    const linkTexts = links.map((link) => link.textContent);

    expect(links).toHaveLength(2);
    expect(linkTexts.find((text) => text?.match(/home/i))).toBeDefined();
    expect(linkTexts.find((text) => text?.match(/examples/i))).toBeDefined();
  });
});
