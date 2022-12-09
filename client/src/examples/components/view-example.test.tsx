import { render, screen } from "@testing-library/react";
import GetOneExampleDto from "../dtos/get-one-example.dto";
import ViewExample from "./view-example";

test.skip("renders data", () => {
  const data: GetOneExampleDto = new GetOneExampleDto();

  render(<ViewExample data={data} />);
  const elementId = screen.queryByText(/id/i);

  expect(elementId).toBeInTheDocument();
});
