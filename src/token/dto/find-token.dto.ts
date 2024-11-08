import { Types } from 'mongoose';

export class FindTokenDto {
  refreshToken?: string;
  deviceId?: string;
  owner?: Types.ObjectId;
  accessToken?: string;
}
