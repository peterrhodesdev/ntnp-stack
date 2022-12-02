import { render, screen } from "@testing-library/react";
import Example from "../../../src/pages/examples/[id]";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const INVALID_ID_TEXT = "invalid id";
const VALID_UUID = "123e4567-e89b-12d3-a456-426614174000";

describe("example", () => {
  afterEach(() => jest.clearAllMocks());

  test("query id is undefined", () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {},
    }));
    render(<Example />);

    const heading = screen.queryByRole("heading", {
      name: /example:/i,
    });
    const errorMessage = screen.queryByText(INVALID_ID_TEXT);

    expect(heading).not.toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
    expect(useRouter).toHaveBeenCalledTimes(1);
  });

  test("query id is array", () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: { id: [VALID_UUID] },
    }));
    render(<Example />);

    const heading = screen.queryByRole("heading", {
      name: /example:/i,
    });
    const errorMessage = screen.queryByText(INVALID_ID_TEXT);

    expect(heading).not.toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
    expect(useRouter).toHaveBeenCalledTimes(1);
  });

  test("query id is not UUID", () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: { id: "abc" },
    }));
    render(<Example />);

    const heading = screen.queryByRole("heading", {
      name: /example:/i,
    });
    const errorMessage = screen.queryByText(INVALID_ID_TEXT);

    expect(heading).not.toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
    expect(useRouter).toHaveBeenCalledTimes(1);
  });

  test("query id is UUID", () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: { id: VALID_UUID },
    }));
    render(<Example />);

    const heading = screen.queryByRole("heading", {
      name: new RegExp(`example: ${VALID_UUID}`, "i"),
    });
    const errorMessage = screen.queryByText(INVALID_ID_TEXT);

    expect(heading).toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();
    expect(useRouter).toHaveBeenCalledTimes(1);
  });
});
