import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvironmentVariables } from './env.variables';

@Injectable()
export class ServerConfig {
  constructor(private readonly config: ConfigService<EnvironmentVariables>) {}

  getPort(): number {
    return this.config.get<number>('PORT') || 3000;
  }

  getEnablePlayground(): boolean {
    return !!this.config.get<boolean>('ENABLE_PLAYGROUND');
  }

  getEnableIntrospection(): boolean {
    return !!this.config.get<boolean>('ENABLE_INTROSPECTION');
  }
}
