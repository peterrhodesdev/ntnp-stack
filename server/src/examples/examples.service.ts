import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IdNotFoundException } from "../common/exceptions/id-not-found.exception";
import { entityToDtoRemovePk } from "../common/utils/service.utils";
import { CreateExampleDto } from "./dtos/create-example.dto";
import { GetExampleDto } from "./dtos/get-example.dto";
import { UpdateFullExampleDto } from "./dtos/update-full-example.dto";
import { UpdatePartialExampleDto } from "./dtos/update-partial-example.dto";
import { Example } from "./example.entity";

@Injectable()
export class ExamplesService {
  constructor(
    @InjectRepository(Example)
    private readonly examplesRepository: Repository<Example>,
  ) {}

  async create(createDto: CreateExampleDto): Promise<GetExampleDto> {
    const savedEntity = await this.examplesRepository.save(createDto);
    return entityToDtoRemovePk(GetExampleDto, savedEntity);
  }

  async delete(id: string): Promise<void> {
    const deleteResult = await this.examplesRepository.delete({ id });
    if (deleteResult.affected !== 1) throw new IdNotFoundException(id);
  }

  async findAll(): Promise<GetExampleDto[]> {
    const entities = await this.examplesRepository.find();
    return entities.map((entity) => entityToDtoRemovePk(GetExampleDto, entity));
  }

  async findOne(id: string): Promise<GetExampleDto> {
    const entity = await this.examplesRepository.findOne({ where: { id } });
    if (entity === null) throw new IdNotFoundException(id);
    return entityToDtoRemovePk(GetExampleDto, entity);
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
