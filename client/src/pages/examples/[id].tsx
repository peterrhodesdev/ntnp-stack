import { useRouter } from "next/router";
import { useQuery } from "react-query";
import DataUndefinedMessage from "../../common/components/data-undefined-message";
import ErrorMessage from "../../common/components/error-message";
import Loading from "../../common/components/loading";
import ViewExample from "../../examples/components/view-example";
import { getOne, getQueryKey } from "../../examples/examples.service";

const INVALID_ID_MSG = "invalid id";

export default function ExamplesId() {
  const router = useRouter();
  const { id } = router.query;
  const parsedId: string | undefined = !Array.isArray(id) ? id : undefined;
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [getQueryKey(parsedId)],
    queryFn: async () => {
      if (parsedId === undefined) throw new Error(INVALID_ID_MSG);
      return await getOne(parsedId);
    },
  });

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <ErrorMessage error={error} />;
  else if (data === undefined) content = <DataUndefinedMessage />;
  else content = <ViewExample data={data} />;

  return (
    <>
      <h1>Example: {parsedId ?? INVALID_ID_MSG}</h1>
      {content}
    </>
  );
}
