import { Types } from 'mongoose';

export class FindUserByIdDto {
  _id: Types.ObjectId;
}

export class FindUserByEmailDto {
  email: string;
}
