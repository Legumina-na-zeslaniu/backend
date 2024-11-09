import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type InventoryDocument = HydratedDocument<Inventory>;

@Schema()
class Properties {
  @Prop({ type: String })
  field: string;

  @Prop({ type: String })
  value: string;
}

interface IProperties {
  field: string;
  value: string;
}

@Schema()
class Localization {
  @Prop({ type: Number })
  x: number;

  @Prop({ type: Number })
  y: number;

  @Prop({ type: Number })
  z: number;
}

@Schema({ timestamps: true })
export class Inventory {
  _id!: Types.ObjectId;

  @Prop({ type: String })
  buildingId: string;

  @Prop({ type: [Properties] })
  properties: IProperties[]; //ai

  @Prop({ type: String })
  comments: string;

  @Prop({ type: Localization })
  localization: Localization;

  @Prop({ type: [String] })
  files: string[];
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
