import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Repository } from "typeorm";
import { IdNotFoundException } from "../common/exceptions/id-not-found.exception";
import { removePk } from "../common/utils/service.utils";
import { CreateExampleDto } from "./dtos/create-example.dto";
import {
  GetManyExampleDto,
  KEYS as keysGetManyExampleDto,
} from "./dtos/get-many-example.dto";
import { GetOneExampleDto } from "./dtos/get-one-example.dto";
import { UpdateFullExampleDto } from "./dtos/update-full-example.dto";
import { UpdatePartialExampleDto } from "./dtos/update-partial-example.dto";
import { Example } from "./example.entity";

const ALIAS = "example";

@Injectable()
export class ExamplesService {
  constructor(
    @InjectRepository(Example)
    private readonly examplesRepository: Repository<Example>,
  ) {}

  async create(createDto: CreateExampleDto): Promise<GetOneExampleDto> {
    const savedEntity = await this.examplesRepository.save(createDto);
    const entityWoPk = removePk(savedEntity, Example);
    return plainToInstance(GetOneExampleDto, entityWoPk);
  }

  async delete(id: string): Promise<void> {
    const deleteResult = await this.examplesRepository.delete({ id });
    if (deleteResult.affected !== 1) throw new IdNotFoundException(id);
  }

  async findMany(): Promise<GetManyExampleDto[]> {
    const entities = await this.examplesRepository
      .createQueryBuilder(ALIAS)
      .select(keysGetManyExampleDto.map((key) => `${ALIAS}.${key}`))
      .getMany();
    return entities.map((entity) => plainToInstance(GetManyExampleDto, entity));
  }

  async findOne(id: string): Promise<GetOneExampleDto> {
    const entity = await this.examplesRepository.findOne({ where: { id } });
    if (entity === null) throw new IdNotFoundException(id);
    const entityWoPk = removePk(entity, Example);
    return plainToInstance(GetOneExampleDto, entityWoPk);
  }

  async updateFull(
    id: string,
    updateFullDto: UpdateFullExampleDto,
  ): Promise<void> {
    return this.updatePartial(id, updateFullDto);
  }

  async updatePartial(
    id: string,
    updatePartialDto: UpdatePartialExampleDto,
  ): Promise<void> {
    const updateResult = await this.examplesRepository.update(
      { id },
      updatePartialDto,
    );
    if (updateResult.affected !== 1) throw new IdNotFoundException(id);
  }
}
