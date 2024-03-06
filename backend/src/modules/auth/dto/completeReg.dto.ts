import { ApiProperty } from '@nestjs/swagger';

export class completeRegDto {
  @ApiProperty({
    example: '1234578910',
    required: true,
  })
  password: string;

  @ApiProperty({
    example: 'Buea',
    required: true,
  })
  town: string;

  @ApiProperty({
    example: 'Molyko',
    required: true,
  })
  quarter: string;

  @ApiProperty({
    example: 'client',
    required: true,
  })
  accounttype: string;
}
