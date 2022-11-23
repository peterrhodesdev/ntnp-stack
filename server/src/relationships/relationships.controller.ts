import { Controller, Get } from "@nestjs/common";
import { RelationshipOneToMany } from "./relationship-one-to-many.entity";
import { RelationshipsService } from "./relationships.service";

@Controller("relationships")
export class RelationshipsController {
  constructor(private relationshipsService: RelationshipsService) {}

  @Get()
  async getAll(): Promise<RelationshipOneToMany[]> {
    return this.relationshipsService.findAll();
  }
}
