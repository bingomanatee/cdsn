import { Injectable } from '@nestjs/common';
import { CreateArtifactDto } from './dto/create-artifact.dto';
import { UpdateArtifactDto } from './dto/update-artifact.dto';
import { PrismaService} from "../../providers/prisma/prisma.service";

@Injectable()
export class ArtifactService {
  constructor(private prismaService: PrismaService) {}
  create(createArtifactDto: CreateArtifactDto) {
    return 'This action adds a new artifact';
  }

  async findAll() {
    return this.prismaService.artifact.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} artifact`;
  }

  update(id: number, updateArtifactDto: UpdateArtifactDto) {
    return `This action updates a #${id} artifact`;
  }

  remove(id: number) {
    return `This action removes a #${id} artifact`;
  }
}
