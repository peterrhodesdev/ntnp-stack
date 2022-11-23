import { getPropertyName } from "./ts.utils";

describe("get property name", () => {
  test("object property", () => {
    const obj = { property1: "", property2: "" };

    const actual = getPropertyName(obj, (x) => x.property1);

    expect(actual).toEqual("property1");
  });

  test("class property", () => {
    class tmp {
      property1: string;
      property2: string;
    }

    const obj: tmp = { property1: "", property2: "" };

    const actual = getPropertyName(obj, (x) => x.property1);

    expect(actual).toEqual("property1");
  });

  test("method", () => {
    const obj = { method1: () => "", method2: () => "" };

    const actual = getPropertyName(obj, (x) => x.method1);

    expect(actual).toEqual("method1");
  });

  test("child property", () => {
    const obj = { child: { property: "" } };

    const actual = getPropertyName(obj.child, (x) => x.property);

    expect(actual).toEqual("property");
  });
});
