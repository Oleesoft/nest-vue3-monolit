import { Injectable, Logger } from '@nestjs/common';
import * as DockerApi from 'node-docker-api';
import { DockerInfo, DockerState } from './docker.interface';

@Injectable()
export class DockerService {
  logger = new Logger(DockerService.name);

  docker = new DockerApi.Docker({ socketPath: '/var/run/docker.sock' });

  constructor() {
    this.logger.log('DockerService instantiated');
    this.listContainers();
  }

  async listContainers(): Promise<DockerInfo[]> {
    try {
      const containerList: DockerInfo[] = [];
      const containers = await this.docker.container.list();
      for (const container of containers) {
        const entry = (container.data as any) || undefined;
        if (entry) {
          const cName = entry.Names[0].split('/')[1];
          const imageInfo = entry.Image.split(':');
          containerList.push({
            name: cName,
            image: imageInfo[0],
            tag: imageInfo[1],
            state: this.parseState(entry.State),
          });
        }
      }
      return containerList;
    } catch (error) {
      this.logger.error('List containers error: ' + error.message);
      return null;
    }
  }


  private parseState(state: string): DockerState {
    if (state == undefined) return DockerState.UNDEFINED;
    switch (state) {
      case 'running':
        return DockerState.RUNNING;
      case 'stopped':
        return DockerState.STOPPED;
    }
    return DockerState.UNDEFINED;
  }
}
