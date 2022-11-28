import { ColumnNumericTransformer } from "./column-numeric.transformer";

describe("column numeric transformer", () => {
  let transformer: ColumnNumericTransformer;

  beforeEach(() => {
    transformer = new ColumnNumericTransformer();
  });

  describe("to", () => {
    test("undefined", () => {
      const numeric: number | null | undefined = undefined;
      const actual = transformer.to(numeric);
      expect(actual).toBeNull();
    });

    test("null", () => {
      const numeric: number | null | undefined = null;
      const actual = transformer.to(numeric);
      expect(actual).toBeNull();
    });

    test("number", () => {
      const numeric: number | null | undefined = 1.23;
      const actual = transformer.to(numeric);
      expect(actual).toEqual(1.23);
    });
  });

  describe("from", () => {
    test("undefined", () => {
      const numeric: string | null | undefined = undefined;
      const actual = transformer.from(numeric);
      expect(actual).toBeNull();
    });

    test("null", () => {
      const numeric: string | null | undefined = null;
      const actual = transformer.from(numeric);
      expect(actual).toBeNull();
    });

    test("not a number", () => {
      const numeric: string | null | undefined = "abc";
      const actual = transformer.from(numeric);
      expect(actual).toBeNull();
    });

    test("number", () => {
      const numeric: string | null | undefined = "1.23";
      const actual = transformer.from(numeric);
      expect(actual).toEqual(1.23);
    });
  });
});
