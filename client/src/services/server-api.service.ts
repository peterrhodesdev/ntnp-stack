import { ClassConstructor } from "class-transformer";
import * as httpService from "./http.service";

const SERVER_API_URL =
  process.env.NEXT_PUBLIC_SERVER_API_URL ?? "http://localhost:5000";

export async function del(id: string): Promise<void> {
  return httpService.del(SERVER_API_URL, id);
}

export async function getMany<T>(
  cls: ClassConstructor<T> | undefined = undefined,
): Promise<T[]> {
  return httpService.getMany(SERVER_API_URL, cls);
}

export async function getOne<T>(
  id: string,
  cls: ClassConstructor<T> | undefined = undefined,
): Promise<T> {
  return httpService.getOne(SERVER_API_URL, id, cls);
}

export async function patch<T>(id: string, t: T): Promise<void> {
  return httpService.patch(SERVER_API_URL, id, t);
}

export async function post<T, U>(
  t: T,
  cls: ClassConstructor<U> | undefined = undefined,
): Promise<U> {
  return httpService.post(SERVER_API_URL, t, cls);
}

export async function put<T>(id: string, t: T): Promise<void> {
  return httpService.put(SERVER_API_URL, id, t);
}
