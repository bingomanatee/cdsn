import { Injectable } from '@nestjs/common';
import { CreateProcDto } from './dto/create-proc.dto';
import { UpdateProcDto } from './dto/update-proc.dto';
import { PrismaService } from '../../providers/prisma/prisma.service';

@Injectable()
export class ProcService {
  constructor(private prismaService: PrismaService) {}

  async create(createProcDto: CreateProcDto) {
    return await this.prismaService.process.create({
      data: createProcDto,
    });
  }

  findAll() {
    return this.prismaService.process.findMany();
  }

  findOne(id: string) {
    return this.prismaService.process.findUnique({
      where: { id },
      include: { triggers: true },
    });
  }

  update(id: number, updateProcDto: UpdateProcDto) {
    return `This action updates a #${id} proc`;
  }

  remove(id: number) {
    return `This action removes a #${id} proc`;
  }
}
