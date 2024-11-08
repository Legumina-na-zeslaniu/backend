import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class InventoryDeletePropertiesInput {
  @Field()
  @IsMongoId()
  id: string;

  @Field(() => [String])
  properties: string[];
}
