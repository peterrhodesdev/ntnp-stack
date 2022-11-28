import { createMock } from "@golevelup/ts-jest";
import { CallHandler } from "@nestjs/common";
import { of } from "rxjs";
import { GlobalInternalErrorInterceptor } from "./global-internal-error.interceptor";

describe("InternalErrorInterceptor", () => {
  let interceptor: GlobalInternalErrorInterceptor;
  const mockCallHandler = createMock<CallHandler>();

  beforeEach(() => {
    interceptor = new GlobalInternalErrorInterceptor();
  });

  afterEach(() => jest.clearAllMocks());

  test("no error", (done) => {
    const data = { test: "data" };
    const executionContext: any = {};
    mockCallHandler.handle.mockImplementation(() => of(data));

    interceptor.intercept(executionContext, mockCallHandler).subscribe({
      next: (value) => {
        expect(value).toEqual(data);
        done();
      },
    });

    expect.assertions(1);
  });

  /*test("no error", (done) => {
    const data = null;
    const executionContext: any = {};
    mockCallHandler.handle.mockImplementation(() => of(data));

    interceptor.intercept(executionContext, mockCallHandler).subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(NotFoundException);
        done();
      },
    });

    expect.assertions(1);
  });*/

  /*test("data is undefined", (done) => {
    const data = undefined;
    const executionContext: any = {};
    mockCallHandler.handle.mockImplementation(() => of(data));

    interceptor.intercept(executionContext, mockCallHandler).subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(NotFoundException);
        done();
      },
    });

    expect.assertions(1);
  });

  test("valid data", (done) => {
    const data = { test: "data" };
    const executionContext: any = {};
    mockCallHandler.handle.mockImplementation(() => of(data));

    interceptor.intercept(executionContext, mockCallHandler).subscribe({
      next: (value) => {
        expect(value).toEqual(data);
        done();
      },
    });

    expect.assertions(1);
  });*/
});
