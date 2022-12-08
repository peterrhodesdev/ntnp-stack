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
} from "@nestjs/common";
import { CreateExampleDto } from "./dtos/create-example.dto";
import { GetManyExampleDto } from "./dtos/get-many-example.dto";
import { GetOneExampleDto } from "./dtos/get-one-example.dto";
import { IdParam } from "../common/params/id.param";
import { UpdateFullExampleDto } from "./dtos/update-full-example.dto";
import { UpdatePartialExampleDto } from "./dtos/update-partial-example.dto";
import { ExamplesService } from "./examples.service";

@Controller("examples")
export class ExamplesController {
  constructor(private examplesService: ExamplesService) {}

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() params: IdParam): Promise<void> {
    return this.examplesService.delete(params.id);
  }

  @Get()
  getMany(): Promise<GetManyExampleDto[]> {
    return this.examplesService.findMany();
  }

  @Get(":id")
  getOne(@Param() params: IdParam): Promise<GetOneExampleDto> {
    return this.examplesService.findOne(params.id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  patch(
    @Param() params: IdParam,
    @Body() updatePartialExampleDto: UpdatePartialExampleDto,
  ): Promise<void> {
    return this.examplesService.updatePartial(
      params.id,
      updatePartialExampleDto,
    );
  }

  @Post()
  post(@Body() createExampleDto: CreateExampleDto): Promise<GetOneExampleDto> {
    return this.examplesService.create(createExampleDto);
  }

  @Put(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  put(
    @Param() params: IdParam,
    @Body() updateFullExampleDto: UpdateFullExampleDto,
  ): Promise<void> {
    return this.examplesService.updateFull(params.id, updateFullExampleDto);
  }
}
