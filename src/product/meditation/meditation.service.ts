import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Meditation } from './schemas/meditation.schema';
import { Model } from 'mongoose';
// import { ResponseSuccessDto } from './dto/response-success.dto';
import { FindMeditationByIdDto } from './dto/find-meditation.dto';
import { MeditationEntity } from './dto/meditation-entity.dto';
// import { NewMeditationDto } from './dto/new-meditation.dto';

@Injectable()
export class MeditationService {
  constructor(
    @InjectModel(Meditation.name) private meditationModel: Model<Meditation>,
  ) {}

  // async findAllMeditation(): Promise<MeditationEntity[]> {
  //   const meditation = this.meditationModel.find({});
  //   if (!meditation) {
  //     throw new NotFoundException('Meditation not found');
  //   }
  //   return meditation;
  // }

  async findPrevueMeditation(query: string) {
    let filter = null;
    switch (query) {
      case 'opened':
        filter = 'category name description video cover isWaiting';
        break;
      case 'closed':
        filter = 'category name description cover price isWaiting';
        break;
      case 'arcanes':
        filter = 'category name description cover price isWaiting';
        break;
      default:
        throw new BadRequestException('Something bad happened', {
          cause: new Error(),
          description: 'do not match filter',
        });
        break;
    }
    const meditation = await this.meditationModel.find(
      { category: query, toDelete: false, status: 'PUBLISHED' },
      filter,
    );
    if (meditation.length == 0) {
      throw new NotFoundException('Meditation not found');
    }
    return meditation;
  }

  async findMeditationById(meditationId: string): Promise<MeditationEntity> {
    const meditation = await this.meditationModel.findById(meditationId, {
      toDelete: false,
      status: 'PUBLISHED',
    });
    if (!meditation) {
      throw new NotFoundException('Meditation not found');
    }
    return meditation;
  }

  // async findMeditationByIds(
  //   meditationData: FindMeditationByIdDto[],
  // ): Promise<MeditationEntity[]> {
  //   const meditation = await this.meditationModel.find({ ...meditationData });
  //   if (!meditation) {
  //     throw new NotFoundException('Meditation not found');
  //   }
  //   return meditation;
  // }

  // async newMeditation(
  //   meditationData: NewMeditationDto,
  // ): Promise<ResponseSuccessDto> {
  //   const meditation = new this.meditationModel(meditationData);
  //   await meditation.save();
  //   if (!meditation) {
  //     throw new BadRequestException('Meditation conflict');
  //   }
  //   return { message: 'success' };
  // }

  // async updateMeditation(
  //   meditationData: MeditationEntity,
  // ): Promise<MeditationEntity> {
  //   const meditation = this.meditationModel.findByIdAndUpdate({
  //     ...meditationData,
  //   });
  //   if (!meditation) {
  //     throw new NotFoundException('Meditation not found');
  //   }
  //   return meditation;
  // }
}
