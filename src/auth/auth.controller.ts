import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { Tokens } from 'src/auth/types/tokens.type';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AtGuard, RtGuard } from 'src/auth/guards';
import {
  GetCurrentUser,
  GetCurrentUserEmail,
  Public,
} from 'src/auth/decorators';
import { GetCurrentUserId } from 'src/auth/decorators/get-current-user-id.decorator';

@Controller(['api/account'])
export class AuthController {
  logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post(['signin', 'login'])
  @HttpCode(HttpStatus.OK)
  async signin(@Body() authDto: AuthDto): Promise<Tokens> {
    return await this.authService.login(authDto);
  }

  @UseGuards(AtGuard)
  @Post(['signout', 'logout'])
  @HttpCode(HttpStatus.OK)
  async signout(@GetCurrentUserId() id: string) {
    console.log({ id });
    return await this.authService.logout(id);
  }

  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUserId() id: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    console.log({ id, refreshToken });
    if (!id || !refreshToken) return new ForbiddenException('Access denied');
    return await this.authService.refreshTokens(id, refreshToken);
  }

  @UseGuards(RtGuard)
  @Get('refresh')
  async refreshTokensGet(
    @GetCurrentUserId() id: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    console.log({ id, refreshToken });
    if (!id || !refreshToken) return new ForbiddenException('Access denied');
    return await this.authService.refreshTokens(id, refreshToken);
  }
}
