import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Example } from "./example.entity";
import { ExamplesController } from "./examples.controller";
import { ExamplesService } from "./examples.service";

@Module({
  imports: [TypeOrmModule.forFeature([Example])],
  controllers: [ExamplesController],
  providers: [ExamplesService],
})
export class ExamplesModule {}
