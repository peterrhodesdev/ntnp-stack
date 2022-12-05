import { del, getMany, getOne, patch, post, put } from "./server-api.service";
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

test("delete", async () => {
  const id = "id";

  await del(id);

  expect(httpService.del).toHaveBeenCalledTimes(1);
  expect(httpService.del).toHaveBeenCalledWith(SERVER_API_URL, id);
});

test("get many", async () => {
  class TestClass {}

  await getMany(TestClass);

  expect(httpService.getMany).toHaveBeenCalledTimes(1);
  expect(httpService.getMany).toHaveBeenCalledWith(SERVER_API_URL, TestClass);
});

test("get one", async () => {
  const id = "id";
  class TestClass {}

  await getOne(id, TestClass);

  expect(httpService.getOne).toHaveBeenCalledTimes(1);
  expect(httpService.getOne).toHaveBeenCalledWith(
    SERVER_API_URL,
    id,
    TestClass,
  );
});

test("patch", async () => {
  const id = "id";
  const data = { numberField: 1.23 };

  await patch(id, data);

  expect(httpService.patch).toHaveBeenCalledTimes(1);
  expect(httpService.patch).toHaveBeenCalledWith(SERVER_API_URL, id, data);
});

test("post", async () => {
  const data = { numberField: 1.23 };
  class TestClass {}

  await post(data, TestClass);

  expect(httpService.post).toHaveBeenCalledTimes(1);
  expect(httpService.post).toHaveBeenCalledWith(
    SERVER_API_URL,
    data,
    TestClass,
  );
});

test("put", async () => {
  const id = "id";
  const data = { numberField: 1.23 };

  await put(id, data);

  expect(httpService.put).toHaveBeenCalledTimes(1);
  expect(httpService.put).toHaveBeenCalledWith(SERVER_API_URL, id, data);
});
