import { ResponseSuccessDto } from './dto/response-success.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserIdDto } from './dto/user-id.dto';
import { NewUserDto } from './dto/new-user.dto';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { FindUserByIdDto, FindUserByEmailDto } from './dto/find-user.dto';
import { UserEntity } from './dto/user-entity.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findUserById(userData: FindUserByIdDto): Promise<UserResponseDto> {
    const user = await this.userModel.findOne({ ...userData });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findUserByEmail(userData: FindUserByEmailDto): Promise<UserEntity> {
    const user = await this.userModel.findOne({ ...userData });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findAllUser(): Promise<UserEntity[]> {
    const users = await this.userModel.find({});
    if (!users) {
      throw new NotFoundException('Users not found');
    }
    return users;
  }

  async newUser(userData: NewUserDto): Promise<ResponseSuccessDto> {
    const user = new this.userModel(userData);
    await user.save();
    if (!user) {
      throw new BadRequestException('User conflict');
    }
    return { message: 'success' };
  }

  async updateUser(
    _id: UserIdDto,
    userData: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userModel.findByIdAndUpdate(
      _id,
      {
        $set: userData,
      },
      { new: true, projection: { _id: 0 } },
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
