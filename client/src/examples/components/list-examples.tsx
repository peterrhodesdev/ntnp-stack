import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import Button from "../../common/components/button";
import GetManyExampleDto from "../dtos/get-many-example.dto";
import { del, getQueryKey } from "../examples.service";

type Props = {
  data: GetManyExampleDto[];
};

type MutateVariables = {
  id: string;
};

export default function ListExamples(props: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (mv: MutateVariables) => del(mv.id),
    onError: (error, variables: MutateVariables) =>
      alert(`error deleting ${variables.id}`),
    onSuccess: (result, variables: MutateVariables) => {
      queryClient.invalidateQueries([getQueryKey()]);
      queryClient.invalidateQueries([getQueryKey(variables.id)]);
    },
  });

  const handleRowClick = (example: GetManyExampleDto) => {
    router.push(`/examples/${example.id}`);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>title</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((example) => (
          <tr
            key={example.id}
            onClick={() => handleRowClick(example)}
            className="cursor-pointer hover:bg-blue-100"
          >
            <td>{example.id}</td>
            <td>{example.title}</td>
            <td
              onClick={(event) => event.stopPropagation()}
              className="cursor-auto flex justify-center"
            >
              <Button
                text="Delete"
                onClickHandler={() => mutate({ id: example.id })}
                isDisabled={isLoading}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
