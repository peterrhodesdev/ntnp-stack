import { Controller, Get } from "@nestjs/common";
import { Example } from "./example.entity";
import { ExamplesService } from "./examples.service";

@Controller("examples")
export class ExamplesController {
  constructor(private examplesService: ExamplesService) {}

  @Get()
  async getAll(): Promise<Example[]> {
    return this.examplesService.findAll();
  }
}
