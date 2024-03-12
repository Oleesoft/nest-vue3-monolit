import { Injectable } from '@nestjs/common';
import { DockerService } from './docker-service/docker.service';

@Injectable()
export class AppService {

  constructor(private readonly dockerService: DockerService) {
    
  }

  public async getContainers() {
    return await this.dockerService.listContainers();
  }


}
