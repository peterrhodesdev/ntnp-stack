import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Button from "../../common/components/button";
import DatetimeInput from "../../common/components/inputs/datetime-input";
import NumberInput from "../../common/components/inputs/number-input";
import TextInput from "../../common/components/inputs/text-input";
import CreateExampleDto from "../dtos/create-example.dto";
import { create, getQueryKey } from "../examples.service";

const LABEL_CLASS = "block text-gray-700 text-sm font-bold mb-2";

type MutateVariables = {
  data: CreateExampleDto;
};

export default function CreateExample() {
  const [newData, setNewData] = useState(new CreateExampleDto());
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (variables: MutateVariables) => create(variables.data),
    onError: () => alert(`error creating`),
    onSuccess: () => {
      queryClient.invalidateQueries([getQueryKey()]);
      alert(`successfully created`);
    },
  });

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
    data: CreateExampleDto,
  ) => {
    event.preventDefault();
    mutate({ data });
  };

  return (
    <form onSubmit={(event) => handleSubmit(event, newData)}>
      <div className="mb-4">
        <label htmlFor="title" className={LABEL_CLASS}>
          Title
        </label>
        <TextInput
          name="title"
          value={newData.title}
          onChangeHandler={(event) =>
            setNewData({ ...newData, title: event.target.value })
          }
        />
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className={LABEL_CLASS}>
          Amount
        </label>
        <NumberInput
          name="amount"
          value={newData.amount}
          onChangeHandler={(event) =>
            setNewData({
              ...newData,
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
          value={newData.dateOn}
          onChangeHandler={(event) =>
            setNewData({
              ...newData,
              dateOn: new Date(event.target.value),
            })
          }
        />
      </div>
      <Button type="submit" text="Create" isDisabled={isLoading} />
    </form>
  );
}
