import { PartialType } from '@nestjs/mapped-types';
import { CreateProcDto } from './create-proc.dto';

export class UpdateProcDto extends PartialType(CreateProcDto) {}
