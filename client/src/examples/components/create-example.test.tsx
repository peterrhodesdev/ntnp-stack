import { fireEvent, render, screen } from "@testing-library/react";
import { useMutation, useQueryClient } from "react-query";
import CreateExample from "./create-example";

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
  default: () => <>text input</>,
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
  render(<CreateExample />);
  const elementDatetimeInput = screen.queryByText("datetime input");
  const elementNumberInput = screen.queryByText("number input");
  const elementTextInput = screen.queryByText("text input");

  expect(elementDatetimeInput).toBeInTheDocument();
  expect(elementNumberInput).toBeInTheDocument();
  expect(elementTextInput).toBeInTheDocument();
});

test("handles submit click", () => {
  render(<CreateExample />);
  const elementSubmit = screen.getByText("Create");
  fireEvent.click(elementSubmit);

  expect(mockMutation.mutate).toHaveBeenCalledTimes(1);
});
