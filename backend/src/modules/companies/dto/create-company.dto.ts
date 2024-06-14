import { ApiProperty } from "@nestjs/swagger";

export class CreateCompanyDto {
  @ApiProperty({
    example: "./images/company/sfasdfa.png",
    required: true,
  })
  logo: string;

  @ApiProperty({
    example: "Example Company",
  })
  name: string;

  @ApiProperty({
    example: new Date("2020-01-01"),
  })
  year: Date;

  @ApiProperty({
    example: "+1 (555) 555-5555",
  })
  phone: string;

  @ApiProperty({
    example: "+1 (555) 555-5555",
  })
  whatsapp: string;

  @ApiProperty({
    example: "United States",
  })
  country: string;

  @ApiProperty({
    example: "New York",
  })
  town: string;

  @ApiProperty({
    type: [String],
    example: ["Service A", "Service B", "Service C"],
  })
  services: string[];

  @ApiProperty({
    example: "This is the company background.",
  })
  background: string;

  @ApiProperty({
    example: "https://www.facebook.com/example-company",
  })
  facebook: string;

  @ApiProperty({
    example: "https://www.linkedin.com/company/example-company",
  })
  linkedin: string;

  @ApiProperty({
    example: "https://www.example-company.com",
  })
  website: string;
}