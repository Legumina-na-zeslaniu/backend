import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvironmentVariables } from './env.variables';

@Injectable()
export class OpenAiConfig {
  constructor(private readonly config: ConfigService<EnvironmentVariables>) {}

  getApiKey(): string {
    return this.config.get<string>('OPEN_AI_API_KEY');
  }
}
