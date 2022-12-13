import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Button from "../../common/components/button";
import DatetimeInput from "../../common/components/inputs/datetime-input";
import NumberInput from "../../common/components/inputs/number-input";
import TextInput from "../../common/components/inputs/text-input";
import GetOneExampleDto from "../dtos/get-one-example.dto";
import UpdateFullExampleDto from "../dtos/update-full-example.dto";
import { getQueryKey, updateFull } from "../examples.service";

const LABEL_CLASS = "block text-gray-700 text-sm font-bold mb-2";

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
        <TextInput
          name="title"
          value={updatedData.title}
          onChangeHandler={(event) =>
            setUpdatedData({ ...updatedData, title: event.target.value })
          }
        />
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className={LABEL_CLASS}>
          Amount
        </label>
        <NumberInput
          name="amount"
          value={updatedData.amount}
          onChangeHandler={(event) =>
            setUpdatedData({
              ...updatedData,
              amount: Number(event.target.value),
            })
          }
          required={true}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date_on" className={LABEL_CLASS}>
          Date On
        </label>
        <DatetimeInput
          name="date_on"
          required
          value={updatedData.dateOn}
          onChangeHandler={(event) =>
            setUpdatedData({
              ...updatedData,
              dateOn: new Date(event.target.value),
            })
          }
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
