// import { ProductService } from './product.service';
// import { ProductController } from './product.controller';
import { Module } from '@nestjs/common';
import { MeditationModule } from './meditation/meditation.module';

@Module({
  imports: [MeditationModule],
  controllers: [],
  providers: [],
})
export class ProductModule {}
