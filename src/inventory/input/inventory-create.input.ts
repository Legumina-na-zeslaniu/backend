import { Field } from '@nestjs/graphql';

export class InventoryCreateInput {
  @Field()
  name: string;

  @Field()
  location: string;

  @Field()
  manufacturer: string;

  @Field()
  itemModel: string;

  @Field()
  serialNumber: string;

  @Field()
  equipmentType: string;

  @Field()
  size: string;

  @Field()
  age: string;

  @Field()
  materialType: string;

  @Field()
  condition: string;

  @Field()
  notes: string;
}
