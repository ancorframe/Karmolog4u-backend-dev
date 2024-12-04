// import { ProductService } from './product.service';
// import { ProductController } from './product.controller';
import { Module } from '@nestjs/common';
import { MeditationModule } from './meditations/meditation.module';

@Module({
  imports: [MeditationModule],
  controllers: [],
  providers: [],
})
export class ProductModule {}
