import { UserResponseDto } from 'src/user/dto/user-response.dto';

export class LoginResponseDto {
  user: {
    userData: UserResponseDto;
    accessToken: string;
    refreshToken: string;
  };
}
