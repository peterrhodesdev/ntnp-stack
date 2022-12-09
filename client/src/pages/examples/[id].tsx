import { useRouter } from "next/router";
import { useQuery } from "react-query";
import DataUndefinedMessage from "../../common/components/data-undefined-message";
import ErrorMessage from "../../common/components/error-message";
import Loading from "../../common/components/loading";
import ViewExample from "../../examples/components/view-example";
import { getOne, RESOURCE } from "../../examples/examples.service";

export default function ExamplesId() {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [RESOURCE, id],
    queryFn: async () => {
      if (id === undefined || Array.isArray(id)) {
        throw new Error("invalid id");
      }
      return await getOne(id);
    },
  });

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <ErrorMessage error={error} />;
  else if (data === undefined) content = <DataUndefinedMessage />;
  else content = <ViewExample data={data} />;

  return (
    <>
      <h1>Example: {id}</h1>
      {content}
    </>
  );
}
