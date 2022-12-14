import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Button from "../../common/components/button";
import GetManyExampleDto from "../dtos/get-many-example.dto";
import { del, getQueryKey } from "../examples.service";
import CreateExample from "./create-example";

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
  const [showCreate, setShowCreate] = useState(false);

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
    <>
      <div className="mb-4 p-4 border rounded-lg">
        <div
          className="flex flex-row justify-between cursor-pointer bg-slate-100 rounded-lg m-0 p-2"
          onClick={() => setShowCreate(!showCreate)}
        >
          <h2 className="inline m-0">Create New Example</h2>
          <h2 className="inline m-0">{showCreate ? "-" : "+"}</h2>
        </div>
        {showCreate && (
          <div className="mt-4">
            <CreateExample />
          </div>
        )}
      </div>
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
    </>
  );
}
