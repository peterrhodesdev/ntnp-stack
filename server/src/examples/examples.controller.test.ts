import { Test, TestingModule } from "@nestjs/testing";
import { Example } from "./example.entity";
import { ExamplesController } from "./examples.controller";
import { ExamplesService } from "./examples.service";

const mockedService = {
  findAll: jest.fn(),
};

describe("ExamplesController", () => {
  let controller: ExamplesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamplesController],
      providers: [
        {
          provide: ExamplesService,
          useValue: mockedService,
        },
      ],
    }).compile();

    controller = module.get<ExamplesController>(ExamplesController);
  });

  afterEach(() => jest.clearAllMocks());

  test("should be defined", () => {
    expect(controller).toBeDefined();
  });

  test("get all", async () => {
    const data: Example[] = [];
    const findAllSpy = jest
      .spyOn(mockedService, "findAll")
      .mockImplementation(() => data);

    const actual = await controller.getAll();

    expect(actual).toHaveLength(0);
    expect(actual).toEqual(data);
    expect(findAllSpy).toHaveBeenCalledTimes(1);
  });
});
