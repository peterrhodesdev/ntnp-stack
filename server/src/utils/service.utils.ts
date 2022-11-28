import {
  ClassConstructor,
  ClassTransformOptions,
  instanceToPlain,
  plainToInstance,
} from "class-transformer";

export function entityToDtoRemovePk<T, V>(
  dtoClass: ClassConstructor<T>,
  entity: V,
  options?: ClassTransformOptions,
): T {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { pk, ...plain } = instanceToPlain(entity);
  return plainToInstance(dtoClass, plain, options);
}
