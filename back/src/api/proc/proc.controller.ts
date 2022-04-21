import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProcService } from './proc.service';
import { CreateProcDto } from './dto/create-proc.dto';
import { UpdateProcDto } from './dto/update-proc.dto';

@Controller('api/proc')
export class ProcController {
  constructor(private readonly procService: ProcService) {}

  @Post()
  create(@Body() createProcDto: CreateProcDto) {
    return this.procService.create(createProcDto);
  }

  @Get()
  findAll() {
    return this.procService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.procService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcDto: UpdateProcDto) {
    return this.procService.update(+id, updateProcDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.procService.remove(+id);
  }
}
