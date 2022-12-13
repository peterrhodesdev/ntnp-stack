type Props = {
  text: string;
  type?: "submit" | "button";
  onClickHandler?: () => void;
  isDisabled?: boolean;
};

export default function Button(props: Props) {
  return (
    <button
      type={props.type}
      onClick={props.onClickHandler}
      disabled={props.isDisabled}
      className={`text-gray-900 border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 w-fit ${
        props.isDisabled
          ? " bg-gray-300 "
          : " bg-white active:outline-none active:ring-4 active:ring-gray-200 hover:bg-gray-100 "
      }`}
    >
      {props.text}
    </button>
  );
}
