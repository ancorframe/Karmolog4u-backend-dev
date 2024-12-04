import { ProductTransDto } from '../dto/product-trans.dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Group } from 'src/group/schemas/group.schema';
import { Material } from 'src/material/schemas/material.schema';

export type ProductDocument = HydratedDocument<Product>;

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
export class Product {
  @Prop({
    type: [
      {
        lang: { type: String, required: true, default: 'en', unique: true },
        name: { type: String, required: true, default: '' },
        description: { type: String, required: true, default: '' },
      },
    ],
  })
  translations: ProductTransDto[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material' }],
    default: [],
  })
  materials: Material[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
    default: [],
  })
  group: Group[];

  @Prop({ type: Boolean, default: false })
  posted: boolean;

  @Prop({ type: String })
  createdAt: string;

  @Prop({ type: String })
  updatedAt: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
