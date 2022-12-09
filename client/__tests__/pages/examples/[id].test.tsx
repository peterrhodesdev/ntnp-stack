import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import GetOneExampleDto from "../../../src/examples/dtos/get-one-example.dto";
import ExamplesId from "../../../src/pages/examples/[id]";

jest.mock("next/router", () => ({ useRouter: jest.fn() }));
jest.mock("react-query", () => ({ useQuery: jest.fn() }));
jest.mock("../../../src/examples/components/view-example", () => ({
  __esModule: true,
  default: () => <div />,
}));

const VALID_UUID = "123e4567-e89b-12d3-a456-426614174000";

afterEach(() => jest.clearAllMocks());

test("renders a heading", () => {
  (useRouter as jest.Mock).mockImplementation(() => ({
    query: { id: VALID_UUID },
  }));
  const isLoading = false;
  const isError = false;
  const error: unknown = undefined;
  const data: GetOneExampleDto | undefined = undefined;
  (useQuery as jest.Mock).mockImplementation(() => ({
    isLoading,
    isError,
    error,
    data,
  }));

  render(<ExamplesId />);
  const heading = screen.queryByRole("heading", {
    name: new RegExp(`example: ${VALID_UUID}`, "i"),
  });

  expect(heading).toBeInTheDocument();
  expect(useRouter).toHaveBeenCalledTimes(1);
  expect(useQuery).toHaveBeenCalledTimes(1);
});

test.skip("renders loading", () => {
  // TODO
  expect(false).toBeTruthy();
});
