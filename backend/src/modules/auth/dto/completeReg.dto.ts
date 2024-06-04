import { ApiProperty } from "@nestjs/swagger";

export class CompleteRegDto {
  @ApiProperty({
    example: "1234578910",
    required: true,
  })
  password: string;

  @ApiProperty({
    example: "Buea",
    required: true,
  })
  town: string;

  @ApiProperty({
    example: "Molyko",
    required: true,
    type: "string", // Adjust this if 'country' is an object
  })
  country: any;

  @ApiProperty({
    example: "client",
    required: true,
  })
  accounttype: string;
}
