import Input, { ChildProps } from "./input";

type Props = ChildProps & { value: Date };

export default function DatetimeInput(props: Props) {
  return (
    <Input
      type="datetime-local"
      name={props.name}
      value={props.value.toISOString().slice(0, -1)}
      onChangeHandler={props.onChangeHandler}
      required={props.required}
      pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}"
    />
  );
}
