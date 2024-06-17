import { ApiProperty } from "@nestjs/swagger";

export class CreateJobDto {
    
      @ApiProperty({
        example: "Example job",
      })
      name: string;
    
      @ApiProperty({
        example: "software",
      })
      category: string;
    
      @ApiProperty({
        example: "20",
      })
      minsalary:number;

      @ApiProperty({
        example: "30",
      })
      maxsalary:number;
    
      
      @ApiProperty({
        type: [String],
        example: ["Requirement A", "Requirement B", "Requirement C"],
      })
      requirements: string[];
    
      @ApiProperty({
        example: "software",
      })
      description: string;

      @ApiProperty({
        example: "full-time",
      })
      type: string;

      @ApiProperty({
        example: "12-123-2024",
      })
      deadline: Date;

      @ApiProperty({
        example: 0,
      })
      experience: number;
      
}
