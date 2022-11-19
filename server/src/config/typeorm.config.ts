import { Injectable } from "@nestjs/common";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { ConfigService } from "@nestjs/config";
import { intValue } from "../utils/env.utils";

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const user = this.configService.get("DB_USER");
    const password = this.configService.get("DB_PASSWORD");
    const host = this.configService.get("DB_HOST");
    const port = intValue(this.configService.get("DB_PORT"), 5432);
    const name = this.configService.get("DB_NAME");
    const url =
      this.configService.get("DB_URL") ||
      `postgres://${user}:${password}@${host}:${port}/${name}`;

    return {
      type: "postgres",
      url,
      entities: [__dirname + "src/**/*.entity.ts"],
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
