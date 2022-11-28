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

  @Column("boolean", { name: "boolean_field" })
  booleanField: boolean;

  @Column("double precision", { name: "float_field", precision: 53 })
  floatField: number;

  @Column("integer", { name: "integer_constrained_field" })
  integerConstrainedField: number;

  @Column("numeric", { name: "numeric_field" })
  numericField: string;

  @Column("text", { name: "text_nullable_field", nullable: true })
  textNullableField: string | null;

  @Column("timestamp with time zone", { name: "timestamptz_field" })
  timestamptzField: Date;

  @Column("character varying", { name: "varchar_constrained_field", length: 6 })
  varcharConstrainedField: string;
}
