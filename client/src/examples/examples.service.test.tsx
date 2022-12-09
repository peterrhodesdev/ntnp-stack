import ServerApiService from "../common/services/server-api.service";
import { getMany, getOne } from "./examples.service";

jest.mock("../common/services/server-api.service");

afterEach(() => jest.clearAllMocks());

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
