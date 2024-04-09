import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PetDocument = HydratedDocument<Pet>;

@Schema({
  versionKey: false,
})
export class Pet {
  @Prop({ required: true, auto: true, type: mongoose.Schema.Types.ObjectId })
  _id: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  type: string;
  @Prop({ required: true })
  gender: string;
  @Prop({ required: true })
  bio: string;
  @Prop({ required: true })
  photo: string;
  @Prop({ required: true })
  CreatedAt: Date;
  @Prop({ required: true })
  upudatedAt: Date;
}
