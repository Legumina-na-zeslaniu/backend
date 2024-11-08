import { plainToClass, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  validateSync,
} from 'class-validator';

export enum Environment {
  Local = 'local',
  Dev = 'dev',
  Production = 'production',
  Test = 'test',
}

export enum SentryEnvironment {
  Local = 'local',
  Production = 'production',
  Staging = 'staging',
  ClientStaging = 'client-staging',
}

export class EnvironmentVariables {
  @IsString()
  APP_NAME = 'Junction API';

  @IsInt()
  @Transform(({ value }) => +value)
  PORT = 3000;

  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === 1 || value === '1')
  DEBUG = false;

  @IsString()
  @IsNotEmpty()
  DATABASE_URI!: string;

  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === 1 || value === '1')
  ENABLE_PLAYGROUND = true;

  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === 1 || value === '1')
  ENABLE_INTROSPECTION = true;

  @IsString()
  OPEN_AI_API_KEY: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
