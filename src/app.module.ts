import { ProductModule } from './product/product.module';
import { MaterialModule } from './material/material.module';
import { GroupModule } from './group/group.module';
import { AdminUserModule } from './admin/user/admin-user.module';
import { AdminModule } from './admin/admin.module';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/helper/env.helper';
import { RouterModule } from '@nestjs/core';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ProductModule,
    MaterialModule,
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    MongooseModule.forRoot(`${process.env.MONGO_URL}`),
    TokenModule,
    UserModule,
    AuthModule,
    AdminModule,
    AdminUserModule,
    GroupModule,
    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule,
        children: [
          {
            path: '/',
            module: AdminUserModule,
          },
          // {
          //   path: 'metrics',
          //   module: MetricsModule,
          // },
        ],
      },
    ]),
  ],
})
export class AppModule {}
