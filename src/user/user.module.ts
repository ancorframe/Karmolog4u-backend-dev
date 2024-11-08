import { TokenModule } from './../token/token.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import * as bcrypt from 'bcryptjs';
import { Module } from '@nestjs/common';
import { User, UserSchema } from './schemas/user.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // MongooseModule.forFeature([{ , schema: UserSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', async function () {
            if (this.isNew || this.isModified('password')) {
              this.password = await bcrypt.hash(this.password, 10);
            }
          });
          return schema;
        },
      },
    ]),
    ConfigModule,
    TokenModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
