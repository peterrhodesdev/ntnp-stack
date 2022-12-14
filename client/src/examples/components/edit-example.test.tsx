import { fireEvent, render, screen } from "@testing-library/react";
import { useMutation, useQueryClient } from "react-query";
import GetOneExampleDto from "../dtos/get-one-example.dto";
import EditExample from "./edit-example";

jest.mock("react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));
jest.mock("../../../src/common/components/inputs/datetime-input", () => ({
  __esModule: true,
  default: () => <>datetime input</>,
}));
jest.mock("../../../src/common/components/inputs/number-input", () => ({
  __esModule: true,
  default: () => <>number input</>,
}));
jest.mock("../../../src/common/components/inputs/text-input", () => ({
  __esModule: true,
  default: (props: any) => {
    const { onChangeHandler, ...otherProps } = props;
    return (
      <input
        data-testid="text-input"
        {...otherProps}
        onChange={onChangeHandler}
      />
    );
  },
}));

const mockQueryClient = jest.fn();
const mockMutation = {
  isLoading: false,
  mutate: jest.fn(),
};

beforeEach(() => {
  (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  (useMutation as jest.Mock).mockReturnValue(mockMutation);
});

afterEach(() => jest.clearAllMocks());

test("renders form", () => {
  const data: GetOneExampleDto = new GetOneExampleDto();

  render(<EditExample data={data} />);
  const elementDatetimeInput = screen.queryByText("datetime input");
  const elementNumberInput = screen.queryByText("number input");
  const elementTextInput = screen.queryByTestId("text-input");

  expect(elementDatetimeInput).toBeInTheDocument();
  expect(elementNumberInput).toBeInTheDocument();
  expect(elementTextInput).toBeInTheDocument();
});

test("handles submit click", () => {
  const data: GetOneExampleDto = {
    id: "i",
    title: "t",
    amount: 1,
    dateOn: new Date(),
  };

  render(<EditExample data={data} />);

  // initially button should be disabled
  const elementSubmitDisabled = screen.getByText("Edit");
  expect(elementSubmitDisabled).toBeDisabled();

  // change property to enable submit button
  const elementTextInput = screen.getByTestId("text-input");
  fireEvent.change(elementTextInput, { target: { value: "a" } });
  const elementSubmitEnabled = screen.getByText("Edit");
  expect(elementSubmitEnabled).not.toBeDisabled();

  fireEvent.click(elementSubmitEnabled);
  expect(mockMutation.mutate).toHaveBeenCalledTimes(1);
});
