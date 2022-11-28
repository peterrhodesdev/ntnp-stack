import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from "@nestjs/common";
import { NotFoundInterceptor } from "../interceptors/not-found.interceptor";
import { CreateExampleDto } from "./dtos/create-example.dto";
import { GetExampleDto } from "./dtos/get-example.dto";
import { IdParam } from "./dtos/id-param";
import { UpdateFullExampleDto } from "./dtos/update-full-example.dto";
import { UpdatePartialExampleDto } from "./dtos/update-partial-example.dto";
import { ExamplesService } from "./examples.service";

@Controller("examples")
export class ExamplesController {
  constructor(private examplesService: ExamplesService) {}

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() params: IdParam): void {
    this.examplesService.delete(params.id);
  }

  @Get()
  getAll(): Promise<GetExampleDto[]> {
    return this.examplesService.findAll();
  }

  @Get(":id")
  @UseInterceptors(new NotFoundInterceptor("No entity found for given id"))
  getOne(@Param() params: IdParam): Promise<GetExampleDto | null> {
    return this.examplesService.findOne(params.id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  patch(
    @Param() params: IdParam,
    @Body() updatePartialExampleDto: UpdatePartialExampleDto,
  ): void {
    this.examplesService.updatePartial(params.id, updatePartialExampleDto);
  }

  @Post()
  post(@Body() createExampleDto: CreateExampleDto): Promise<GetExampleDto> {
    return this.examplesService.create(createExampleDto);
  }

  @Put(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  put(
    @Param() params: IdParam,
    @Body() updateFullExampleDto: UpdateFullExampleDto,
  ): void {
    this.examplesService.updateFull(params.id, updateFullExampleDto);
  }
}
