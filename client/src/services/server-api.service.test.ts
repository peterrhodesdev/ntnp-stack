import ServerApiService from "./server-api.service";
import * as httpService from "./http.service";

jest.mock("./http.service", () => ({
  del: jest.fn(),
  getMany: jest.fn(),
  getOne: jest.fn(),
  patch: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
}));

const SERVER_API_URL = "server.api.url";
const RESOURCE = "res";
const serverApiService = new ServerApiService(RESOURCE);
const URL = `${SERVER_API_URL}/${RESOURCE}`;

test("delete", async () => {
  const id = "id";

  await serverApiService.delete(id);

  expect(httpService.del).toHaveBeenCalledTimes(1);
  expect(httpService.del).toHaveBeenCalledWith(URL, id);
});

test("get many", async () => {
  class TestClass {}

  await serverApiService.getMany(TestClass);

  expect(httpService.getMany).toHaveBeenCalledTimes(1);
  expect(httpService.getMany).toHaveBeenCalledWith(URL, TestClass);
});

test("get one", async () => {
  const id = "id";
  class TestClass {}

  await serverApiService.getOne(id, TestClass);

  expect(httpService.getOne).toHaveBeenCalledTimes(1);
  expect(httpService.getOne).toHaveBeenCalledWith(URL, id, TestClass);
});

test("patch", async () => {
  const id = "id";
  const data = { numberField: 1.23 };

  await serverApiService.patch(id, data);

  expect(httpService.patch).toHaveBeenCalledTimes(1);
  expect(httpService.patch).toHaveBeenCalledWith(URL, id, data);
});

test("post", async () => {
  const data = { numberField: 1.23 };
  class TestClass {}

  await serverApiService.post(data, TestClass);

  expect(httpService.post).toHaveBeenCalledTimes(1);
  expect(httpService.post).toHaveBeenCalledWith(URL, data, TestClass);
});

test("put", async () => {
  const id = "id";
  const data = { numberField: 1.23 };

  await serverApiService.put(id, data);

  expect(httpService.put).toHaveBeenCalledTimes(1);
  expect(httpService.put).toHaveBeenCalledWith(URL, id, data);
});
