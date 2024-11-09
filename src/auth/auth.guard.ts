import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';
import { ObjectId } from 'mongodb';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const secret = this.configService.get<string>('JWT_SECRET');

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      await this.jwtService.verifyAsync(token, {
        secret,
      });

      const tokenDb = await this.tokenService.findToken({
        accessToken: token,
      });

      const user = await this.userService.findUserById({
        _id: new ObjectId(tokenDb.owner.toString()),
      });

      request['user'] = user;
      request['accessToken'] = token;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
