import { UserModule } from 'src/user/user.module';
import { Module } from '@nestjs/common';
import { AdminUserController } from './admin-user.controller';

@Module({
  imports: [UserModule],
  controllers: [AdminUserController],
  providers: [],
})
export class AdminUserModule {}
