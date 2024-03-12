import { Module } from '@nestjs/common';
import { DockerService } from './docker.service';

@Module({
  imports: [],
  controllers: [],
  providers: [DockerService],
  exports: [DockerService],
})
export class DockerServiceModule {}
