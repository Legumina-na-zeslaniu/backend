import { Field } from '@nestjs/graphql';
import { IsMongoId, IsOptional } from 'class-validator';

export class InventoryUpdateInput {
  @Field()
  @IsMongoId()
  id!: string;

  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  location?: string;

  @Field({ nullable: true })
  @IsOptional()
  manufacturer?: string;

  @Field({ nullable: true })
  @IsOptional()
  itemModel?: string;

  @Field({ nullable: true })
  @IsOptional()
  serialNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  equipmentType?: string;

  @Field({ nullable: true })
  @IsOptional()
  size?: string;

  @Field({ nullable: true })
  @IsOptional()
  age?: string;

  @Field({ nullable: true })
  @IsOptional()
  materialType?: string;

  @Field({ nullable: true })
  @IsOptional()
  condition?: string;

  @Field({ nullable: true })
  @IsOptional()
  notes?: string;
}
