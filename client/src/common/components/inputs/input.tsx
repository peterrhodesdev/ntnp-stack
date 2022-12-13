import { ChangeEvent } from "react";

type Props = {
  type: string;
  name: string;
  value: string;
  onChangeHandler: (_event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  pattern?: string;
};

export type ChildProps = Omit<Props, "type" | "pattern" | "value">;

export default function Input(props: Props) {
  return (
    <input
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={(event) => props.onChangeHandler(event)}
      required={props.required}
      pattern={props.pattern}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  );
}
