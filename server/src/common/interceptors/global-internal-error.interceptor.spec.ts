import { createMock } from "@golevelup/ts-jest";
import {
  CallHandler,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { of, throwError } from "rxjs";
import { CustomException } from "../exceptions/custom.exception";
import { IdNotFoundException } from "../exceptions/id-not-found.exception";
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

  test("http exception", (done) => {
    const error = new HttpException("response", 404);
    const executionContext: any = {};
    mockCallHandler.handle.mockImplementation(() => throwError(() => error));

    interceptor.intercept(executionContext, mockCallHandler).subscribe({
      error: (err) => {
        expect(err).toEqual(error);
        done();
      },
    });

    expect.assertions(1);
  });

  describe("custom exception", () => {
    test("id not found", (done) => {
      const error = new IdNotFoundException("id");
      const executionContext: any = {};
      mockCallHandler.handle.mockImplementation(() => throwError(() => error));

      interceptor.intercept(executionContext, mockCallHandler).subscribe({
        error: (err) => {
          expect(err).toBeInstanceOf(NotFoundException);
          done();
        },
      });

      expect.assertions(1);
    });

    test("default", (done) => {
      const error = new CustomException();
      const executionContext: any = {};
      mockCallHandler.handle.mockImplementation(() => throwError(() => error));

      interceptor.intercept(executionContext, mockCallHandler).subscribe({
        error: (err) => {
          expect(err).toBeInstanceOf(InternalServerErrorException);
          done();
        },
      });

      expect.assertions(1);
    });
  });

  test("default", (done) => {
    class TestDefaultError extends Error {}
    const error = new TestDefaultError();
    const executionContext: any = {};
    mockCallHandler.handle.mockImplementation(() => throwError(() => error));

    interceptor.intercept(executionContext, mockCallHandler).subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(InternalServerErrorException);
        done();
      },
    });

    expect.assertions(1);
  });
});
