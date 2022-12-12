import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateExampleDto {
  @IsString()
  title: string;

  @IsNumber()
  amount: number;

  @Type(() => Date)
  @IsDate()
  dateOn: Date;
}
