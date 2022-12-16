import { render, screen } from "@testing-library/react";
import GetOneExampleDto from "../dtos/get-one-example.dto";
import ViewExample from "./view-example";

test("renders table", () => {
  const data: GetOneExampleDto = {
    id: "abc",
    title: "def",
    amount: 123,
    dateOn: new Date("2000-01-02"),
  };

  render(<ViewExample data={data} />);
  const elementIdProperty = screen.queryByText("Id");
  const elementIdValue = screen.queryByText("abc");
  const elementTitleProperty = screen.queryByText("Title");
  const elementTitleValue = screen.queryByText("def");
  const elementAmountProperty = screen.queryByText("Amount");
  const elementAmountValue = screen.queryByText("123");
  const elementDateOnProperty = screen.queryByText("Date On");
  const elementDateOnValue = screen.queryByText(/1\/2\/2000/);

  expect(elementIdProperty).toBeInTheDocument();
  expect(elementIdValue).toBeInTheDocument();
  expect(elementTitleProperty).toBeInTheDocument();
  expect(elementTitleValue).toBeInTheDocument();
  expect(elementAmountProperty).toBeInTheDocument();
  expect(elementAmountValue).toBeInTheDocument();
  expect(elementDateOnProperty).toBeInTheDocument();
  expect(elementDateOnValue).toBeInTheDocument();
});
