import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class IfcInput {
  @Field()
  @IsMongoId()
  id: string;
}
