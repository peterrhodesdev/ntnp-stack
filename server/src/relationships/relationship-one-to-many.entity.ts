import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RelationshipManyToOne } from "./relationship-many-to-one.entity";

@Index("relationship_one_to_many_id_key", ["id"], { unique: true })
@Index("relationship_one_to_many_pkey", ["pk"], { unique: true })
@Entity("relationship_one_to_many", { schema: "public" })
export class RelationshipOneToMany {
  @PrimaryGeneratedColumn({ type: "bigint", name: "pk" })
  pk: string;

  @Column("uuid", {
    name: "id",
    unique: true,
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "field", nullable: true })
  field: string | null;

  @OneToMany(
    () => RelationshipManyToOne,
    (relationshipManyToOne) => relationshipManyToOne.relationshipOneToManyPk,
  )
  relationshipManyToOnes: RelationshipManyToOne[];
}
