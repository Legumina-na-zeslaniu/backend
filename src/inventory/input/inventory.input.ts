import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class InventoryInput {
  @Field()
  @IsMongoId()
  id: string;
}
