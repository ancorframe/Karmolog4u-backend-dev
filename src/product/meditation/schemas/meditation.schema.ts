import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MeditationDocument = HydratedDocument<Meditation>;

export interface Name {
  ru: string;
  uk: string;
}

export interface Description {
  ru: string;

  uk: string;
}

export enum STATUS {
  PUBLISHED = 'PUBLISHED',
  HIDDEN = 'HIDDEN',
  DRAFT = 'DRAFT',
}

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      // Remove the "_id" property when the object is serialized
      delete ret._id;
      // delete ret.password;
    },
  },
})
export class Meditation {
  @Prop({ type: String, required: [true, 'category is required'] })
  category: string;

  @Prop({ type: Object, default: { ru: '', uk: '' } })
  name: Name;

  @Prop({ type: Object, default: { ru: '', uk: '' } })
  description: Description;

  @Prop({ type: String, default: '' })
  video: string;

  @Prop({ type: String, default: '' })
  cover: string;

  @Prop({ type: String, default: '' })
  price: string;
  @Prop({ type: Boolean, default: false })
  isWaiting: boolean;

  @Prop({ type: Boolean, default: false })
  toDelete: boolean;

  @Prop({
    type: String,
    enum: ['PUBLISHED', 'HIDDEN', 'DRAFT'],
    default: 'DRAFT',
  })
  status: STATUS;

  @Prop({ type: Date, default: null })
  expiredAt: Date;
}

export const MeditationSchema = SchemaFactory.createForClass(Meditation);
