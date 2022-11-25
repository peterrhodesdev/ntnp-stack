import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { entityToDtoRemovePk } from "../utils/service.utils";
import { GetExampleDto } from "./dtos/get-example.dto";
import { Example } from "./example.entity";

@Injectable()
export class ExamplesService {
  constructor(
    @InjectRepository(Example)
    private readonly examplesRepository: Repository<Example>,
  ) {}

  async delete(id: string) {
    const deleteResult = await this.examplesRepository.delete({ id });
    if (deleteResult.affected !== 1) throw new NotFoundException();
  }

  async findAll(): Promise<GetExampleDto[]> {
    const entities = await this.examplesRepository.find();
    return entities.map((entity) => entityToDtoRemovePk(GetExampleDto, entity));
  }

  async findOne(id: string): Promise<GetExampleDto | null> {
    const entity = await this.examplesRepository.findOne({ where: { id } });
    if (entity === null) return null;
    return entityToDtoRemovePk(GetExampleDto, entity);
  }
}
