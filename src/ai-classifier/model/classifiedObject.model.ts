import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ClassifiedObject {
  @Field(() => [Properties])
  properties: Properties[];
}

@ObjectType()
export class Properties {
  @Field()
  field: string;

  @Field()
  value: string;
}
