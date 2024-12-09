import { Module } from '@nestjs/common';
import { AdminMeditationModule } from './meditations/admin-meditation.module';
import { AdminProductController } from './admin-product.controller';
import { DiscountModule } from './discount/discount.module';

@Module({
  imports: [AdminMeditationModule, DiscountModule],
  controllers: [AdminProductController],
  providers: [],
  exports: [],
})
export class AdminProductModule {}
