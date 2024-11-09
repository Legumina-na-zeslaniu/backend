import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IfcModel {
  @Field()
  file: string;

  @Field()
  id: string;

  @Field()
  name: string;
}
