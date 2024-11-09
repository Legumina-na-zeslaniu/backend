import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { DatabaseConfig } from './database.config';
import { validate } from './env.variables';
import { ServerConfig } from './server.config';
import { OpenAiConfig } from './openai.config';
import { MinioConfig } from './minio.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validate,
    }),
  ],
  providers: [ServerConfig, DatabaseConfig, OpenAiConfig, MinioConfig],
  exports: [ServerConfig, DatabaseConfig, OpenAiConfig, MinioConfig],
})
export class ConfigModule {}
