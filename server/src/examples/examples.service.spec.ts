import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Example } from "./example.entity";
import { ExamplesService } from "./examples.service";

const mockedRepo = {
  find: jest.fn(),
};

describe("ExamplesService", () => {
  let service: ExamplesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExamplesService,
        {
          provide: getRepositoryToken(Example),
          useValue: mockedRepo,
        },
      ],
    }).compile();

    service = module.get<ExamplesService>(ExamplesService);
  });

  afterEach(() => jest.clearAllMocks());

  test("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("find all", () => {
    test("returns empty array", async () => {
      const data: Example[] = [];
      const findSpy = jest
        .spyOn(mockedRepo, "find")
        .mockImplementation(() => data);

      const actual = await service.findAll();

      expect(actual).toHaveLength(0);
      expect(actual).toEqual(data);
      expect(findSpy).toHaveBeenCalledTimes(1);
    });

    test("returns non-empty array", async () => {
      const data: Example[] = [new Example(), new Example(), new Example()];
      const findSpy = jest
        .spyOn(mockedRepo, "find")
        .mockImplementation(() => data);

      const actual = await service.findAll();

      expect(actual).toHaveLength(3);
      expect(actual).toEqual(data);
      expect(findSpy).toHaveBeenCalledTimes(1);
    });
  });
});
