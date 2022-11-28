export function intValue(
  envValue: string | undefined,
  defaultValue: number,
): number {
  return envValue === undefined || !Number.isInteger(parseInt(envValue, 10))
    ? defaultValue
    : parseInt(envValue, 10);
}

export function stringArray(
  envValue: string | undefined,
  separator = ",",
): string[] {
  return envValue ? envValue.split(separator) : [];
}
