export enum DockerState {
  RUNNING = 'running',
  STOPPED = 'stopped',
  UNDEFINED = 'undefined',
}

export type DockerInfo = {
  name: string;
  image: string;
  tag: string;
  state: string;
};
