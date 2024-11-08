import { Field, ObjectType } from '@nestjs/graphql';
import { InventoryDocument } from './inventory.schema';

@ObjectType()
export class InventoryModel {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  location!: string;

  @Field()
  manufacturer!: string;

  @Field()
  itemModel!: string;

  @Field()
  serialNumber!: string;

  @Field()
  equipmentType!: string;

  @Field()
  size!: string;

  @Field()
  age!: string;

  @Field()
  materialType!: string;

  @Field()
  condition!: string;

  @Field()
  notes!: string;

  constructor(input: InventoryDocument | InventoryModel) {
    Object.assign(this, {
      ...((input as any)._doc
        ? (input as InventoryDocument).toObject({ virtuals: true })
        : input),
    });
  }
}
