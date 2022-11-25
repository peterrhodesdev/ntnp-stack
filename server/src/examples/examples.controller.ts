import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseInterceptors,
} from "@nestjs/common";
import { NotFoundInterceptor } from "../interceptors/not-found.interceptor";
import { ValidateIdParamInterceptor } from "../interceptors/validate-id-param.interceptor";
import { Example } from "./example.entity";
import { ExamplesService } from "./examples.service";

@Controller("examples")
export class ExamplesController {
  constructor(private examplesService: ExamplesService) {}

  @Delete(":id")
  @UseInterceptors(new ValidateIdParamInterceptor())
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param("id") id: string) {
    await this.examplesService.delete(id);
  }

  @Get()
  async getAll(): Promise<Example[]> {
    return this.examplesService.findAll();
  }

  @Get(":id")
  @UseInterceptors(
    new ValidateIdParamInterceptor(),
    new NotFoundInterceptor("No example found for given id"),
  )
  async getOne(@Param("id") id: string): Promise<Example | null> {
    return await this.examplesService.findOne(id);
  }
}
