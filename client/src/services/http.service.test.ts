import HttpException from "../exceptions/http.exception";
import { del, getMany, getOne, patch, post, put } from "./http.service";

global.fetch = jest.fn();

afterEach(() => jest.clearAllMocks());

describe("delete", () => {
  test("fetch throws error", async () => {
    const url = "url";
    const id = "id";
    jest
      .spyOn(global, "fetch")
      .mockImplementation(jest.fn(() => Promise.reject()));

    try {
      await del(url, id);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect((err as HttpException).status).toBeUndefined();
      expect((err as HttpException).message).toMatch(/network error/i);
    }
    expect.assertions(3);
  });

  test("response status not ok", async () => {
    const url = "url";
    const id = "id";
    jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: "status text",
        }),
      ) as jest.Mock,
    );

    try {
      await del(url, id);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect((err as HttpException).status).toEqual(404);
      expect((err as HttpException).message).toEqual("status text");
    }
    expect.assertions(3);
  });

  test("response is ok, fetch called with correct arguments", async () => {
    const url = "url";
    const id = "id";
    const spy = jest
      .spyOn(global, "fetch")
      .mockImplementation(
        jest.fn(() => Promise.resolve({ ok: true })) as jest.Mock,
      );

    await del(url, id);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(`${url}/${id}`, { method: "DELETE" });
  });
});

describe("get many", () => {
  test("fetch throws error", async () => {
    const url = "url";
    jest
      .spyOn(global, "fetch")
      .mockImplementation(jest.fn(() => Promise.reject()));

    try {
      await getMany(url);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect((err as HttpException).status).toBeUndefined();
      expect((err as HttpException).message).toMatch(/network error/i);
    }
    expect.assertions(3);
  });

  test("response status not ok", async () => {
    const url = "url";
    jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: "status text",
        }),
      ) as jest.Mock,
    );

    try {
      await getMany(url);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect((err as HttpException).status).toEqual(404);
      expect((err as HttpException).message).toEqual("status text");
    }
    expect.assertions(3);
  });

  test("json throws error", async () => {
    const url = "url";
    jest
      .spyOn(global, "fetch")
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ ok: true, json: () => Promise.reject() }),
        ) as jest.Mock,
      );

    try {
      await getMany(url);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect((err as HttpException).status).toBeUndefined();
      expect((err as HttpException).message).toMatch(
        /unable to process the response from the server/i,
      );
    }
    expect.assertions(3);
  });

  test("response is ok but not array", async () => {
    const url = "url";
    const json = { numberField: 1.23 };
    jest
      .spyOn(global, "fetch")
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ ok: true, json: () => Promise.resolve(json) }),
        ) as jest.Mock,
      );

    try {
      await getMany(url);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect((err as HttpException).status).toBeUndefined();
      expect((err as HttpException).message).toMatch(
        /unable to process the response from the server/i,
      );
    }
    expect.assertions(3);
  });

  test("response is ok and returns array of plain objects", async () => {
    const url = "url";
    const json = [{ numberField: 1.23 }, { numberField: 4.56 }];
    jest
      .spyOn(global, "fetch")
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ ok: true, json: () => Promise.resolve(json) }),
        ) as jest.Mock,
      );

    const actual = await getMany(url);

    expect(Array.isArray(actual)).toBeTruthy();
    expect(actual).toHaveLength(2);
    expect(actual).toEqual(json);
  });

  test("response is ok and returns array of classes", async () => {
    const url = "url";
    const json = [{ numberField: 1.23 }, { numberField: 4.56 }];
    jest
      .spyOn(global, "fetch")
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ ok: true, json: () => Promise.resolve(json) }),
        ) as jest.Mock,
      );
    class TestClass {
      numberField?: number;
      testMethod(): number {
        return (this.numberField ?? 0) + 1;
      }
    }

    const actual = await getMany(url, TestClass);

    expect(Array.isArray(actual)).toBeTruthy();
    expect(actual).toHaveLength(2);
    expect(actual[0].numberField).toEqual(1.23);
    expect(actual[0].testMethod()).toEqual(2.23);
  });

  test("fetch called with correct arguments", async () => {
    const url = "url";
    const spy = jest
      .spyOn(global, "fetch")
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ ok: true, json: () => Promise.resolve([]) }),
        ) as jest.Mock,
      );

    await getMany(url);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
  });
});

describe("get one", () => {
  test("fetch throws error", async () => {
    const url = "url";
    const id = "id";
    jest
      .spyOn(global, "fetch")
      .mockImplementation(jest.fn(() => Promise.reject()));

    try {
      await getOne(url, id);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect((err as HttpException).status).toBeUndefined();
      expect((err as HttpException).message).toMatch(/network error/i);
    }
    expect.assertions(3);
  });

  test("response status not ok", async () => {
    const url = "url";
    const id = "id";
    jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: "status text",
        }),
      ) as jest.Mock,
    );

    try {
      await getOne(url, id);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect((err as HttpException).status).toEqual(404);
      expect((err as HttpException).message).toEqual("status text");
    }
    expect.assertions(3);
  });

  test("json throws error", async () => {
    const url = "url";
    const id = "id";
    jest
      .spyOn(global, "fetch")
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ ok: true, json: () => Promise.reject() }),
        ) as jest.Mock,
      );

    try {
      await getOne(url, id);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect((err as HttpException).status).toBeUndefined();
      expect((err as HttpException).message).toMatch(
        /unable to process the response from the server/i,
      );
    }
    expect.assertions(3);
  });

  test("response is ok and returns plain object", async () => {
    const url = "url";
    const id = "id";
    const json = {
      booleanField: true,
      numberField: 1.23,
      stringField: "abc",
    };
    jest
      .spyOn(global, "fetch")
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ ok: true, json: () => Promise.resolve(json) }),
        ) as jest.Mock,
      );

    const actual = await getOne(url, id);

    expect(actual).toEqual(json);
  });

  test("response is ok and returns class", async () => {
    const url = "url";
    const id = "id";
    const json = { numberField: 1.23 };
    jest
      .spyOn(global, "fetch")
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ ok: true, json: () => Promise.resolve(json) }),
        ) as jest.Mock,
      );
    class TestClass {
      numberField?: number;
      testMethod(): number {
        return (this.numberField ?? 0) + 1;
      }
    }

    const actual = await getOne(url, id, TestClass);

    expect(actual).toBeInstanceOf(TestClass);
    expect(actual.numberField).toEqual(1.23);
    expect(actual.testMethod()).toEqual(2.23);
  });

  test("fetch called with correct arguments", async () => {
    const url = "url";
    const id = "id";
    const spy = jest
      .spyOn(global, "fetch")
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ ok: true, json: () => Promise.resolve({}) }),
        ) as jest.Mock,
      );

    await getOne(url, id);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(`${url}/${id}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
  });
});

describe("patch", () => {
  test("fetch throws error", async () => {
    const url = "url";
    const id = "id";
    const data = {};
    jest
      .spyOn(global, "fetch")
      .mockImplementation(jest.fn(() => Promise.reject()));

    try {
      await patch(url, id, data);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect((err as HttpException).status).toBeUndefined();
      expect((err as HttpException).message).toMatch(/network error/i);
    }
    expect.assertions(3);
  });

  test("response status not ok", async () => {
    const url = "url";
    const id = "id";
    const data = {};
    jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: "status text",
        }),
      ) as jest.Mock,
    );

    try {
      await patch(url, id, data);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect((err as HttpException).status).toEqual(404);
      expect((err as HttpException).message).toEqual("status text");
    }
    expect.assertions(3);
  });

  test("response is ok, fetch called with correct arguments", async () => {
    const url = "url";
    const id = "id";
    const data = {
      booleanField: true,
      numberField: 1.23,
      stringField: "abc",
    };
    const spy = jest
      .spyOn(global, "fetch")
      .mockImplementation(
        jest.fn(() => Promise.resolve({ ok: true })) as jest.Mock,
      );

    await patch(url, id, data);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: `{"booleanField":true,"numberField":1.23,"stringField":"abc"}`,
    });
  });
});

describe("post", () => {
  test("fetch throws error", async () => {
    const url = "url";
    const data = {};
    jest
      .spyOn(global, "fetch")
      .mockImplementation(jest.fn(() => Promise.reject()));

    try {
      await post(url, data);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect((err as HttpException).status).toBeUndefined();
      expect((err as HttpException).message).toMatch(/network error/i);
    }
    expect.assertions(3);
  });

  test("response status not ok", async () => {
    const url = "url";
    const data = {};
    jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: "status text",
        }),
      ) as jest.Mock,
    );

    try {
      await post(url, data);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect((err as HttpException).status).toEqual(404);
      expect((err as HttpException).message).toEqual("status text");
    }
    expect.assertions(3);
  });

  test("json throws error", async () => {
    const url = "url";
    const data = {};
    jest
      .spyOn(global, "fetch")
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ ok: true, json: () => Promise.reject() }),
        ) as jest.Mock,
      );

    try {
      await post(url, data);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect((err as HttpException).status).toBeUndefined();
      expect((err as HttpException).message).toMatch(
        /unable to process the response from the server/i,
      );
    }
    expect.assertions(3);
  });

  test("response is ok and returns plain object", async () => {
    const url = "url";
    const data = { numberField: 1.23 };
    const json = { id: 456, numberField: 1.23 };
    jest
      .spyOn(global, "fetch")
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ ok: true, json: () => Promise.resolve(json) }),
        ) as jest.Mock,
      );

    const actual = await post(url, data);

    expect(actual).toEqual(json);
  });

  test("response is ok and returns class", async () => {
    const url = "url";
    const data = { numberField: 1.23 };
    const json = { id: 456, numberField: 1.23 };
    jest
      .spyOn(global, "fetch")
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ ok: true, json: () => Promise.resolve(json) }),
        ) as jest.Mock,
      );
    class TestClass {
      id?: number;
      numberField?: number;
      testMethod(): number {
        return (this.numberField ?? 0) + 1;
      }
    }

    const actual = await post(url, data, TestClass);

    expect(actual).toBeInstanceOf(TestClass);
    expect(actual.id).toEqual(456);
    expect(actual.numberField).toEqual(1.23);
    expect(actual.testMethod()).toEqual(2.23);
  });

  test("fetch called with correct arguments", async () => {
    const url = "url";
    const data = {
      booleanField: true,
      numberField: 1.23,
      stringField: "abc",
    };
    const spy = jest
      .spyOn(global, "fetch")
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ ok: true, json: () => Promise.resolve({}) }),
        ) as jest.Mock,
      );

    await post(url, data);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: `{"booleanField":true,"numberField":1.23,"stringField":"abc"}`,
    });
  });

  // TODO
});

describe("put", () => {
  test("fetch throws error", async () => {
    const url = "url";
    const id = "id";
    const data = {};
    jest
      .spyOn(global, "fetch")
      .mockImplementation(jest.fn(() => Promise.reject()));

    try {
      await put(url, id, data);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect((err as HttpException).status).toBeUndefined();
      expect((err as HttpException).message).toMatch(/network error/i);
    }
    expect.assertions(3);
  });

  test("response status not ok", async () => {
    const url = "url";
    const id = "id";
    const data = {};
    jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: "status text",
        }),
      ) as jest.Mock,
    );

    try {
      await put(url, id, data);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect((err as HttpException).status).toEqual(404);
      expect((err as HttpException).message).toEqual("status text");
    }
    expect.assertions(3);
  });

  test("response is ok, fetch called with correct arguments", async () => {
    const url = "url";
    const id = "id";
    const data = {
      booleanField: true,
      numberField: 1.23,
      stringField: "abc",
    };
    const spy = jest
      .spyOn(global, "fetch")
      .mockImplementation(
        jest.fn(() => Promise.resolve({ ok: true })) as jest.Mock,
      );

    await put(url, id, data);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: `{"booleanField":true,"numberField":1.23,"stringField":"abc"}`,
    });
  });
});
