import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({
    example: "user",
    required: true,
  })
  fname: string;

  @ApiProperty({
    example: "user",
    required: true,
  })
  lname: string;

  @ApiProperty({
    example: "tanyitikuarrey@gmail.com",
    required: true,
  })
  email: string;

  @ApiProperty({
    example: "1234578910",
    required: true,
  })
  password: string;

  @ApiProperty({
    example: "Buea",
    required: true,
  })
  country: any;

  @ApiProperty({
    example: "Molyko",
    required: true,
  })
  town: string;

  @ApiProperty({
    example: "client",
    required: true,
  })
  accounttype: string;
}
