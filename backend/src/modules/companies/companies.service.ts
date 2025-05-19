import { Injectable } from '@nestjs/common';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import {  Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Users } from '../auth/entities/Users.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>, 

  ) {}

  async create(createCompanyDto: CreateCompanyDto, user) {
    const existingCompany = await this.companyRepository.findOne({
      where: { userId:user.id  }
    });
    
    if (existingCompany) {
      // Update the existing company
      existingCompany.logo = createCompanyDto.logo;
      existingCompany.name = createCompanyDto.name;
      existingCompany.year = createCompanyDto.year;
      existingCompany.phone = createCompanyDto.phone;
      existingCompany.whatsapp = createCompanyDto.whatsapp;
      existingCompany.country = createCompanyDto.country;
      existingCompany.town = createCompanyDto.town;
      existingCompany.services = createCompanyDto.services;
      existingCompany.background = createCompanyDto.background;
      existingCompany.facebook = createCompanyDto.facebook;
      existingCompany.linkedin = createCompanyDto.linkedin;
      existingCompany.website = createCompanyDto.website;

      return this.companyRepository.save(existingCompany);
    } else {
      const newCompany = this.companyRepository.create({
        ...createCompanyDto,
        userId:user.id
      });
      return await this.companyRepository.save(newCompany);
    }
  }


  async findAll() {
    return await this.companyRepository.find({})
  }

  async findOne(id: number) {
    console.log(id)
    const company = await this.companyRepository.findOne({
      where: {  id }
    })
    if(company){
      return company
    }
    return null
  }
  async findCompanyFromUser(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
   
    if (user) {
      return await this.companyRepository.findOne({
        where: { userId: user.id }
      })
    }
    return null
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
