import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsOptional } from 'class-validator';

@InputType()
export class PropertiesInput {
  @Field()
  field: string;

  @Field()
  value: string;
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
  comments?: string;
}
