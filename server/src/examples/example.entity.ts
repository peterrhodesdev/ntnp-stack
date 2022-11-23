import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("example_id_key", ["id"], { unique: true })
@Index("example_pkey", ["pk"], { unique: true })
@Entity("example", { schema: "public" })
export class Example {
  @PrimaryGeneratedColumn({ type: "bigint", name: "pk" })
  pk: string;

  @Column("uuid", {
    name: "id",
    unique: true,
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("bigint", { name: "bigint_field" })
  bigintField: string;

  @Column("boolean", { name: "boolean_field" })
  booleanField: boolean;

  @Column("bytea", { name: "bytea_field" })
  byteaField: Buffer;

  @Column("date", { name: "date_field" })
  dateField: string;

  @Column("enum", { name: "enum_field", enum: ["value1", "value2"] })
  enumField: "value1" | "value2";

  @Column("double precision", { name: "float_field", precision: 53 })
  floatField: number;

  @Column("integer", { name: "integer_field" })
  integerField: number;

  @Column("json", { name: "json_field" })
  jsonField: object;

  @Column("jsonb", { name: "jsonb_field" })
  jsonbField: object;

  @Column("numeric", { name: "numeric_field" })
  numericField: string;

  @Column("numeric", { name: "numeric_nullable_field", nullable: true })
  numericNullableField: string | null;

  @Column("real", { name: "real_field", precision: 24 })
  realField: number;

  @Column("text", { name: "text_field" })
  textField: string;

  @Column("timestamp with time zone", { name: "timestamptz_field" })
  timestamptzField: Date;

  @Column("character varying", { name: "varchar_field" })
  varcharField: string;

  @Column("uuid", { name: "uuid_field" })
  uuidField: string;

  @Column("int4", { name: "array_one_dimensional_field", array: true })
  arrayOneDimensionalField: number[];

  @Column("text", { name: "array_two_dimensional_field", array: true })
  arrayTwoDimensionalField: string[][];
}
