import { intValue, stringArray } from "./env.utils";

describe("integer value", () => {
  test("environment variable is an integer", () => {
    const envValue = "123";
    const defaultValue = 456;

    const actual = intValue(envValue, defaultValue);

    expect(actual).toEqual(123);
  });

  test("environment variable is a decimal", () => {
    const envValue = "123.654";
    const defaultValue = 789;

    const actual = intValue(envValue, defaultValue);

    expect(actual).toEqual(123);
  });

  test("environment variable is not a number", () => {
    const envValue = "abc";
    const defaultValue = 123;

    const actual = intValue(envValue, defaultValue);

    expect(actual).toEqual(123);
  });

  test("environment variable is undefined", () => {
    const envValue = undefined;
    const defaultValue = 123;

    const actual = intValue(envValue, defaultValue);

    expect(actual).toEqual(123);
  });
});

describe("string array", () => {
  test("environment variable is undefined", () => {
    const envValue = "";

    const actual = stringArray(envValue);

    expect(actual.length).toEqual(0);
  });

  test("environment variable is empty", () => {
    const envValue = "";

    const actual = stringArray(envValue);

    expect(actual.length).toEqual(0);
  });

  test("environment variable is single value with default separator", () => {
    const envValue = "abc";

    const actual = stringArray(envValue);

    expect(actual.length).toEqual(1);
    expect(actual[0]).toEqual("abc");
  });

  test("environment variable is single value with custom separator", () => {
    const envValue = "a,b,c";
    const separator = "|";

    const actual = stringArray(envValue, separator);

    expect(actual.length).toEqual(1);
    expect(actual[0]).toEqual("a,b,c");
  });

  test("environment variable is multiple values with default separator", () => {
    const envValue = "abc,def,ghi";

    const actual = stringArray(envValue);

    expect(actual.length).toEqual(3);
    expect(actual[0]).toEqual("abc");
    expect(actual[1]).toEqual("def");
    expect(actual[2]).toEqual("ghi");
  });

  test("environment variable is multiple values with custom separator", () => {
    const envValue = "abc|def|ghi";
    const separator = "|";

    const actual = stringArray(envValue, separator);

    expect(actual.length).toEqual(3);
    expect(actual[0]).toEqual("abc");
    expect(actual[1]).toEqual("def");
    expect(actual[2]).toEqual("ghi");
  });
});
