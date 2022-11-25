import { Test, TestingModule } from "@nestjs/testing";
import { Example } from "./example.entity";
import { ExamplesController } from "./examples.controller";
import { ExamplesService } from "./examples.service";

const mockService = {
  delete: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
};

describe("ExamplesController", () => {
  let controller: ExamplesController;

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
      .mockImplementation(() => undefined);

    await controller.delete(id);

    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(deleteSpy).toHaveBeenCalledWith(id);
  });

  describe("get all", () => {
    test("service returns empty array", async () => {
      const data: Example[] = [];
      const findAllSpy = jest
        .spyOn(mockService, "findAll")
        .mockImplementation(() => data);

      const actual = await controller.getAll();

      expect(actual).toHaveLength(0);
      expect(actual).toEqual(data);
      expect(findAllSpy).toHaveBeenCalledTimes(1);
    });

    test("service returns non-empty array", async () => {
      const data: Example[] = [new Example(), new Example(), new Example()];
      const findAllSpy = jest
        .spyOn(mockService, "findAll")
        .mockImplementation(() => data);

      const actual = await controller.getAll();

      expect(actual).toHaveLength(3);
      expect(actual).toEqual(data);
      expect(findAllSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("get one", () => {
    test("service returns null", async () => {
      const id = "id";
      const data: Example | null = null;
      const findOneSpy = jest
        .spyOn(mockService, "findOne")
        .mockImplementation(() => data);

      const actual = await controller.getOne(id);

      expect(actual).toBeNull();
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith(id);
    });

    test("service returns one", async () => {
      const id = "id";
      const data: Example | null = new Example();
      const findOneSpy = jest
        .spyOn(mockService, "findOne")
        .mockImplementation(() => data);

      const actual = await controller.getOne(id);

      expect(actual).toEqual(data);
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith(id);
    });
  });
});
