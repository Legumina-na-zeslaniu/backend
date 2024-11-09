import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvironmentVariables } from './env.variables';

@Injectable()
export class MinioConfig {
  constructor(private readonly config: ConfigService<EnvironmentVariables>) {}

  getHost(): string {
    return this.config.get<string>('MINIO_HOST');
  }

  getAccessKey(): string {
    return this.config.get<string>('MINIO_ACCESS_KEY');
  }

  getSecretKey(): string {
    return this.config.get<string>('MINIO_SECRET_KEY');
  }

  getMinioPort(): number {
    return this.config.get<number>('MINIO_PORT');
  }

  getBucket(): string {
    return this.config.get<string>('MINIO_BUCKET');
  }
}
