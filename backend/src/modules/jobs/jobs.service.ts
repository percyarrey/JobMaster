import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../auth/entities/Users.entity';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { Company } from '../companies/entities/company.entity';

@Injectable()
export class JobsService {
  constructor(@InjectRepository(Users)
  private readonly usersRepository: Repository<Users>,
  @InjectRepository(Job)
  private readonly jobRepository: Repository<Job>,
  @InjectRepository(Company)
  private readonly companyRepository: Repository<Company>,  ) {
    
  }
  async create(createJobDto: CreateJobDto, user) {
    console.log(createJobDto);
  
    const company = await this.companyRepository.findOne({
      where: { userId: user.id },
    });
  
    if (!company) {
      throw new HttpException("Invalid Information.", HttpStatus.BAD_REQUEST);
    }
  
    const existingJob = await this.jobRepository.findOne({
      where: {
        userId: user.id,
        companyId: company.id,
      },
    });
  
    if (existingJob) {
      existingJob.category=createJobDto.category
      existingJob.description=createJobDto.description
      existingJob.maxsalary = createJobDto.maxsalary
      existingJob.minsalary = createJobDto.minsalary
      existingJob.requirements = createJobDto.requirement
      return this.jobRepository.save(existingJob);
    }
  
    const job = this.jobRepository.create({
      ...createJobDto,
      companyId: company.id,
      userId: user.id,
    });
  
    return this.jobRepository.save(job);
  }

  findAll() {
    return `This action returns all jobs`;
  }

  async findOne(id: number) {
    
    const company = await this.companyRepository.findOne({
      where: { userId: id },
    });

    if (company) {
    
      return  await this.jobRepository.findOne({
        where: {
          userId: id,
          companyId: company.id,
        },
      });
    }

    return null
    return `This action returns a #${id} job`;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
