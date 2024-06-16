import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../auth/entities/Users.entity';
import { Job } from './entities/job.entity';
import { Company } from '../companies/entities/company.entity';

@Module({
  controllers: [JobsController],
  providers: [JobsService],
  imports:[TypeOrmModule.forFeature([Job,Users,Company]),]
})
export class JobsModule {}
