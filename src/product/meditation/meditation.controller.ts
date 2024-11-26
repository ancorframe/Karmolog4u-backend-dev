import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  Param,
  Query,
} from '@nestjs/common';
import { MeditationService } from './meditation.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MeditationEntity } from './dto/meditation-entity.dto';

@ApiTags('meditation')
@Controller('product/meditation')
export class MeditationController {
  constructor(private meditationService: MeditationService) {}

  @Get('get-meditation')
  @ApiOperation({ summary: 'Get meditation prevue' })
  @ApiResponse({
    status: 200,
    description: 'get-meditation',
    type: Array,
  })
  @ApiResponse({ status: 400, description: 'something wrong' })
  async getMeditation(@Query('filter') query: string) {
    try {
      if (!query) {
        throw new BadRequestException('Something bad happened', {
          cause: new Error(),
          description: 'do not match filter',
        });
      }
      return await this.meditationService.findPrevueMeditation(query);
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
  @ApiOperation({ summary: 'Get meditation by id' })
  @ApiResponse({
    status: 200,
    description: 'get-meditation',
    type: MeditationEntity,
  })
  @ApiResponse({ status: 400, description: 'something wrong' })
  async getMeditationById(@Param('id') meditationId: string) {
    try {
      const meditation = await this.meditationService.findMeditationById(
        meditationId,
      );
      //TODO CHECK IF USER HAVE THIS MEDITATION
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
