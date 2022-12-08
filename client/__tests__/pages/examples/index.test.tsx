import { render, screen } from "@testing-library/react";
import * as reactQuery from "react-query";
import Examples from "../../../src/pages/examples";
import GetManyExampleDto from "../../../src/examples/dtos/get-many-example.dto";

jest.mock("react-query", () => ({
  useQuery: jest.fn(),
}));

afterEach(() => jest.clearAllMocks());

function setup(
  data: GetManyExampleDto[] | undefined,
  isLoading: boolean,
  error: unknown,
) {
  const spy = jest.spyOn(reactQuery, "useQuery").mockReturnValue({
    data,
    isLoading,
    error,
  } as reactQuery.UseQueryResult<unknown, unknown>);

  render(<Examples />);

  const headingElement = screen.queryByRole("heading", {
    name: /examples/i,
  });
  const loadingElement = screen.queryByText(/loading/i);
  const errorElement = screen.queryByText(/an error has ocurred/i);
  const emptyDataElement = screen.queryByText(/no results/i);
  const tableElement = screen.queryByRole("table");

  return {
    spy,
    headingElement,
    loadingElement,
    errorElement,
    emptyDataElement,
    tableElement,
  };
}

test("loading", () => {
  const data: GetManyExampleDto[] | undefined = [];
  const isLoading = true;
  const error: unknown = undefined;

  const {
    spy,
    headingElement,
    loadingElement,
    errorElement,
    emptyDataElement,
    tableElement,
  } = setup(data, isLoading, error);

  expect(spy).toHaveBeenCalledTimes(1);
  expect(headingElement).toBeInTheDocument();
  expect(loadingElement).toBeInTheDocument();
  expect(errorElement).not.toBeInTheDocument();
  expect(emptyDataElement).not.toBeInTheDocument();
  expect(tableElement).not.toBeInTheDocument();
});

test("error", () => {
  const data: GetManyExampleDto[] | undefined = [];
  const isLoading = false;
  const error: unknown = new Error();

  const {
    spy,
    headingElement,
    loadingElement,
    errorElement,
    emptyDataElement,
    tableElement,
  } = setup(data, isLoading, error);

  expect(spy).toHaveBeenCalledTimes(1);
  expect(headingElement).toBeInTheDocument();
  expect(loadingElement).not.toBeInTheDocument();
  expect(errorElement).toBeInTheDocument();
  expect(emptyDataElement).not.toBeInTheDocument();
  expect(tableElement).not.toBeInTheDocument();
});

test("empty data", () => {
  const data: GetManyExampleDto[] | undefined = [];
  const isLoading = false;
  const error: unknown = undefined;

  const {
    spy,
    headingElement,
    loadingElement,
    errorElement,
    emptyDataElement,
    tableElement,
  } = setup(data, isLoading, error);

  expect(spy).toHaveBeenCalledTimes(1);
  expect(headingElement).toBeInTheDocument();
  expect(loadingElement).not.toBeInTheDocument();
  expect(errorElement).not.toBeInTheDocument();
  expect(emptyDataElement).toBeInTheDocument();
  expect(tableElement).not.toBeInTheDocument();
});

test("table", () => {
  const data: GetManyExampleDto[] | undefined = [
    { id: "1", title: "t1" },
    { id: "2", title: "t2" },
  ];
  const isLoading = false;
  const error: unknown = undefined;

  const {
    spy,
    headingElement,
    loadingElement,
    errorElement,
    emptyDataElement,
    tableElement,
  } = setup(data, isLoading, error);

  expect(spy).toHaveBeenCalledTimes(1);
  expect(headingElement).toBeInTheDocument();
  expect(loadingElement).not.toBeInTheDocument();
  expect(errorElement).not.toBeInTheDocument();
  expect(emptyDataElement).not.toBeInTheDocument();
  expect(tableElement).toBeInTheDocument();
  expect(tableElement?.getElementsByTagName("tbody")[0].children).toHaveLength(
    data.length,
  );
});
