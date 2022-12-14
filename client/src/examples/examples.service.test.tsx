import ServerApiService from "../common/services/server-api.service";
import CreateExampleDto from "./dtos/create-example.dto";
import UpdateFullExampleDto from "./dtos/update-full-example.dto";
import {
  create,
  del,
  getMany,
  getOne,
  getQueryKey,
  updateFull,
} from "./examples.service";

jest.mock("../common/services/server-api.service");

afterEach(() => jest.clearAllMocks());

test("create", async () => {
  const data = new CreateExampleDto();
  (ServerApiService.prototype.post as jest.Mock).mockImplementation(() => {});

  await create(data);

  expect(ServerApiService.prototype.post).toHaveBeenCalledTimes(1);
});

test("delete", async () => {
  const id = "uuid";
  (ServerApiService.prototype.delete as jest.Mock).mockImplementation(() => {});

  await del(id);

  expect(ServerApiService.prototype.delete).toHaveBeenCalledTimes(1);
});

test("get many", async () => {
  const data = [{ id: "" }];
  (ServerApiService.prototype.getMany as jest.Mock).mockImplementation(
    () => data,
  );

  const actual = await getMany();

  expect(ServerApiService.prototype.getMany).toHaveBeenCalledTimes(1);
  expect(actual).toEqual(data);
});

test("get one", async () => {
  const id = "uuid";
  const data = { id: "" };
  (ServerApiService.prototype.getOne as jest.Mock).mockImplementation(
    () => data,
  );

  const actual = await getOne(id);

  expect(ServerApiService.prototype.getOne).toHaveBeenCalledTimes(1);
  expect(actual).toEqual(data);
});

describe("get query key", () => {
  test("id undefined", () => {
    const id: string | undefined = undefined;

    const actual = getQueryKey(id);

    expect(actual).toEqual("examples");
  });

  test("with id", () => {
    const id: string | undefined = "id";

    const actual = getQueryKey(id);

    expect(actual).toEqual("examplesid");
  });
});

test("update full", async () => {
  const id = "uuid";
  const data = new UpdateFullExampleDto();
  (ServerApiService.prototype.put as jest.Mock).mockImplementation(() => {});

  await updateFull(id, data);

  expect(ServerApiService.prototype.put).toHaveBeenCalledTimes(1);
});
