import { ForbiddenException, HttpException, Injectable, Logger } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from 'src/auth/types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as File from 'fs';

export interface User {
  id: string;
  hash: string;
  hashrt: string;
}

@Injectable()
export class AuthService {
  
  private readonly logger = new Logger(AuthService.name);

  private users: User[] = [];

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.logger.log('AuthService created');
    this.init();
  }

  async init() {
    // Create users.json if it doesn't exist, and create first user
    if (!File.existsSync('users.json')) {
      this.logger.log('Creating admin user');
      const admin = {
        id: 'admin',
        hash: await this.hashData('admin'),
        hashrt: '',
      };
      this.users.push(admin);
      File.writeFileSync('users.json', JSON.stringify(this.users));
    } else {
      // Load users from file
      this.users = JSON.parse(File.readFileSync('users.json').toString());
    }
  }

  private async saveUsers() {
    File.writeFileSync('users.json', JSON.stringify(this.users));
  }

  async login(authDto: AuthDto): Promise<any> {

    this.logger.verbose(`Login attempt for user ${authDto.username}`);
    const user = this.users.find((u) => u.id === authDto.username);
    if (!user) {
      return new ForbiddenException('Access denied');
    }
    const isMatch = await bcrypt.compare(authDto.password, user.hash);
    if (!isMatch) {
      return new ForbiddenException('Access denied');
    }
    const tokens = await this.createTokens(user.id);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(id: string) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      return new ForbiddenException('Access denied');
    }

    return true;
  }

  async refreshTokens(id: string, rt: string) {
    const user = this.users.find((u) => u.id === id);
    if (!user || !user.hashrt) {
      return new ForbiddenException('Access denied');
    }
    const isMatch = await bcrypt.compare(rt, user.hashrt);
    if (!isMatch) {
      return new ForbiddenException('Access denied');
    }
    const tokens = await this.createTokens(user.id);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }

  // Utility functions

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  //---
  async createTokens(id: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { id },
        { secret: this.configService.get('AT_SECRET'), expiresIn: '15m' },
      ),
      this.jwtService.signAsync(
        { id },
        { secret: this.configService.get('RT_SECRET'), expiresIn: '7d' },
      ),
    ]);
    return { serviceToken: accessToken, refreshToken: refreshToken };
  }

  async updateRtHash(id: string, rt: string) {
    const hash = await this.hashData(rt);
    const user = this.users.find((u) => u.id === id);
    if (user) {
      user.hashrt = hash;
      await this.saveUsers();
    }
    return true;
  }
}
