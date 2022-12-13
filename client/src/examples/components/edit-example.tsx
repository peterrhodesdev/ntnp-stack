import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Button from "../../common/components/button";
import GetOneExampleDto from "../dtos/get-one-example.dto";
import UpdateFullExampleDto from "../dtos/update-full-example.dto";
import { getQueryKey, updateFull } from "../examples.service";

const LABEL_CLASS = "block text-gray-700 text-sm font-bold mb-2";
const INPUT_TEXT_CLASS =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

type Props = {
  data: GetOneExampleDto;
};

type MutateVariables = {
  id: string;
  data: UpdateFullExampleDto;
};

export default function EditExample(props: Props) {
  const [updatedData, setUpdatedData] = useState(
    UpdateFullExampleDto.from(props.data),
  );
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (variables: MutateVariables) =>
      updateFull(variables.id, variables.data),
    onError: (error, variables: MutateVariables) =>
      alert(`error updating ${variables.id}`),
    onSuccess: (result, variables: MutateVariables) => {
      queryClient.invalidateQueries([getQueryKey()]);
      queryClient.invalidateQueries([getQueryKey(variables.id)]);
      alert(`successfully updated ${variables.id}`);
    },
  });

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
    id: string,
    data: UpdateFullExampleDto,
  ) => {
    event.preventDefault();
    mutate({ id, data });
  };

  return (
    <form onSubmit={(event) => handleSubmit(event, props.data.id, updatedData)}>
      <div className="mb-4">
        <label htmlFor="title" className={LABEL_CLASS}>
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={updatedData.title}
          onChange={(event) =>
            setUpdatedData({ ...updatedData, title: event.target.value })
          }
          className={INPUT_TEXT_CLASS}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className={LABEL_CLASS}>
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          required
          pattern="^(0|[1-9]\d*)(\.\d+)?$"
          value={updatedData.amount}
          onChange={(event) =>
            setUpdatedData({
              ...updatedData,
              amount: Number(event.target.value),
            })
          }
          className={INPUT_TEXT_CLASS}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date_on" className={LABEL_CLASS}>
          Date On
        </label>
        <input
          type="datetime-local"
          id="date_on"
          name="date_on"
          required
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}"
          value={updatedData.dateOn.toISOString().slice(0, -1)}
          onChange={(event) =>
            setUpdatedData({
              ...updatedData,
              dateOn: new Date(event.target.value),
            })
          }
          className={INPUT_TEXT_CLASS}
        />
      </div>
      <Button
        type="submit"
        text="Edit"
        isDisabled={
          isLoading ||
          Object.keys(updatedData).every(
            (key) =>
              updatedData[key as keyof UpdateFullExampleDto] ===
              props.data[key as keyof UpdateFullExampleDto],
          )
        }
      />
    </form>
  );
}
