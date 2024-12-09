import { Types } from 'mongoose';

export class EditDiscountDto {
  discount: number;

  start: Date;

  expiredAt: Date;

  refId: Types.ObjectId;
}
