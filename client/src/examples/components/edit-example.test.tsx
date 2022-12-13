import { render, screen } from "@testing-library/react";
import GetOneExampleDto from "../dtos/get-one-example.dto";
import EditExample from "./edit-example";

test.skip("renders form", () => {
  const data: GetOneExampleDto = new GetOneExampleDto();

  render(<EditExample data={data} />);
  const elementId = screen.queryByText(/id/i);

  expect(elementId).toBeInTheDocument();
});
