import ServerApiService from "../common/services/server-api.service";
import CreateExampleDto from "./dtos/create-example.dto";
import GetManyExampleDto from "./dtos/get-many-example.dto";
import GetOneExampleDto from "./dtos/get-one-example.dto";
import UpdateFullExampleDto from "./dtos/update-full-example.dto";

const RESOURCE = "examples";
const serverApiService = new ServerApiService(RESOURCE);

export async function create(data: CreateExampleDto) {
  return serverApiService.post(data);
}

export function getQueryKey(id: string | undefined = "") {
  return `${RESOURCE}${id}`;
}

export async function del(id: string): Promise<void> {
  return serverApiService.delete(id);
}

export async function getMany(): Promise<GetManyExampleDto[]> {
  return serverApiService.getMany(GetManyExampleDto);
}

export async function getOne(id: string): Promise<GetOneExampleDto> {
  return serverApiService.getOne(id, GetOneExampleDto);
}

export async function updateFull(id: string, data: UpdateFullExampleDto) {
  return serverApiService.put(id, data);
}
