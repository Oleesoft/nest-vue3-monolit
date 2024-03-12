import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DockerServiceModule } from './docker-service/docker-service.module';
import { DockerService } from './docker-service/docker.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

// --
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/dist'),
      exclude: ['/api/(.*)'],
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.defaults'],
      isGlobal: true,
      expandVariables: true,
    }),
    DockerServiceModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, DockerService],
})
export class AppModule {}
