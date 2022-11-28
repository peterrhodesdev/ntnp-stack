import { Type } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class CreateExampleDto {
  @IsBoolean()
  booleanField: boolean;

  @IsNumber()
  floatField: number;

  // TODO:
  // - dto.utils.ts intMinMessage(field: string): string
  // - custom decorator: IntBetween
  @IsInt()
  @Min(10, {
    message:
      "integerConstrainedField is too low. Minimum value is $constraint1, but actual is $value",
  })
  @Max(999, {
    message:
      "integerConstrainedField is too high. Maximum value is $constraint1, but actual is $value",
  })
  integerConstrainedField: number;

  @IsNumber()
  numericField: number;

  @IsOptional()
  @IsString()
  textNullableField: string | null;

  @Type(() => Date)
  @IsDate()
  timestamptzField: Date;

  @IsString()
  @MinLength(3, {
    message:
      "varcharConstrainedField is too short. Minimum length is $constraint1 characters, but actual is $value",
  })
  @MaxLength(6, {
    message:
      "varcharConstrainedField is too long. Maximum length is $constraint1 characters, but actual is $value",
  })
  varcharConstrainedField: string;
}
