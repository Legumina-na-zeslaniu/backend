import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsOptional } from 'class-validator';
import { Upload } from 'src/commons/scalars/upload.scalar';

@InputType()
export class PropertiesInput {
  @Field()
  field: string;

  @Field()
  value: string;
}

@InputType()
export class LocalizationInput {
  @Field()
  x: number;

  @Field()
  y: number;

  @Field()
  z: number;
}

@InputType()
export class InventoryUpsertInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsMongoId()
  id?: string;

  @Field(() => [PropertiesInput], { nullable: true })
  @IsOptional()
  properties: PropertiesInput[];

  @Field({ nullable: true })
  @IsOptional()
  comments?: string;

  @Field(() => LocalizationInput, { nullable: true })
  @IsOptional()
  localization?: LocalizationInput;

  @Field({ nullable: true })
  @IsOptional()
  buildingId?: string;

  @Field(() => [Upload], { nullable: true })
  @IsOptional()
  files?: Upload[];
}
