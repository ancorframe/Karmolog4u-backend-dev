import {
  BadRequestException,
  NotFoundException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  Patch,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from 'src/common/pipes/JoiValidationPipe';
import { MeditationEntity } from 'src/products/meditations/dto/meditation-entity.dto';
import {
  changeStatusMeditationSchema,
  newMeditationSchema,
  updateMeditationSchema,
} from 'src/admin/products/meditations/schemas/validation.schema';
import { ResponseSuccessDto } from 'src/user/dto/response-success.dto';
import { AdminMeditationService } from './admin-meditation.service';
import { CreateMeditationDto } from './dto/create-meditation.dto';
import { ChangeStatusMeditationDto } from './dto/change-status-meditation.dto';

// @ApiBearerAuth()
@ApiTags('admin-meditations')
@Controller('admin/products/meditations')
export class AdminMeditationController {
  constructor(private adminMeditationService: AdminMeditationService) {}

  @Post('create')
  @ApiResponse({
    status: 201,
    description: 'create-meditation',
    type: ResponseSuccessDto,
  })
  @ApiResponse({ status: 400, description: 'something wrong' })
  @UsePipes(new JoiValidationPipe(newMeditationSchema))
  async createMeditation(
    @Body() meditationData: CreateMeditationDto,
  ): Promise<ResponseSuccessDto> {
    try {
      return await this.adminMeditationService.createMeditation(meditationData);
    } catch (error) {
      throw new BadRequestException('Meditation conflict create');
    }
  }

  @Get('get/:id')
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
      throw new NotFoundException('Meditation not found');
    }
  }

  @Get('get-all')
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
      throw new NotFoundException('Meditations not found');
    }
  }

  @Put('edit/:id')
  @ApiResponse({
    status: 200,
    description: 'update-meditation',
    type: MeditationEntity,
  })
  @ApiResponse({ status: 400, description: 'something wrong' })
  async editMeditation(
    @Param('id') meditationId: string,
    @Body(new JoiValidationPipe(updateMeditationSchema))
    meditationData: MeditationEntity,
  ): Promise<MeditationEntity> {
    try {
      return await this.adminMeditationService.editMeditation(
        meditationData,
        meditationId,
      );
    } catch (error) {
      throw new BadRequestException('Meditation conflict edit');
    }
  }

  @Patch('delete/:id')
  @ApiResponse({
    status: 200,
    description: 'delete-meditation',
    type: MeditationEntity,
  })
  @ApiResponse({ status: 400, description: 'something wrong' })
  async deleteMeditation(
    @Param('id') meditationId: string,
  ): Promise<ResponseSuccessDto> {
    try {
      return await this.adminMeditationService.deleteMeditation(meditationId);
    } catch (error) {
      throw new BadRequestException('Meditation conflict delete');
    }
  }

  @Patch('status/:id')
  @ApiResponse({
    status: 200,
    description: 'change - status -meditation',
    type: ChangeStatusMeditationDto,
  })
  @ApiResponse({ status: 400, description: 'something wrong' })
  async changeStatusMeditation(
    @Param('id') meditationId: string,
    @Body(new JoiValidationPipe(changeStatusMeditationSchema))
    status: ChangeStatusMeditationDto,
  ): Promise<ResponseSuccessDto> {
    try {
      return await this.adminMeditationService.changeStatusMeditation(
        meditationId,
        status,
      );
    } catch (error) {
      throw new BadRequestException('Meditation conflict change status');
    }
  }
}