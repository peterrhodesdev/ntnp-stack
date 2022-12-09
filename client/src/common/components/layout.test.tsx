import { render, screen } from "@testing-library/react";
import Layout from "./layout";

const mockChildComponentProps = jest.fn();
jest.mock("./header", () => (props: any) => {
  mockChildComponentProps(props);
  return (() => <div data-testid="mock-header" />)();
});
jest.mock("./footer", () => () => (() => <div data-testid="mock-footer" />)());

// https://github.com/vercel/next.js/discussions/11060#discussioncomment-33628
jest.mock("next/head", () => ({
  __esModule: true,
  default: ({ children }: { children: Array<React.ReactElement> }) => {
    return <>{children}</>;
  },
}));

const title = "title";

describe("layout", () => {
  afterEach(() => jest.clearAllMocks());

  test("title set", () => {
    render(<Layout title={title}>{}</Layout>);

    expect(document.title).toEqual(title);
  });

  test("height set (required for sticky footer)", () => {
    render(<Layout title={title}>{}</Layout>);

    expect(screen.queryByTestId("container")).toHaveClass("min-h-screen");
  });

  test("renders header", () => {
    const { container } = render(<Layout title={title}>{}</Layout>);

    expect(
      container.querySelectorAll(`[data-testid="mock-header"]`),
    ).toHaveLength(1);
    expect(mockChildComponentProps).toBeCalledTimes(1);
    expect(mockChildComponentProps).toHaveBeenCalledWith({ title: "title" });
  });

  test("renders footer", () => {
    const { container } = render(<Layout title={title}>{}</Layout>);

    expect(
      container.querySelectorAll(`[data-testid="mock-footer"]`),
    ).toHaveLength(1);
  });
});
