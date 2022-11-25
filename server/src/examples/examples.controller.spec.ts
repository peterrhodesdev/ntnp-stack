import { Test, TestingModule } from "@nestjs/testing";
import { createMock } from "@golevelup/ts-jest";
import { ExamplesController } from "./examples.controller";
import { ExamplesService } from "./examples.service";
import { GetExampleDto } from "./dtos/get-example.dto";

describe("ExamplesController", () => {
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
    const deleteSpy = jest
      .spyOn(mockService, "delete")
      .mockImplementation(() => Promise.resolve());

    await controller.delete({ id });

    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(deleteSpy).toHaveBeenCalledWith(id);
  });

  describe("get all", () => {
    test("service returns empty array", async () => {
      const data: GetExampleDto[] = [];
      const findAllSpy = jest
        .spyOn(mockService, "findAll")
        .mockImplementation(() => Promise.resolve(data));

      const actual = await controller.getAll();

      expect(actual).toHaveLength(0);
      expect(actual).toEqual(data);
      expect(findAllSpy).toHaveBeenCalledTimes(1);
    });

    test("service returns non-empty array", async () => {
      const data: GetExampleDto[] = [
        new GetExampleDto(),
        new GetExampleDto(),
        new GetExampleDto(),
      ];
      const findAllSpy = jest
        .spyOn(mockService, "findAll")
        .mockImplementation(() => Promise.resolve(data));

      const actual = await controller.getAll();

      expect(actual).toHaveLength(3);
      expect(actual).toEqual(data);
      expect(findAllSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("get one", () => {
    test("service returns null", async () => {
      const id = "id";
      const data: GetExampleDto | null = null;
      const findOneSpy = jest
        .spyOn(mockService, "findOne")
        .mockImplementation(() => Promise.resolve(data));

      const actual = await controller.getOne({ id });

      expect(actual).toBeNull();
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith(id);
    });

    test("service returns one", async () => {
      const id = "id";
      const data: GetExampleDto | null = new GetExampleDto();
      const findOneSpy = jest
        .spyOn(mockService, "findOne")
        .mockImplementation(() => Promise.resolve(data));

      const actual = await controller.getOne({ id });

      expect(actual).toEqual(data);
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith(id);
    });
  });
});
