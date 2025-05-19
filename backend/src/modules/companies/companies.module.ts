import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Users } from '../auth/entities/Users.entity';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  imports:[TypeOrmModule.forFeature([Company,Users]),]
})
export class CompaniesModule {}
