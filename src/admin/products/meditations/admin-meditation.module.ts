import { Module } from '@nestjs/common';
import { AdminMeditationController } from './admin-meditation.controller';
import { AdminMeditationService } from './admin-meditation.service';
import { MongooseModule } from '@nestjs/mongoose';

//change later?
import {
  Meditation,
  MeditationSchema,
} from 'src/products/meditations/schemas/meditation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Meditation.name, schema: MeditationSchema },
    ]),
  ],
  controllers: [AdminMeditationController],
  providers: [AdminMeditationService],
  exports: [AdminMeditationService],
})
export class AdminMeditationModule {}
