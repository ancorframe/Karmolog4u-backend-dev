import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface Discount extends Document {
  discount: number;
  start: Date;
  expiredAt: Date;
  refId: mongoose.Schema.Types.ObjectId;
}
