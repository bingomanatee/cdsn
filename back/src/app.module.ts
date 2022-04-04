import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ArtifactModule } from './api/artifact/artifact.module';
import { TaskModule } from './api/task/task.module';
import { ProcModule } from './api/proc/proc.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'front', 'dist'),
    }),
    ArtifactModule,
    TaskModule,
    ProcModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
