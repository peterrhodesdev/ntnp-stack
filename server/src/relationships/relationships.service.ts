import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { getPropertyName } from "../common/utils/ts.utils";
import { RelationshipOneToMany } from "./relationship-one-to-many.entity";

const ALIAS_RELATIONSHIP_ONE_TO_MANY = "rotm";
const ALIAS_RELATIONSHIP_MANY_TO_ONE = "rmto";
const DUMMY_RELATIONSHIP_ONE_TO_MANY: Partial<RelationshipOneToMany> = {
  relationshipManyToOnes: [],
};
const PROPERTY_RELATIONSHIP_MANY_TO_ONES = getPropertyName(
  DUMMY_RELATIONSHIP_ONE_TO_MANY,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  (x) => x.relationshipManyToOnes!,
);

@Injectable()
export class RelationshipsService {
  constructor(
    @InjectRepository(RelationshipOneToMany)
    private readonly relationshipsRepository: Repository<RelationshipOneToMany>,
  ) {}

  async findAll(): Promise<RelationshipOneToMany[]> {
    return this.relationshipsRepository
      .createQueryBuilder(ALIAS_RELATIONSHIP_ONE_TO_MANY)
      .leftJoinAndSelect(
        `${ALIAS_RELATIONSHIP_ONE_TO_MANY}.${PROPERTY_RELATIONSHIP_MANY_TO_ONES}`,
        ALIAS_RELATIONSHIP_MANY_TO_ONE,
      )
      .getMany();
  }
}
