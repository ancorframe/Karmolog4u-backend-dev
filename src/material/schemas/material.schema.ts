import { MaterialTransDto } from '../dto/material-trans.dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MaterialDocument = HydratedDocument<Material>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      // Remove the "_id" property when the object is serialized
      delete ret._id;
    },
  },
})
export class Material {
  @Prop({
    type: [
      {
        lang: { type: String, required: true, default: 'en', unique: true },
        title: { type: String, required: true, default: '' },
        content: { type: String, required: true, default: '' },
      },
    ],
  })
  translations: MaterialTransDto[];

  @Prop({ type: String })
  createdAt: string;

  @Prop({ type: String })
  updatedAt: string;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
