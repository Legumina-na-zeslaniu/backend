import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ClassifiedProperties {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  location: string;

  @Field({ nullable: true })
  manufacturer: string;

  @Field({ nullable: true })
  itemModel: string;

  @Field({ nullable: true })
  serialNumber: string;

  @Field({ nullable: true })
  equipmentType: string;

  @Field({ nullable: true })
  size: string;

  @Field({ nullable: true })
  age: string;

  @Field({ nullable: true })
  materialType: string;

  @Field({ nullable: true })
  condition: string;
}
