import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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

  async findAll(): Promise<Example[]> {
    return this.examplesRepository.find();
  }

  async findOne(id: string): Promise<Example | null> {
    return this.examplesRepository.findOne({ where: { id } });
  }
}
