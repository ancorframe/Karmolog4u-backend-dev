import { Module } from '@nestjs/common';
import { AdminMeditationModule } from './meditation/admin-meditation.module';
import { AdminProductController } from './admin-product.controller';

@Module({
  imports: [AdminMeditationModule],
  controllers: [AdminProductController],
  providers: [],
  exports: [],
})
export class AdminProductModule {}
