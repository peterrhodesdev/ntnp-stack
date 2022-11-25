import { BadRequestException } from "@nestjs/common";
import { of } from "rxjs";
import { ValidateIdParamInterceptor } from "./validate-id-param.interceptor";

const mockCallHandler = {
  handle: jest.fn(),
};

describe("ValidateIdParamInterceptor", () => {
  let interceptor: ValidateIdParamInterceptor;
  let callHandlerSpy: any;

  beforeEach(() => {
    interceptor = new ValidateIdParamInterceptor();
    callHandlerSpy = jest
      .spyOn(mockCallHandler, "handle")
      .mockImplementation(() => of());
  });

  afterEach(() => jest.clearAllMocks());

  test("no id param", async () => {
    const req = { params: {} };
    const executionContext: any = {
      switchToHttp: () => executionContext,
      getRequest: () => req,
    };

    expect(() => {
      interceptor.intercept(executionContext, mockCallHandler);
    }).toThrow(BadRequestException);

    expect(callHandlerSpy).toHaveBeenCalledTimes(0);
  });

  test("invalid id param", async () => {
    const req = { params: { id: "invalid UUID" } };
    const executionContext: any = {
      switchToHttp: () => executionContext,
      getRequest: () => req,
    };

    expect(() => {
      interceptor.intercept(executionContext, mockCallHandler);
    }).toThrow(BadRequestException);

    expect(callHandlerSpy).toHaveBeenCalledTimes(0);
  });

  test("valid id param", async () => {
    const req = { params: { id: "123e4567-e89b-12d3-a456-426614174000" } };
    const executionContext: any = {
      switchToHttp: () => executionContext,
      getRequest: () => req,
    };

    interceptor.intercept(executionContext, mockCallHandler);

    expect(callHandlerSpy).toHaveBeenCalledTimes(1);
  });
});
