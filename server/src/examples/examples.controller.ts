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
import { GetExampleDto } from "./dtos/get-example.dto";
import { IdParam } from "./dtos/id-param";
import { ExamplesService } from "./examples.service";

@Controller("examples")
export class ExamplesController {
  constructor(private examplesService: ExamplesService) {}

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() params: IdParam) {
    this.examplesService.delete(params.id);
  }

  @Get()
  getAll(): Promise<GetExampleDto[]> {
    return this.examplesService.findAll();
  }

  @Get(":id")
  @UseInterceptors(new NotFoundInterceptor("No example found for given id"))
  getOne(@Param() params: IdParam): Promise<GetExampleDto | null> {
    return this.examplesService.findOne(params.id);
  }
}
