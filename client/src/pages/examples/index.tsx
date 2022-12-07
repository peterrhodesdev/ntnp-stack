import { NextRouter, useRouter } from "next/router";
import { useQuery } from "react-query";
import HttpException from "../../exceptions/http.exception";
import ServerApiService from "../../services/server-api.service";
import GetManyExampleDto from "./get-many-example.dto";

const RESOURCE = "examples";
const serverApiService = new ServerApiService(RESOURCE);

function content(
  router: NextRouter,
  isLoading: boolean,
  error: unknown,
  data: GetManyExampleDto[] | undefined,
) {
  if (isLoading) return "Loading...";
  if (error)
    return `An error has ocurred${
      error instanceof HttpException
        ? `: ${(error as HttpException).message}`
        : ""
    }`;
  if (!data || data.length === 0) return "No results";

  const handleRowClick = (example: GetManyExampleDto) => {
    router.push(`/examples/${example.id}`);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>title</th>
        </tr>
      </thead>
      <tbody>
        {data.map((example) => (
          <tr
            key={example.id}
            onClick={() => handleRowClick(example)}
            className="cursor-pointer hover:bg-blue-100"
          >
            <td>{example.id}</td>
            <td>{example.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Examples() {
  const router = useRouter();
  const { isLoading, error, data } = useQuery({
    queryKey: [RESOURCE],
    queryFn: () => serverApiService.getMany(GetManyExampleDto),
  });

  return (
    <>
      <h1>Examples</h1>
      {content(router, isLoading, error, data)}
    </>
  );
}
