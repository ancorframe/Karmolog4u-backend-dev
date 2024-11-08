import { Module } from '@nestjs/common';
import { AdminUserModule } from './user/admin-user.module';

@Module({
  imports: [AdminUserModule],
  controllers: [],
  providers: [],
})
export class AdminModule {}
