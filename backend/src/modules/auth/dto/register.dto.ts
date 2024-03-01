import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'user',
    required: true,
  })
  username: string;

  @ApiProperty({
    example: 'rehmat.sayani@gmail.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: '1234578910',
    required: true,
  })
  password: string;

  @ApiProperty({
    example: 'buea',
    required: true,
  })
  town: string;

  @ApiProperty({
    example: 'molyko',
    required: true,
  })
  quarter: string;

  role: string;
}
