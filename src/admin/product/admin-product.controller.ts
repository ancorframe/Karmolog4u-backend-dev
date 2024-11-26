import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
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
import { AdminMeditationService } from './meditation/admin-meditation.service';

@ApiBearerAuth()
@ApiTags('product')
@Controller('admin/product')
export class AdminProductController {
  constructor(private meditationService: AdminMeditationService) {}

  @Get('product-count')
  @ApiOperation({ summary: 'Get count of each product' })
  @ApiResponse({
    status: 200,
    description: 'get count of product ',
    type: Number,
  })
  @ApiResponse({ status: 400, description: 'something wrong' })
  async getProductCount(): Promise<number> {
    try {
      const count = await this.meditationService.getMeditationCount();

      return count;
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
