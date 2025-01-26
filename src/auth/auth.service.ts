import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto } from './auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationTime: number;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTime = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async signIn(username: string, password: string): Promise<AuthResponseDto> {
    const foundUser = await this.usersService.findByUsername(username);
    if (!foundUser || !bcryptCompareSync(password, foundUser.password)) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { username: foundUser.username, sub: foundUser.id };
    const token = this.jwtService.sign(payload);

    return {
      token,
      expiredIn: this.jwtExpirationTime,
    } as AuthResponseDto;
  }
}
