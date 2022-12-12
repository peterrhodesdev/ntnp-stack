import { Transform } from "class-transformer";

export default class GetOneExampleDto {
  id: string;
  title: string;
  amount: number;
  @Transform(({ value }) => new Date(value))
  dateOn: Date;
}
