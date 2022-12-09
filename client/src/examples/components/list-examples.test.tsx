import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import GetManyExampleDto from "../dtos/get-many-example.dto";
import ListExamples from "./list-examples";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
};

afterEach(() => jest.clearAllMocks());

test("empty data", () => {
  const data: GetManyExampleDto[] = [];
  (useRouter as jest.Mock).mockReturnValue(mockRouter);

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
  (useRouter as jest.Mock).mockReturnValue(mockRouter);

  render(<ListExamples data={data} />);
  const elementTable = screen.queryByRole("table");

  expect(elementTable).toBeInTheDocument();
  expect(elementTable?.getElementsByTagName("tbody")[0].children).toHaveLength(
    2,
  );
});

test("handles click on example", () => {
  const data: GetManyExampleDto[] = [
    { id: "id1", title: "t1" },
    { id: "id2", title: "t2" },
  ];
  (useRouter as jest.Mock).mockReturnValue(mockRouter);

  render(<ListExamples data={data} />);
  const elementTable = screen.getByRole("table");
  fireEvent.click(elementTable.getElementsByTagName("tbody")[0].children[0]);

  expect(mockRouter.push).toHaveBeenCalledTimes(1);
  expect(mockRouter.push).toHaveBeenCalledWith("/examples/id1");
});
