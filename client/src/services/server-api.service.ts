import { ClassConstructor } from "class-transformer";
import validator from "validator";
import HttpException from "../exceptions/http.exception";
import * as httpService from "./http.service";

const SERVER_API_URL =
  process.env.NEXT_PUBLIC_SERVER_API_URL ?? "http://localhost:5000";

export default class ServerApiService {
  private resource: string;

  constructor(resource: string) {
    this.resource = resource;
  }

  private checkId(id: string): void {
    if (!validator.isUUID(id)) throw new HttpException("id must be UUID", 400);
  }

  private url(): string {
    return `${SERVER_API_URL}/${this.resource}`;
  }

  async delete(id: string): Promise<void> {
    this.checkId(id);
    return httpService.del(this.url(), id);
  }

  async getMany<T>(
    cls: ClassConstructor<T> | undefined = undefined,
  ): Promise<T[]> {
    return httpService.getMany(this.url(), cls);
  }

  async getOne<T>(
    id: string,
    cls: ClassConstructor<T> | undefined = undefined,
  ): Promise<T> {
    this.checkId(id);
    return httpService.getOne(this.url(), id, cls);
  }

  async patch<T>(id: string, t: T): Promise<void> {
    this.checkId(id);
    return httpService.patch(this.url(), id, t);
  }

  async post<T, U>(
    t: T,
    cls: ClassConstructor<U> | undefined = undefined,
  ): Promise<U> {
    return httpService.post(this.url(), t, cls);
  }

  async put<T>(id: string, t: T): Promise<void> {
    this.checkId(id);
    return httpService.put(this.url(), id, t);
  }
}
