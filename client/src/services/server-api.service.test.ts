import ServerApiService from "./server-api.service";
import * as httpService from "./http.service";
import HttpException from "../exceptions/http.exception";

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
const VALID_UUID = "123e4567-e89b-12d3-a456-426614174000";
const INVALID_UUID = "abc";
const INVALID_UUID_STATUS = 400;
const INVALID_UUID_ERR_MSG = "id must be UUID";
class TestClass {}
const data = { numberField: 1.23 };

afterEach(() => jest.clearAllMocks());

describe("delete", () => {
  test("invalid uuid", async () => {
    try {
      await serverApiService.delete(INVALID_UUID);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect((err as HttpException).status).toEqual(INVALID_UUID_STATUS);
      expect((err as HttpException).message).toEqual(INVALID_UUID_ERR_MSG);
    }
    expect.assertions(3);
  });

  test("valid uuid", async () => {
    await serverApiService.delete(VALID_UUID);

    expect(httpService.del).toHaveBeenCalledTimes(1);
    expect(httpService.del).toHaveBeenCalledWith(URL, VALID_UUID);
  });
});

test("get many", async () => {
  await serverApiService.getMany(TestClass);

  expect(httpService.getMany).toHaveBeenCalledTimes(1);
  expect(httpService.getMany).toHaveBeenCalledWith(URL, TestClass);
});

describe("get one", () => {
  test("invalid uuid", async () => {
    try {
      await serverApiService.getOne(INVALID_UUID, TestClass);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect((err as HttpException).status).toEqual(INVALID_UUID_STATUS);
      expect((err as HttpException).message).toEqual(INVALID_UUID_ERR_MSG);
    }
    expect.assertions(3);
  });

  test("valid uuid", async () => {
    await serverApiService.getOne(VALID_UUID, TestClass);

    expect(httpService.getOne).toHaveBeenCalledTimes(1);
    expect(httpService.getOne).toHaveBeenCalledWith(URL, VALID_UUID, TestClass);
  });
});

describe("patch", () => {
  test("invalid uuid", async () => {
    try {
      await serverApiService.patch(INVALID_UUID, data);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect((err as HttpException).status).toEqual(INVALID_UUID_STATUS);
      expect((err as HttpException).message).toEqual(INVALID_UUID_ERR_MSG);
    }
    expect.assertions(3);
  });

  test("valid uuid", async () => {
    await serverApiService.patch(VALID_UUID, data);

    expect(httpService.patch).toHaveBeenCalledTimes(1);
    expect(httpService.patch).toHaveBeenCalledWith(URL, VALID_UUID, data);
  });
});

test("post", async () => {
  await serverApiService.post(data, TestClass);

  expect(httpService.post).toHaveBeenCalledTimes(1);
  expect(httpService.post).toHaveBeenCalledWith(URL, data, TestClass);
});

describe("put", () => {
  test("invalid uuid", async () => {
    try {
      await serverApiService.put(INVALID_UUID, data);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect((err as HttpException).status).toEqual(INVALID_UUID_STATUS);
      expect((err as HttpException).message).toEqual(INVALID_UUID_ERR_MSG);
    }
    expect.assertions(3);
  });

  test("valid uuid", async () => {
    await serverApiService.put(VALID_UUID, data);

    expect(httpService.put).toHaveBeenCalledTimes(1);
    expect(httpService.put).toHaveBeenCalledWith(URL, VALID_UUID, data);
  });
});
