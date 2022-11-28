import { PartialType } from "@nestjs/mapped-types";
import { CreateExampleDto } from "./create-example.dto";

export class UpdatePartialExampleDto extends PartialType(CreateExampleDto) {}
