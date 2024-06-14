import { Injectable } from '@nestjs/common';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { ILike, Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>, 
  ) {}

  async create(company: CreateCompanyDto){
    console.log(company)
    const existingCompany = await this.companyRepository.findOne({
      where: { name: ILike(company.name) },
    });

    if (existingCompany) {
      // Update the existing company
      await this.companyRepository.update(existingCompany.id, company);
      return this.companyRepository.save(existingCompany);
    } else {
      const newCompany = this.companyRepository.create({...company,userId:123});
      return await this.companyRepository.save(newCompany);
    }
  }


  findAll() {
    return this.companyRepository.find({})
  }

  async findOne(id: string) {
    return await this.companyRepository.findOne({
      where: { name: ILike(id) },
    });
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
