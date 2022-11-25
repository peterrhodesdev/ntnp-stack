import { createMock } from "@golevelup/ts-jest";
import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { GetExampleDto } from "./dtos/get-example.dto";
import { Example } from "./example.entity";
import { ExamplesService } from "./examples.service";

describe("ExamplesService", () => {
  let service: ExamplesService;
  const mockRepo = createMock<Repository<Example>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExamplesService,
        {
          provide: getRepositoryToken(Example),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<ExamplesService>(ExamplesService);
  });

  afterEach(() => jest.clearAllMocks());

  test("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("delete", () => {
    test("delete result affected undefined", async () => {
      const id = "id";
      const deleteResult: DeleteResult = { affected: undefined, raw: null };
      mockRepo.delete.mockResolvedValue(deleteResult);

      await expect(service.delete(id)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    test("delete result affected null", async () => {
      const id = "id";
      const deleteResult: DeleteResult = { affected: null, raw: null };
      mockRepo.delete.mockResolvedValue(deleteResult);

      await expect(service.delete(id)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    test("delete result affected equals one", async () => {
      const id = "id";
      const deleteResult: DeleteResult = { affected: 1, raw: null };
      const deleteSpy = jest
        .spyOn(mockRepo, "delete")
        .mockImplementation(() => Promise.resolve(deleteResult));

      await service.delete(id);

      expect(deleteSpy).toHaveBeenCalledTimes(1);
      expect(deleteSpy).toHaveBeenCalledWith({ id });
    });
  });

  describe("find all", () => {
    test("returns empty array", async () => {
      const data: Example[] = [];
      const findSpy = jest
        .spyOn(mockRepo, "find")
        .mockImplementation(() => Promise.resolve(data));

      const actual = await service.findAll();

      expect(actual).toHaveLength(0);
      expect(actual).toEqual([]);
      expect(findSpy).toHaveBeenCalledTimes(1);
    });

    test("returns non-empty array", async () => {
      const data: Example[] = [new Example(), new Example(), new Example()];
      const findSpy = jest
        .spyOn(mockRepo, "find")
        .mockImplementation(() => Promise.resolve(data));

      const actual = await service.findAll();

      expect(actual).toHaveLength(3);
      expect(actual[0]).toBeInstanceOf(GetExampleDto);
      expect(findSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("find one", () => {
    test("not found", async () => {
      const id = "id";
      const data: Example | null = null;
      const findOneSpy = jest
        .spyOn(mockRepo, "findOne")
        .mockImplementation(() => Promise.resolve(data));

      const actual = await service.findOne(id);

      expect(actual).toBeNull();
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({ where: { id } });
    });

    test("found", async () => {
      const id = "id";
      const data: Example | null = new Example();
      const findOneSpy = jest
        .spyOn(mockRepo, "findOne")
        .mockImplementation(() => Promise.resolve(data));

      const actual = await service.findOne(id);

      expect(actual).toBeInstanceOf(GetExampleDto);
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({ where: { id } });
    });
  });
});
