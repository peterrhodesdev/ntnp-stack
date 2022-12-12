import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { ColumnNumericTransformer } from "../common/transformers/column-numeric.transformer";

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

  @Column("text", { name: "title" })
  title: string;

  @Column("numeric", {
    name: "amount",
    transformer: new ColumnNumericTransformer(),
  })
  amount: number;

  @Column("timestamp with time zone", { name: "date_on" })
  dateOn: Date;
}
