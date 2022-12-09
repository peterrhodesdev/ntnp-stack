import HttpException from "../exceptions/http.exception";

type Props = {
  error: unknown;
};

const messagePrefix = ": ";

export default function ErrorMessage(props: Props) {
  let message: string;

  switch (true) {
    case props.error instanceof HttpException:
      message = `${messagePrefix}${(props.error as HttpException).message}`;
      break;
    default:
      message = "";
  }

  return <p>An error has occurred{message}</p>;
}
