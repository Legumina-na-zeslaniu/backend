import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './config/env.variables';
import { ServerConfig } from './config/server.config';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import { registerEnums } from './utils/registerEnums';

async function bootstrap() {
  const config = new ConfigService<EnvironmentVariables>();
  const serverConfig = new ServerConfig(config);

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(graphqlUploadExpress({ maxFileSize: 100_000_000, maxFiles: 10 }));

  registerEnums();
  await app.listen(serverConfig.getPort());
}
bootstrap();
