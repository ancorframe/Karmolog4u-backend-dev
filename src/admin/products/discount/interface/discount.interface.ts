import { Document } from 'mongoose';

export interface Discount extends Document {
  discount: number;
  start: Date;
  expiredAt: Date;
  reference: { refId: string; refType: string };
}
