import { useQuery } from "react-query";
import Loading from "../../components/loading";
import ErrorMessage from "../../components/error-message";
import ListExamples from "../../examples/components/list-examples";
import { getMany, RESOURCE } from "../../examples/examples.service";
import DataUndefinedMessage from "../../components/data-undefined-message";

export default function Examples() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [RESOURCE],
    queryFn: () => getMany(),
  });

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <ErrorMessage error={error} />;
  else if (data === undefined) content = <DataUndefinedMessage />;
  else content = <ListExamples data={data} />;

  return (
    <>
      <h1>Examples</h1>
      {content}
    </>
  );
}
