import { Module } from '@nestjs/common';
import { ArtifactService } from './artifact.service';
import { ArtifactController } from './artifact.controller';
import { PrismaService } from '../../providers/prisma/prisma.service';

@Module({
  controllers: [ArtifactController],
  providers: [ArtifactService, PrismaService],
})
export class ArtifactModule {}
