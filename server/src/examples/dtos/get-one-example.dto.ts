import { OmitType } from "@nestjs/mapped-types";
import { Example } from "../example.entity";

export class GetOneExampleDto extends OmitType(Example, ["pk"]) {}
