import Input, { ChildProps } from "./input";

type Props = ChildProps & { value: string };

export default function TextInput(props: Props) {
  return (
    <Input
      type="text"
      name={props.name}
      value={props.value}
      onChangeHandler={props.onChangeHandler}
      required={props.required}
    />
  );
}
