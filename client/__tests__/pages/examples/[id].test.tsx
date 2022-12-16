import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import GetOneExampleDto from "../../../src/examples/dtos/get-one-example.dto";
import ExamplesId from "../../../src/pages/examples/[id]";

jest.mock("next/router", () => ({ useRouter: jest.fn() }));
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
jest.mock("../../../src/examples/components/edit-example", () => ({
  __esModule: true,
  default: () => <>edit example</>,
}));
jest.mock("../../../src/examples/components/view-example", () => ({
  __esModule: true,
  default: () => <>view example</>,
}));

const VALID_UUID = "123e4567-e89b-12d3-a456-426614174000";

afterEach(() => jest.clearAllMocks());

test("example is loading", () => {
  (useRouter as jest.Mock).mockImplementation(() => ({
    query: { id: VALID_UUID },
  }));
  const isLoading = true;
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
  const element = screen.queryByText("loading");

  expect(element).toBeInTheDocument();
  expect(useRouter).toHaveBeenCalledTimes(1);
  expect(useQuery).toHaveBeenCalledTimes(1);
});

test("example has error", () => {
  (useRouter as jest.Mock).mockImplementation(() => ({
    query: { id: VALID_UUID },
  }));
  const isLoading = false;
  const isError = true;
  const error: unknown = new Error("err msg");
  const data: GetOneExampleDto | undefined = undefined;
  (useQuery as jest.Mock).mockImplementation(() => ({
    isLoading,
    isError,
    error,
    data,
  }));

  render(<ExamplesId />);
  const element = screen.queryByText("error message");

  expect(element).toBeInTheDocument();
  expect(useRouter).toHaveBeenCalledTimes(1);
  expect(useQuery).toHaveBeenCalledTimes(1);
});

test("example is undefined", () => {
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
  const element = screen.queryByText("data undefined message");

  expect(element).toBeInTheDocument();
  expect(useRouter).toHaveBeenCalledTimes(1);
  expect(useQuery).toHaveBeenCalledTimes(1);
});

test("edit example", () => {
  (useRouter as jest.Mock).mockImplementation(() => ({
    query: { id: VALID_UUID, edit: "true" },
  }));
  const isLoading = false;
  const isError = false;
  const error: unknown = undefined;
  const data: GetOneExampleDto | undefined = new GetOneExampleDto();
  (useQuery as jest.Mock).mockImplementation(() => ({
    isLoading,
    isError,
    error,
    data,
  }));

  render(<ExamplesId />);
  const element = screen.queryByText("edit example");

  expect(element).toBeInTheDocument();
  expect(useRouter).toHaveBeenCalledTimes(1);
  expect(useQuery).toHaveBeenCalledTimes(1);
});

test("view example", () => {
  (useRouter as jest.Mock).mockImplementation(() => ({
    query: { id: VALID_UUID },
  }));
  const isLoading = false;
  const isError = false;
  const error: unknown = undefined;
  const data: GetOneExampleDto | undefined = new GetOneExampleDto();
  (useQuery as jest.Mock).mockImplementation(() => ({
    isLoading,
    isError,
    error,
    data,
  }));

  render(<ExamplesId />);
  const element = screen.queryByText("view example");

  expect(element).toBeInTheDocument();
  expect(useRouter).toHaveBeenCalledTimes(1);
  expect(useQuery).toHaveBeenCalledTimes(1);
});
