import ServerApiService from "../common/services/server-api.service";
import GetManyExampleDto from "./dtos/get-many-example.dto";
import GetOneExampleDto from "./dtos/get-one-example.dto";

export const RESOURCE = "examples";
const serverApiService = new ServerApiService(RESOURCE);

export async function getMany(): Promise<GetManyExampleDto[]> {
  return serverApiService.getMany(GetManyExampleDto);
}

export async function getOne(id: string): Promise<GetOneExampleDto> {
  return serverApiService.getOne(id, GetOneExampleDto);
}
