import { entityToDtoRemovePk } from "./service.utils";

describe("entity to DTO removing primary key", () => {
  test("removes pk property", () => {
    const entity = {
      pk: "pk",
    };
    class dto {}

    const actual = entityToDtoRemovePk(dto, entity);

    expect(actual).not.toHaveProperty("pk");
  });

  test("copies values across", () => {
    const entity = {
      pk: "pk",
      arrayField: [1, 2, 3],
      booleanField: true,
      objectField: { child: "" },
      numberField: 0,
      stringField: "",
    };
    class dto {
      arrayField: number[];
      booleanField: boolean;
      objectField: object;
      numberField: number;
      stringField: string;
    }

    const actual = entityToDtoRemovePk(dto, entity);

    expect(actual).toEqual({
      arrayField: [1, 2, 3],
      booleanField: true,
      objectField: { child: "" },
      numberField: 0,
      stringField: "",
    });
  });
});
