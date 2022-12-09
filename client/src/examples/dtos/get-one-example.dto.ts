import { Transform } from "class-transformer";

export default class GetOneExampleDto {
  id: string;
  title: string;
  booleanField: boolean;
  floatField: number;
  integerConstrainedField: number;
  numericField: number;
  textNullableField: string | null;
  @Transform(({ value }) => new Date(value))
  timestamptzField: Date;
  varcharConstrainedField: string;
}
