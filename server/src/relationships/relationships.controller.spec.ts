import { Test, TestingModule } from "@nestjs/testing";
import { RelationshipOneToMany } from "./relationship-one-to-many.entity";
import { RelationshipsController } from "./relationships.controller";
import { RelationshipsService } from "./relationships.service";

const mockedService = {
  findAll: jest.fn(),
};

describe("RelationshipsController", () => {
  let controller: RelationshipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelationshipsController],
      providers: [
        {
          provide: RelationshipsService,
          useValue: mockedService,
        },
      ],
    }).compile();

    controller = module.get<RelationshipsController>(RelationshipsController);
  });

  afterEach(() => jest.clearAllMocks());

  test("should be defined", () => {
    expect(controller).toBeDefined();
  });

  test("get all", async () => {
    const data: RelationshipOneToMany[] = [];
    const findAllSpy = jest
      .spyOn(mockedService, "findAll")
      .mockImplementation(() => data);

    const actual = await controller.getAll();

    expect(actual).toHaveLength(0);
    expect(actual).toEqual(data);
    expect(findAllSpy).toHaveBeenCalledTimes(1);
  });
});
