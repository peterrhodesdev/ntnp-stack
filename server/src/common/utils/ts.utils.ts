// https://stackoverflow.com/a/66836940/4545255
export function getPropertyName<T extends object>(
  obj: T,
  expression: (x: { [Property in keyof T]: () => string }) => () => string,
): string {
  const res: { [Property in keyof T]: () => string } = {} as {
    [Property in keyof T]: () => string;
  };
  Object.keys(obj).map((k) => (res[k as keyof T] = () => k));
  return expression(res)();
}
