import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MeditationEntity } from 'src/product/meditation/dto/meditation-entity.dto';

import { Meditation } from 'src/product/meditation/schemas/meditation.schema';
import { NewMeditationDto } from './dto/new-meditation.dto';
import { ResponseSuccessDto } from 'src/product/meditation/dto/response-success.dto';

@Injectable()
export class AdminMeditationService {
  constructor(
    @InjectModel(Meditation.name) private meditationModel: Model<Meditation>,
  ) {}

  async getMeditationCount(): Promise<number> {
    try {
      return await this.meditationModel.countDocuments({
        toDelete: false,
      });
    } catch (error) {
      throw new NotFoundException('Meditation not found');
    }
  }

  async findAllMeditation(): Promise<MeditationEntity[]> {
    try {
      return await this.meditationModel.find({ toDelete: false });
    } catch (error) {
      throw new NotFoundException('Meditation not found');
    }
  }

  async findMeditationById(meditationId: string): Promise<MeditationEntity> {
    try {
      return await this.meditationModel.findById(meditationId);
    } catch (error) {
      throw new NotFoundException('Meditation not found');
    }
  }

  //   async findMeditationByIds(
  //     meditationData: FindMeditationByIdDto[],
  //   ): Promise<MeditationEntity[]> {
  //     const meditation = await this.meditationModel.find({ ...meditationData });
  //     if (!meditation) {
  //       throw new NotFoundException('Meditation not found');
  //     }
  //     return meditation;
  //   }

  async newMeditation(
    meditationData: NewMeditationDto,
  ): Promise<ResponseSuccessDto> {
    try {
      const meditation = new this.meditationModel(meditationData);
      await meditation.save();
      return { message: 'success' };
    } catch (error) {
      throw new BadRequestException('Meditation conflict save');
    }
  }

  async updateMeditation(
    meditationData: MeditationEntity,
    meditationId: string,
  ): Promise<MeditationEntity> {
    try {
      return await this.meditationModel.findOneAndUpdate(
        { _id: meditationId },
        meditationData,
        { new: true },
      );
    } catch (error) {
      throw new NotFoundException('Meditation not found');
    }
  }
}
