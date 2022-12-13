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
    mutationFn: (variables: MutateVariables) => del(variables.id),
    onError: (error, variables: MutateVariables) =>
      alert(`error deleting ${variables.id}`),
    onSuccess: (result, variables: MutateVariables) => {
      queryClient.invalidateQueries([getQueryKey()]);
      queryClient.invalidateQueries([getQueryKey(variables.id)]);
      alert(`successfully deleted ${variables.id}`);
    },
  });

  const navigate = (id: string, isEdit: boolean) => {
    router.push(`/examples/${id}${isEdit ? "?edit=true" : ""}`);
  };

  const handleRowClick = (id: string) => {
    navigate(id, false);
  };

  const handleEditClick = (id: string) => {
    navigate(id, true);
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
            onClick={() => handleRowClick(example.id)}
            className="cursor-pointer hover:bg-blue-100"
          >
            <td>{example.id}</td>
            <td>{example.title}</td>
            <td
              onClick={(event) => event.stopPropagation()}
              className="cursor-auto"
            >
              <div className="flex flex-row justify-evenly">
                <Button
                  text="Edit"
                  onClickHandler={() => handleEditClick(example.id)}
                  isDisabled={isLoading}
                />
                <Button
                  text="Delete"
                  onClickHandler={() => mutate({ id: example.id })}
                  isDisabled={isLoading}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
