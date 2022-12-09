import { render, screen } from "@testing-library/react";
import HttpException from "../exceptions/http.exception";
import ErrorMessage from "./error-message";

test("error is undefined", () => {
  const error: unknown = undefined;

  render(<ErrorMessage error={error} />);
  const element = screen.queryByText(/an error has occurred/i);
  const elementMessage = screen.queryByText(/: /i);

  expect(element).toBeInTheDocument();
  expect(elementMessage).not.toBeInTheDocument();
});

test("error without message", () => {
  const error: unknown = new Error();

  render(<ErrorMessage error={error} />);
  const element = screen.queryByText(/an error has occurred/i);
  const elementMessage = screen.queryByText(/: /i);

  expect(element).toBeInTheDocument();
  expect(elementMessage).not.toBeInTheDocument();
});

test("error is http exception", () => {
  const error: unknown = new HttpException("Err msg");

  render(<ErrorMessage error={error} />);
  const element = screen.queryByText(/an error has occurred/i);
  const elementMessage = screen.queryByText(/: err msg/i);

  expect(element).toBeInTheDocument();
  expect(elementMessage).toBeInTheDocument();
});
