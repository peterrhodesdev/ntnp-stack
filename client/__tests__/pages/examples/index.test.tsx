import { render, screen } from "@testing-library/react";
import * as reactQuery from "react-query";
import Examples from "../../../src/pages/examples";
import GetManyExampleDto from "../../../src/examples/dtos/get-many-example.dto";

jest.mock("react-query", () => ({
  useQuery: jest.fn(),
}));

afterEach(() => jest.clearAllMocks());

test("renders a heading", () => {
  const isLoading = false;
  const isError = false;
  const error: unknown = undefined;
  const data: GetManyExampleDto[] | undefined = [];
  const spy = jest.spyOn(reactQuery, "useQuery").mockReturnValue({
    isLoading,
    isError,
    error,
    data,
  } as reactQuery.UseQueryResult<unknown, unknown>);

  render(<Examples />);
  const elementHeading = screen.queryByRole("heading", {
    name: /examples/i,
  });

  expect(spy).toHaveBeenCalledTimes(1);
  expect(elementHeading).toBeInTheDocument();
});
