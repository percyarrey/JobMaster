import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from "@nestjs/common";
import { JobsService } from "./jobs.service";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { Request } from "express";

@Controller("jobs")
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createJobDto: CreateJobDto, @Req() req: Request) {
    return this.jobsService.create(createJobDto, req.user);
  }

  @Get()
  findAll(
    @Query("query") query?: string,
    @Query("first") first?: number,
    @Query("items") items?: number,
    @Query("country") country?: string,
  ) {
    return this.jobsService.findAll(query, first, items, country);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.jobsService.findOne(+id);
  }
  @Get("findjob/:id")
  getJobDetails(@Param("id") id: string) {
    return this.jobsService.getJobDetails(+id);
  }
  @Get("findjobbycompany/:id")
  findJobsByCompany(@Param("id") id: string) {
    return this.jobsService.findJobsByCompany(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.jobsService.remove(+id);
  }
}
