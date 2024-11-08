import { UpdateGroupDto, UpdateGroupResponseDto } from './dto/update-group.dto';
import { CreateGroupDto, CreateGroupResponseDto } from './dto/create-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Group } from './schemas/group.schema';
import { Model } from 'mongoose';
import { GroupId } from './dto/group-id';

@Injectable()
export class GroupService {
  constructor(@InjectModel(Group.name) private groupModel: Model<Group>) {}

  async findGroup(groupData: CreateGroupDto): Promise<CreateGroupResponseDto> {
    const group = new this.groupModel(groupData);
    await group.save();
    if (!group) {
      throw new NotFoundException('User not found');
    }
    return group;
  }

  async createGroup(
    groupData: CreateGroupDto,
  ): Promise<CreateGroupResponseDto> {
    const group = new this.groupModel(groupData);
    await group.save();
    if (!group) {
      throw new NotFoundException('User not found');
    }
    return group;
  }
  async updateGroup(
    groupData: UpdateGroupDto,
  ): Promise<UpdateGroupResponseDto> {
    const group = await this.groupModel.findByIdAndUpdate(
      groupData._id,
      {},
      { new: true },
    );
    if (!group) {
      throw new NotFoundException('User not found');
    }
    return group;
  }
  async deleteGroup(id: GroupId) {
    const group = await this.groupModel.findByIdAndDelete(id);
    if (!group) {
      throw new NotFoundException('User not found');
    }
    return 'success';
  }
}
