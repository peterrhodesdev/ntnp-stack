import { OmitType } from "@nestjs/mapped-types";
import { Example } from "../example.entity";

export class GetExampleDto extends OmitType(Example, ["pk"]) {}
