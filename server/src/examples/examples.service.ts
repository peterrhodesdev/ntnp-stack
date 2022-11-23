import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Example } from "./example.entity";

@Injectable()
export class ExamplesService {
  constructor(
    @InjectRepository(Example)
    private readonly examplesRepository: Repository<Example>,
  ) {}

  async findAll(): Promise<Example[]> {
    return this.examplesRepository.find();
  }
}
