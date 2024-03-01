import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'user',
    required: true,
  })
  username: string;

  @ApiProperty({
    example: '1234578910',
    required: true,
  })
  password: string;
}
