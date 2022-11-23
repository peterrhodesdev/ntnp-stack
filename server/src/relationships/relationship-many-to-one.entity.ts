import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RelationshipOneToMany } from "./relationship-one-to-many.entity";

@Index("relationship_many_to_one_id_key", ["id"], { unique: true })
@Index("relationship_many_to_one_pkey", ["pk"], { unique: true })
@Entity("relationship_many_to_one", { schema: "public" })
export class RelationshipManyToOne {
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

  @ManyToOne(
    () => RelationshipOneToMany,
    (relationshipOneToMany) => relationshipOneToMany.relationshipManyToOnes,
  )
  @JoinColumn([
    { name: "relationship_one_to_many_pk", referencedColumnName: "pk" },
  ])
  relationshipOneToManyPk: RelationshipOneToMany;
}
