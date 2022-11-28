import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { TypeOrmConfig } from "./config/typeorm.config";
import { ExamplesModule } from "./examples/examples.module";
import { RelationshipsModule } from "./relationships/relationships.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${
        process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""
      }`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: TypeOrmConfig,
    }),
    ExamplesModule,
    RelationshipsModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
