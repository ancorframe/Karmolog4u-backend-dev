import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MeditationEntity } from 'src/products/meditations/dto/meditation-entity.dto';

import { Meditation } from 'src/products/meditations/schemas/meditation.schema';
import { CreateMeditationDto } from './dto/create-meditation.dto';
import { ResponseSuccessDto } from 'src/products/meditations/dto/response-success.dto';
import { ChangeStatusMeditationDto } from './dto/change-status-meditation.dto';

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
    return await this.meditationModel.find({}, 'id category status name');
  }

  async findMeditationById(meditationId: string): Promise<MeditationEntity> {
    return await this.meditationModel.findById(meditationId);
  }

  async createMeditation(
    meditationData: CreateMeditationDto,
  ): Promise<ResponseSuccessDto> {
    const meditation = new this.meditationModel(meditationData);
    await meditation.save();
    return { message: 'success' };
  }

  async editMeditation(
    meditationData: MeditationEntity,
    meditationId: string,
  ): Promise<MeditationEntity> {
    return await this.meditationModel.findOneAndUpdate(
      { _id: meditationId },
      meditationData,
      { new: true },
    );
  }

  async deleteMeditation(meditationId: string): Promise<ResponseSuccessDto> {
    await this.meditationModel.updateOne({ _id: meditationId }, [
      { $set: { toDelete: { $not: ['$toDelete'] } } },
    ]);
    return { message: 'success' };
  }

  async changeStatusMeditation(
    meditationId: string,
    status: ChangeStatusMeditationDto,
  ): Promise<ResponseSuccessDto> {
    await this.meditationModel.findOneAndUpdate(
      { _id: meditationId },
      { $set: { ...status } },
      { new: true },
    );
    return { message: 'success' };
  }
}
