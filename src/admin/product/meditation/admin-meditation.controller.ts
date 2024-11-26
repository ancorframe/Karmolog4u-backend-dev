import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JoiValidationPipe } from 'src/common/pipes/JoiValidationPipe';
import { MeditationEntity } from 'src/product/meditation/dto/meditation-entity.dto';

import {
  newMeditationSchema,
  updateMeditationSchema,
} from 'src/admin/product/meditation/schemas/validation.schema';
import { ResponseSuccessDto } from 'src/user/dto/response-success.dto';
import { AdminMeditationService } from './admin-meditation.service';
import { NewMeditationDto } from './dto/new-meditation.dto';

@ApiBearerAuth()
@ApiTags('meditation')
@Controller('admin/product/meditation')
export class AdminMeditationController {
  constructor(private adminMeditationService: AdminMeditationService) {}

  @Post('new-meditation')
  @ApiResponse({
    status: 201,
    description: 'new-meditation',
    type: ResponseSuccessDto,
  })
  @ApiResponse({ status: 400, description: 'something wrong' })
  @UsePipes(new JoiValidationPipe(newMeditationSchema))
  async newMeditation(
    @Body() meditationData: NewMeditationDto,
  ): Promise<ResponseSuccessDto> {
    try {
      return await this.adminMeditationService.newMeditation(meditationData);
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

  @Get('get-meditation-by-id/:id')
  @ApiResponse({
    status: 200,
    description: 'get-meditation-by-id',
    type: MeditationEntity,
  })
  @ApiResponse({ status: 400, description: 'something wrong' })
  async getMeditationById(
    @Param('id') meditationId: string,
  ): Promise<MeditationEntity> {
    try {
      return await this.adminMeditationService.findMeditationById(meditationId);
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

  @Get('get-all-meditation')
  @ApiResponse({
    status: 200,
    description: 'get-all-meditation',
    type: [MeditationEntity],
  })
  @ApiResponse({ status: 400, description: 'something wrong' })
  async getAllMeditation(): Promise<MeditationEntity[]> {
    try {
      return await this.adminMeditationService.findAllMeditation();
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

  @Post('update-meditation/:id')
  @ApiResponse({
    status: 200,
    description: 'update-meditation',
    type: MeditationEntity,
  })
  @ApiResponse({ status: 400, description: 'something wrong' })
  // @UsePipes(new JoiValidationPipe(updateMeditationSchema))
  async updateMeditation(
    @Body() meditationData: MeditationEntity,
    @Param('id') meditationId: string,
  ): Promise<MeditationEntity> {
    try {
      return await this.adminMeditationService.updateMeditation(
        meditationData,
        meditationId,
      );
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
