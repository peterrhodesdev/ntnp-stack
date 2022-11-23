import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { RelationshipOneToMany } from "./relationship-one-to-many.entity";
import { RelationshipsService } from "./relationships.service";

const mockedRepo = {
  createQueryBuilder: jest.fn(() => ({
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockReturnThis(),
  })),
};

describe("RelationshipsService", () => {
  let service: RelationshipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelationshipsService,
        {
          provide: getRepositoryToken(RelationshipOneToMany),
          useValue: mockedRepo,
        },
      ],
    }).compile();

    service = module.get<RelationshipsService>(RelationshipsService);
  });

  afterEach(() => jest.clearAllMocks());

  test("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("find all", () => {
    test("returns empty array", async () => {
      const data: RelationshipOneToMany[] = [];
      const createQueryBuilder: any = {
        leftJoinAndSelect: () => createQueryBuilder,
        getMany: () => data,
      };
      const createQueryBuilderSpy = jest
        .spyOn(mockedRepo, "createQueryBuilder")
        .mockImplementation(() => createQueryBuilder);

      const actual = await service.findAll();

      expect(actual).toHaveLength(0);
      expect(actual).toEqual(data);
      expect(createQueryBuilderSpy).toHaveBeenCalledTimes(1);
    });

    test("returns non-empty array", async () => {
      const data: RelationshipOneToMany[] = [
        new RelationshipOneToMany(),
        new RelationshipOneToMany(),
        new RelationshipOneToMany(),
      ];
      const createQueryBuilder: any = {
        leftJoinAndSelect: () => createQueryBuilder,
        getMany: () => data,
      };
      const createQueryBuilderSpy = jest
        .spyOn(mockedRepo, "createQueryBuilder")
        .mockImplementation(() => createQueryBuilder);

      const actual = await service.findAll();

      expect(actual).toHaveLength(3);
      expect(actual).toEqual(data);
      expect(createQueryBuilderSpy).toHaveBeenCalledTimes(1);
    });
  });
});
