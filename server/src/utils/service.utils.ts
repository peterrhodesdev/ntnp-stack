import {
  ClassConstructor,
  ClassTransformOptions,
  instanceToPlain,
  plainToInstance,
} from "class-transformer";

export function entityToDtoRemovePk<T, V>(
  cls: ClassConstructor<T>,
  entity: V,
  options?: ClassTransformOptions,
): T {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { pk, ...plain } = instanceToPlain(entity);
  return plainToInstance(cls, plain, options);
}
