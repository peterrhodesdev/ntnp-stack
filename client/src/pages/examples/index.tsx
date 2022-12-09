import { useQuery } from "react-query";
import Loading from "../../common/components/loading";
import ErrorMessage from "../../common/components/error-message";
import ListExamples from "../../examples/components/list-examples";
import { getMany, getQueryKey } from "../../examples/examples.service";
import DataUndefinedMessage from "../../common/components/data-undefined-message";

export default function Examples() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [getQueryKey()],
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
