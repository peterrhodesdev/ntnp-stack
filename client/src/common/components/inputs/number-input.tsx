import Input, { ChildProps } from "./input";

type Props = ChildProps & { value: number };

export default function NumberInput(props: Props) {
  return (
    <Input
      type="number"
      name={props.name}
      value={props.value.toString()}
      onChangeHandler={props.onChangeHandler}
      required={props.required}
      pattern="^(0|[1-9]\d*)(\.\d+)?$"
    />
  );
}
