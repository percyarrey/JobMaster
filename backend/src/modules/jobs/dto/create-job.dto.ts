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
      requirement: string[];
    
      @ApiProperty({
        example: "software",
      })
      description: string;
      
}
