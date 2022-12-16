import { render, screen } from "@testing-library/react";
import { useQuery } from "react-query";
import Examples from "../../../src/pages/examples";
import GetManyExampleDto from "../../../src/examples/dtos/get-many-example.dto";

jest.mock("react-query", () => ({ useQuery: jest.fn() }));
jest.mock("../../../src/common/components/data-undefined-message", () => ({
  __esModule: true,
  default: () => <>data undefined message</>,
}));
jest.mock("../../../src/common/components/error-message", () => ({
  __esModule: true,
  default: () => <>error message</>,
}));
jest.mock("../../../src/common/components/loading", () => ({
  __esModule: true,
  default: () => <>loading</>,
}));
jest.mock("../../../src/examples/components/list-examples", () => ({
  __esModule: true,
  default: () => <>list examples</>,
}));

afterEach(() => jest.clearAllMocks());

test("examples are loading", () => {
  const isLoading = true;
  const isError = false;
  const error: unknown = undefined;
  const data: GetManyExampleDto[] | undefined = [];
  (useQuery as jest.Mock).mockImplementation(() => ({
    isLoading,
    isError,
    error,
    data,
  }));

  render(<Examples />);
  const element = screen.queryByText("loading");

  expect(element).toBeInTheDocument();
  expect(useQuery).toHaveBeenCalledTimes(1);
});

test("examples have error", () => {
  const isLoading = false;
  const isError = true;
  const error: unknown = new Error("err msg");
  const data: GetManyExampleDto[] | undefined = [];
  (useQuery as jest.Mock).mockImplementation(() => ({
    isLoading,
    isError,
    error,
    data,
  }));

  render(<Examples />);
  const element = screen.queryByText("error message");

  expect(element).toBeInTheDocument();
  expect(useQuery).toHaveBeenCalledTimes(1);
});

test("examples are undefined", () => {
  const isLoading = false;
  const isError = false;
  const error: unknown = undefined;
  const data: GetManyExampleDto[] | undefined = undefined;
  (useQuery as jest.Mock).mockImplementation(() => ({
    isLoading,
    isError,
    error,
    data,
  }));

  render(<Examples />);
  const element = screen.queryByText("data undefined message");

  expect(element).toBeInTheDocument();
  expect(useQuery).toHaveBeenCalledTimes(1);
});

test("list examples", () => {
  const isLoading = false;
  const isError = false;
  const error: unknown = undefined;
  const data: GetManyExampleDto[] | undefined = [];
  (useQuery as jest.Mock).mockImplementation(() => ({
    isLoading,
    isError,
    error,
    data,
  }));

  render(<Examples />);
  const element = screen.queryByText("list examples");

  expect(element).toBeInTheDocument();
  expect(useQuery).toHaveBeenCalledTimes(1);
});
