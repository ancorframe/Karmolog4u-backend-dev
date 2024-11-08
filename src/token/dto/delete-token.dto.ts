import { Types } from 'mongoose';

export class DeleteTokenDto {
  accessToken: string;
  owner: Types.ObjectId;
}
