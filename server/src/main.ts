import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { intValue, stringArray } from "./utils/env.utils";
import { ValidationPipe } from "@nestjs/common";
import { GlobalInternalErrorInterceptor } from "./interceptors/global-internal-error.interceptor";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get<ConfigService>(ConfigService);
  const port = intValue(configService.get("APP_PORT"), 5000);
  const corsOrigin = stringArray(configService.get("APP_CORS_ORIGIN"));
  const corsMethods = stringArray(configService.get("APP_CORS_METHODS"));

  app.enableCors({
    origin: corsOrigin,
    methods: corsMethods,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: process.env.NODE_ENV !== "development",
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new GlobalInternalErrorInterceptor());
  await app.listen(port);
}
bootstrap();
