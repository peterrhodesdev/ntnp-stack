import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import GetManyExampleDto from "../dtos/get-many-example.dto";
import ListExamples from "./list-examples";

jest.mock("next/router", () => ({ useRouter: jest.fn() }));
jest.mock("react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));
jest.mock("../../../src/examples/components/create-example", () => ({
  __esModule: true,
  default: () => <>create example</>,
}));

const mockRouter = { push: jest.fn() };
const mockQueryClient = jest.fn();
const mockMutation = {
  isLoading: false,
  mutate: jest.fn(),
};

beforeEach(() => {
  (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  (useMutation as jest.Mock).mockReturnValue(mockMutation);
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
});

afterEach(() => jest.clearAllMocks());

test("empty data", () => {
  const data: GetManyExampleDto[] = [];

  render(<ListExamples data={data} />);
  const elementTable = screen.queryByRole("table");

  expect(elementTable).toBeInTheDocument();
  expect(elementTable?.getElementsByTagName("tbody")[0].children).toHaveLength(
    0,
  );
});

test("renders data in a table", () => {
  const data: GetManyExampleDto[] = [
    { id: "id1", title: "t1" },
    { id: "id2", title: "t2" },
  ];

  render(<ListExamples data={data} />);
  const elementTable = screen.queryByRole("table");

  expect(elementTable).toBeInTheDocument();
  expect(elementTable?.getElementsByTagName("tbody")[0].children).toHaveLength(
    2,
  );
});

test("handles table row click", () => {
  const data: GetManyExampleDto[] = [
    { id: "id1", title: "t1" },
    { id: "id2", title: "t2" },
  ];

  render(<ListExamples data={data} />);
  const elementTable = screen.getByRole("table");
  fireEvent.click(elementTable.getElementsByTagName("tbody")[0].children[0]);

  expect(mockRouter.push).toHaveBeenCalledTimes(1);
  expect(mockRouter.push).toHaveBeenCalledWith("/examples/id1");
});

test("handles create new example click", () => {
  const data: GetManyExampleDto[] = [];

  render(<ListExamples data={data} />);

  // initially element should be hidden
  const elementHidden = screen.queryByText("create example");
  expect(elementHidden).not.toBeInTheDocument();

  // unhide the element
  const elementSetShowCreate = screen.getByTestId("set-show-create");
  fireEvent.click(elementSetShowCreate);

  const elementUnhidden = screen.queryByText("create example");
  expect(elementUnhidden).toBeInTheDocument();
});

test("handles edit click", () => {
  const data: GetManyExampleDto[] = [
    { id: "id1", title: "t1" },
    { id: "id2", title: "t2" },
  ];

  render(<ListExamples data={data} />);
  const elementButtonContainer = screen.getByTestId("button-container-id1");
  fireEvent.click(elementButtonContainer.children[0]);

  expect(mockRouter.push).toHaveBeenCalledTimes(1);
  expect(mockRouter.push).toHaveBeenCalledWith("/examples/id1?edit=true");
});

test("handles delete click", () => {
  const data: GetManyExampleDto[] = [
    { id: "id1", title: "t1" },
    { id: "id2", title: "t2" },
  ];

  render(<ListExamples data={data} />);
  const elementButtonContainer = screen.getByTestId("button-container-id1");
  fireEvent.click(elementButtonContainer.children[1]);

  expect(mockMutation.mutate).toHaveBeenCalledTimes(1);
  expect(mockMutation.mutate).toHaveBeenCalledWith({ id: "id1" });
});
