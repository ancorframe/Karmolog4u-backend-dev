import { DiscountService } from './discount.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [DiscountService],
  exports: [DiscountService],
})
export class DiscountModule {}
