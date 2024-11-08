import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GroupTransDto } from './../dto/group-trans.dto';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Material } from 'src/material/schemas/material.schema';
import { User } from 'src/user/schemas/user.schema';

export type GroupDocument = HydratedDocument<Group>;

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
export class Group {
  @Prop({
    type: [
      {
        lang: { type: String, required: true, default: 'en', unique: true },
        name: { type: String, required: true, default: '' },
      },
    ],
  })
  translations: GroupTransDto[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  })
  members: User[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material' }],
    default: [],
  })
  materials: Material[];

  @Prop({ type: String, default: '' })
  startDate: string;

  @Prop({ type: String, default: '' })
  endDate: string;

  @Prop({ type: Boolean, default: true })
  active: boolean;

  @Prop({ type: String })
  createdAt: string;

  @Prop({ type: String })
  updatedAt: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
