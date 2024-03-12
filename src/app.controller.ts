import { Body, Controller, Get, Post,  UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AtGuard, RtGuard } from 'src/auth/guards';
import {
  GetCurrentUser,
  GetCurrentUserEmail,
  Public,
} from 'src/auth/decorators';
import { GetCurrentUserId } from 'src/auth/decorators/get-current-user-id.decorator';

@Controller(['api'])
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Public()
  @Get('status')
  getStatus(): string {
    return 'OK';
  }

  @UseGuards(AtGuard)
  @Get('containers')
  async getContainers(): Promise<any> {
    const res = await this.appService.getContainers();
    return res ? { payload: res } : { payload: undefined };
  }

}
