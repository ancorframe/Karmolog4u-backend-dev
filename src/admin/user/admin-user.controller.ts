import { FindAllUserDto } from '../../user/dto/find-all-user.dto';
import { UserIdDto } from './../../user/dto/user-id.dto';
import { UpdateUserDto } from './../../user/dto/update-user.dto';
import { UserService } from 'src/user/user.service';
import {
  Controller,
  Get,
  UsePipes,
  HttpException,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JoiValidationPipe } from 'src/common/pipes/JoiValidationPipe';
import { UpdateAdminUserSchema } from './schemas/validation.schemas';

@ApiBearerAuth()
@ApiTags('admin-user')
@Controller('user')
export class AdminUserController {
  constructor(private userService: UserService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all user' })
  @ApiResponse({
    status: 200,
    description: 'Array of users',
    type: [FindAllUserDto],
  })
  @ApiResponse({ status: 404, description: 'Users not found' })
  async allUser(): Promise<FindAllUserDto[]> {
    try {
      return await this.userService.findAllUser();
    } catch (error) {
      throw new HttpException(
        {
          status: error.status,
          message: error.response.message,
        },
        error.status,
        {
          cause: error,
        },
      );
    }
  }

  @Post('update/:id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 201,
    description: 'Update user by Admin',
    type: UpdateUserDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', type: String })
  @UsePipes(new JoiValidationPipe(UpdateAdminUserSchema))
  async update(
    @Param() params: UserIdDto,
    @Body() userData: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    try {
      return await this.userService.updateUser(params._id, userData);
    } catch (error) {
      throw new HttpException(
        {
          status: error.status,
          message: error.response.message,
        },
        error.status,
        {
          cause: error,
        },
      );
    }
  }
}
