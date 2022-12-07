import { PickType } from "@nestjs/mapped-types";
import { Example } from "../example.entity";

export const KEYS: (keyof Example)[] = ["id", "title"];
export class GetManyExampleDto extends PickType(Example, KEYS) {}
