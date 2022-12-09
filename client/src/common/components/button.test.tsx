import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./button";

test("renders default", () => {
  const text = "button text";

  render(<Button text={text} />);
  const element = screen.getByRole("button");

  expect(element).toBeInTheDocument();
  expect(element.textContent).toEqual(text);
  expect(element).not.toHaveAttribute("type");
  expect(element).not.toHaveAttribute("onClick");
  expect(element).not.toHaveAttribute("disabled");
  expect(element).toHaveAttribute("class");
});

test("type", () => {
  const type = "submit";

  render(<Button text="button text" type={type} />);
  const element = screen.getByRole("button");

  expect(element).toHaveAttribute("type");
  expect(element.getAttribute("type")).toEqual(type);
});

test("clicked", () => {
  const onClickHandler = jest.fn();

  render(<Button text="button text" onClickHandler={onClickHandler} />);
  const element = screen.getByRole("button");
  fireEvent.click(element);

  expect(onClickHandler).toHaveBeenCalledTimes(1);
});

test("is disabled", () => {
  render(<Button text="button text" isDisabled={true} />);
  const element = screen.getByRole("button");

  expect(element).toBeInTheDocument();
  expect(element).toBeDisabled();
});
