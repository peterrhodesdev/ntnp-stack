import { Test, TestingModule } from "@nestjs/testing";
import { createMock } from "@golevelup/ts-jest";
import { ExamplesController } from "./examples.controller";
import { ExamplesService } from "./examples.service";
import { GetOneExampleDto } from "./dtos/get-one-example.dto";
import { UpdatePartialExampleDto } from "./dtos/update-partial-example.dto";
import { CreateExampleDto } from "./dtos/create-example.dto";
import { UpdateFullExampleDto } from "./dtos/update-full-example.dto";
import { GetManyExampleDto } from "./dtos/get-many-example.dto";

let controller: ExamplesController;
const mockService = createMock<ExamplesService>();

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [ExamplesController],
    providers: [
      {
        provide: ExamplesService,
        useValue: mockService,
      },
    ],
  }).compile();

  controller = module.get<ExamplesController>(ExamplesController);
});

afterEach(() => jest.clearAllMocks());

test("should be defined", () => {
  expect(controller).toBeDefined();
});

test("delete", async () => {
  const id = "id";
  const spy = jest
    .spyOn(mockService, "delete")
    .mockImplementation(() => Promise.resolve());

  await controller.delete({ id });

  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(id);
});

describe("get many", () => {
  test("service returns empty array", async () => {
    const data: GetManyExampleDto[] = [];
    const spy = jest
      .spyOn(mockService, "findMany")
      .mockImplementation(() => Promise.resolve(data));

    const actual = await controller.getMany();

    expect(actual).toHaveLength(0);
    expect(actual).toEqual(data);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("service returns non-empty array", async () => {
    const data: GetManyExampleDto[] = [
      new GetManyExampleDto(),
      new GetManyExampleDto(),
      new GetManyExampleDto(),
    ];
    const spy = jest
      .spyOn(mockService, "findMany")
      .mockImplementation(() => Promise.resolve(data));

    const actual = await controller.getMany();

    expect(actual).toHaveLength(3);
    expect(actual).toEqual(data);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

test("get one", async () => {
  const id = "id";
  const data = new GetOneExampleDto();
  const spy = jest
    .spyOn(mockService, "findOne")
    .mockImplementation(() => Promise.resolve(data));

  const actual = await controller.getOne({ id });

  expect(actual).toEqual(data);
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(id);
});

test("patch", async () => {
  const id = "id";
  const dto = new UpdatePartialExampleDto();
  const spy = jest
    .spyOn(mockService, "updatePartial")
    .mockImplementation(() => Promise.resolve());

  await controller.patch({ id }, dto);

  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(id, dto);
});

test("post", async () => {
  const dto = new CreateExampleDto();
  const data = new GetOneExampleDto();
  const spy = jest
    .spyOn(mockService, "create")
    .mockImplementation(() => Promise.resolve(data));

  const actual = await controller.post(dto);

  expect(actual).toEqual(data);
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(dto);
});

test("put", async () => {
  const id = "id";
  const dto = new UpdateFullExampleDto();
  const spy = jest
    .spyOn(mockService, "updateFull")
    .mockImplementation(() => Promise.resolve());

  await controller.put({ id }, dto);

  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(id, dto);
});
