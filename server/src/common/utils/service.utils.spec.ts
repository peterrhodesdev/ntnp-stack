import { removePk } from "./service.utils";

describe("remove primary key", () => {
  test("empty class", () => {
    class TestClass {}
    const obj: TestClass = {};

    const actual = removePk(obj, TestClass);

    expect(actual).toEqual(obj);
  });

  test("no pk property", () => {
    class TestClass {
      arrayField: number[];
      booleanField: boolean;
      objectField: object;
      numberField: number;
      stringField: string;
    }
    const obj: TestClass = {
      arrayField: [1, 2, 3],
      booleanField: true,
      objectField: { child: "" },
      numberField: 0,
      stringField: "",
    };

    const actual = removePk(obj, TestClass);

    expect(actual).toEqual(obj);
    expect(actual).not.toHaveProperty("pk");
  });

  test("only pk property", () => {
    class TestClass {
      pk: string;
    }
    const obj: TestClass = { pk: "pk" };

    const actual = removePk(obj, TestClass);

    expect(actual).toEqual({});
    expect(actual).not.toHaveProperty("pk");
  });

  test("removes only pk property", () => {
    class TestClass {
      pk: string;
      arrayField: number[];
      booleanField: boolean;
      objectField: object;
      numberField: number;
      stringField: string;
    }
    const obj: TestClass = {
      pk: "pk",
      arrayField: [1, 2, 3],
      booleanField: true,
      objectField: { child: "" },
      numberField: 0,
      stringField: "",
    };

    const actual = removePk(obj, TestClass);

    expect(actual).toEqual({
      arrayField: [1, 2, 3],
      booleanField: true,
      objectField: { child: "" },
      numberField: 0,
      stringField: "",
    });
    expect(actual).not.toHaveProperty("pk");
  });
});
