import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Meditation } from './schemas/meditation.schema';
import { Model } from 'mongoose';
import { MeditationEntity } from './dto/meditation-entity.dto';

@Injectable()
export class MeditationService {
  constructor(
    @InjectModel(Meditation.name) private meditationModel: Model<Meditation>,
  ) {}

  async findPrevueMeditation() {
    const meditation = await this.meditationModel.find(
      {
        toDelete: false,
        status: 'PUBLISHED',
      },
      'name category cover price isWaiting id',
    );
    if (meditation.length == 0) {
      throw new NotFoundException('Meditations not found');
    }
    return meditation;
  }

  async findMeditationById(meditationId: string): Promise<MeditationEntity> {
    const meditation = await this.meditationModel.find(
      {
        _id: meditationId,
        status: 'PUBLISHED',
        toDelete: false,
      },
      'name description category cover price isWaiting id video',
    );
    return meditation[0];
  }
}
