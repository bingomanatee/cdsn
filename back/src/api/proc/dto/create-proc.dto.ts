import { ApiProperty } from '@nestjs/swagger';

export class CreateProcDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  order: number;

}
