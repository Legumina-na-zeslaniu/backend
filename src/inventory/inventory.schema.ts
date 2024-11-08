import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type InventoryDocument = HydratedDocument<Inventory>;

@Schema({ timestamps: true })
export class Inventory {
  _id!: Types.ObjectId;

  @Prop({ type: String })
  name: string; //ai/user

  @Prop({ type: String })
  location: string; //user, think about type

  @Prop({ type: String })
  manufacturer: string; //ai/user

  @Prop({ type: String })
  itemModel: string; //ai/user

  @Prop({ type: String })
  serialNumber: string; //ai/user

  //some kind of enum?
  @Prop({ type: String })
  equipmentType: string; //user/ai

  @Prop({ type: String })
  size: string; //ai/user

  @Prop({ type: String })
  age: string; //ai/user

  @Prop({ type: String })
  materialType: string; //user

  @Prop({ type: String })
  condition: string; //user

  @Prop({ type: String })
  notes: string; //user
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
