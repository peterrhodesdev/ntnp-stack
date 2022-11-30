import { render } from "@testing-library/react";
import Footer from "./footer";

describe("footer", () => {
  test("is sticky", () => {
    const { container } = render(<Footer />);

    expect(container.firstChild).toHaveClass("sticky");
    expect(container.firstChild).toHaveClass("top-[100vh]");
    expect(container.firstChild).toHaveClass("bottom-0");
  });
});
