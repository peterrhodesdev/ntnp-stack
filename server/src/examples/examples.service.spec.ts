import { createMock } from "@golevelup/ts-jest";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { IdNotFoundException } from "../common/exceptions/id-not-found.exception";
import { CreateExampleDto } from "./dtos/create-example.dto";
import { GetExampleDto } from "./dtos/get-example.dto";
import { UpdateFullExampleDto } from "./dtos/update-full-example.dto";
import { UpdatePartialExampleDto } from "./dtos/update-partial-example.dto";
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

  describe("create", () => {
    test("new entity created", async () => {
      const dto = new CreateExampleDto();
      const data = new Example();
      const spy = jest
        .spyOn(mockRepo, "save")
        .mockImplementation(() => Promise.resolve(data));

      const actual = await service.create(dto);

      expect(actual).toBeInstanceOf(GetExampleDto);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(dto);
    });
  });

  describe("delete", () => {
    test("delete result affected is undefined", async () => {
      const id = "id";
      const deleteResult: DeleteResult = { affected: undefined, raw: null };
      mockRepo.delete.mockResolvedValue(deleteResult);

      await expect(service.delete(id)).rejects.toBeInstanceOf(
        IdNotFoundException,
      );
    });

    test("delete result affected is null", async () => {
      const id = "id";
      const deleteResult: DeleteResult = { affected: null, raw: null };
      mockRepo.delete.mockResolvedValue(deleteResult);

      await expect(service.delete(id)).rejects.toBeInstanceOf(
        IdNotFoundException,
      );
    });

    test("delete result affected is zero", async () => {
      const id = "id";
      const deleteResult: DeleteResult = { affected: 0, raw: null };
      mockRepo.delete.mockResolvedValue(deleteResult);

      await expect(service.delete(id)).rejects.toBeInstanceOf(
        IdNotFoundException,
      );
    });

    test("delete result affected is one", async () => {
      const id = "id";
      const deleteResult: DeleteResult = { affected: 1, raw: null };
      const spy = jest
        .spyOn(mockRepo, "delete")
        .mockImplementation(() => Promise.resolve(deleteResult));

      await service.delete(id);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ id });
    });
  });

  describe("find all", () => {
    test("returns empty array", async () => {
      const data: Example[] = [];
      const spy = jest
        .spyOn(mockRepo, "find")
        .mockImplementation(() => Promise.resolve(data));

      const actual = await service.findAll();

      expect(actual).toHaveLength(0);
      expect(actual).toEqual([]);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("returns non-empty array", async () => {
      const data: Example[] = [new Example(), new Example(), new Example()];
      const spy = jest
        .spyOn(mockRepo, "find")
        .mockImplementation(() => Promise.resolve(data));

      const actual = await service.findAll();

      expect(actual).toHaveLength(3);
      expect(actual[0]).toBeInstanceOf(GetExampleDto);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("find one", () => {
    test("not found", async () => {
      const id = "id";
      const data: Example | null = null;
      const spy = jest
        .spyOn(mockRepo, "findOne")
        .mockImplementation(() => Promise.resolve(data));

      await expect(service.findOne(id)).rejects.toBeInstanceOf(
        IdNotFoundException,
      );

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ where: { id } });
    });

    test("found", async () => {
      const id = "id";
      const data: Example | null = new Example();
      const spy = jest
        .spyOn(mockRepo, "findOne")
        .mockImplementation(() => Promise.resolve(data));

      const actual = await service.findOne(id);

      expect(actual).toBeInstanceOf(GetExampleDto);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe("update full", () => {
    test("update result affected is undefined", async () => {
      const id = "id";
      const dto = new UpdateFullExampleDto();
      const updateResult: UpdateResult = {
        affected: undefined,
        raw: null,
        generatedMaps: [],
      };
      mockRepo.update.mockResolvedValue(updateResult);

      await expect(service.updateFull(id, dto)).rejects.toBeInstanceOf(
        IdNotFoundException,
      );
    });

    test("update result affected is zero", async () => {
      const id = "id";
      const dto = new UpdateFullExampleDto();
      const updateResult: UpdateResult = {
        affected: 0,
        raw: null,
        generatedMaps: [],
      };
      mockRepo.update.mockResolvedValue(updateResult);

      await expect(service.updateFull(id, dto)).rejects.toBeInstanceOf(
        IdNotFoundException,
      );
    });

    test("update result affected is one", async () => {
      const id = "id";
      const dto = new UpdateFullExampleDto();
      const updateResult: UpdateResult = {
        affected: 1,
        raw: null,
        generatedMaps: [],
      };
      const spy = jest
        .spyOn(mockRepo, "update")
        .mockImplementation(() => Promise.resolve(updateResult));

      await service.updateFull(id, dto);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ id }, dto);
    });
  });

  describe("update partial", () => {
    test("update result affected is undefined", async () => {
      const id = "id";
      const dto = new UpdatePartialExampleDto();
      const updateResult: UpdateResult = {
        affected: undefined,
        raw: null,
        generatedMaps: [],
      };
      mockRepo.update.mockResolvedValue(updateResult);

      await expect(service.updatePartial(id, dto)).rejects.toBeInstanceOf(
        IdNotFoundException,
      );
    });

    test("update result affected is zero", async () => {
      const id = "id";
      const dto = new UpdatePartialExampleDto();
      const updateResult: UpdateResult = {
        affected: 0,
        raw: null,
        generatedMaps: [],
      };
      mockRepo.update.mockResolvedValue(updateResult);

      await expect(service.updatePartial(id, dto)).rejects.toBeInstanceOf(
        IdNotFoundException,
      );
    });

    test("update result affected is one", async () => {
      const id = "id";
      const dto = new UpdatePartialExampleDto();
      const updateResult: UpdateResult = {
        affected: 1,
        raw: null,
        generatedMaps: [],
      };
      const spy = jest
        .spyOn(mockRepo, "update")
        .mockImplementation(() => Promise.resolve(updateResult));

      await service.updatePartial(id, dto);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ id }, dto);
    });
  });
});
