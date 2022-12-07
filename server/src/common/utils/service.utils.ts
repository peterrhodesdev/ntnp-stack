import {
  ClassConstructor,
  instanceToPlain,
  plainToInstance,
} from "class-transformer";

//https://github.com/typeorm/typeorm/issues/4829
export function removePk<T>(t: T, cls: ClassConstructor<T>): T {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { pk, ...plain } = instanceToPlain(t);
  return plainToInstance(cls, plain);
}
