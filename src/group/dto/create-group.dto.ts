import { GroupId } from './group-id';
import { User } from 'src/user/schemas/user.schema';
import { GroupTransDto } from './group-trans.dto';
import { Material } from 'src/material/schemas/material.schema';
export class CreateGroupDto {
  translations: GroupTransDto[];
  members?: User[];
  materials?: Material[];
  startDate?: string;
  endDate?: string;
  active?: boolean;
}

export class CreateGroupResponseDto {
  _id: GroupId;
  translations: GroupTransDto[];
  members: User[];
  materials: Material[];
  startDate: string;
  endDate: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
