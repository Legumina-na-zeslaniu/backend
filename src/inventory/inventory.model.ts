import { Field, ObjectType } from '@nestjs/graphql';
import { Properties } from 'src/ai-classifier/model/classifiedObject.model';

@ObjectType()
export class LocalizationModel {
  @Field()
  x: number;

  @Field()
  y: number;

  @Field()
  z: number;
}

@ObjectType()
export class InventoryModel {
  @Field()
  id: string;

  @Field({ nullable: true })
  comments?: string;

  @Field(() => [Properties])
  properties: Properties[];

  @Field(() => [String], { nullable: true })
  files?: string[];

  @Field({ nullable: true })
  buildingId?: string;

  @Field(() => LocalizationModel, { nullable: true })
  localization?: LocalizationModel;
}
