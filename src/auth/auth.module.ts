import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStratgy, RtStratgy } from 'src/auth/strategies';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, AtStratgy, RtStratgy],
})
export class AuthModule {}
