import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RelationshipOneToMany } from "./relationship-one-to-many.entity";
import { RelationshipsController } from "./relationships.controller";
import { RelationshipsService } from "./relationships.service";

@Module({
  imports: [TypeOrmModule.forFeature([RelationshipOneToMany])],
  controllers: [RelationshipsController],
  providers: [RelationshipsService],
})
export class RelationshipsModule {}
