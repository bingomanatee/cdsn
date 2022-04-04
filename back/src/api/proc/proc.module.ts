import { Module } from '@nestjs/common';
import { ProcService } from './proc.service';
import { ProcController } from './proc.controller';
import { PrismaService } from '../../providers/prisma/prisma.service';

@Module({
  controllers: [ProcController],
  providers: [ProcService, PrismaService],
})
export class ProcModule {}
