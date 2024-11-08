import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ClassifiedObject {
  @Field()
  name!: string;

  @Field()
  confidence!: number;
}
