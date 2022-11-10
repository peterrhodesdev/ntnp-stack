import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "password",
      database: "ntnp",
      entities: [],
      namingStrategy: new SnakeNamingStrategy(),
    }),
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
