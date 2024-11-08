import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type TokenDocument = HydratedDocument<Token>;

@Schema({ timestamps: true })
export class Token {
  @Prop({
    type: String,
    required: [true, 'accessToken is required'],
  })
  accessToken: string;

  @Prop({
    type: String,
    required: [true, 'refreshToken is required'],
  })
  refreshToken: string;

  @Prop({
    type: String,
    required: [true, 'deviceId is required'],
  })
  deviceId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  owner: User;

  @Prop({ type: String })
  createdAt: string;

  @Prop({ type: String })
  updatedAt: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
