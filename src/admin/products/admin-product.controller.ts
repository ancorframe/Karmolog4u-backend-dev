import { BadRequestException, Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminMeditationService } from './meditations/admin-meditation.service';

@ApiBearerAuth()
@ApiTags('product')
@Controller('admin/products')
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
  async getProductCount(): Promise<any> {
    try {
      const meditations = await this.meditationService.getMeditationCount();

      return { meditations, vebinars: 0, 'guides-and-books': 0, gifts: 0 };
    } catch (error) {
      throw new BadRequestException('Something wrong');
    }
  }
}
