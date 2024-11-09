import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type IfcDocument = HydratedDocument<Ifc>;

@Schema({ timestamps: true })
export class Ifc {
  _id!: Types.ObjectId;

  @Prop({ type: String })
  file: string;

  @Prop({ type: String })
  name: string;
}

export const IfcSchema = SchemaFactory.createForClass(Ifc);
