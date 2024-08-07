/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

/* DTO */
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";

/* ENTITIES */
import { Users } from "./entities/Users.entity";

/* BCRYPT */
/* import { hash, compare } from "bcrypt"; */
import { CompleteRegDto } from "./dto/completeReg.dto";
import { Company } from "../companies/entities/company.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private jwtService: JwtService,
  ) {}

  /* REGISTER USER */
  async create(registerDto: RegisterDto) {
    const nameRegex = /^[a-zA-Z0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!nameRegex.test(registerDto.fname)) {
      throw new HttpException("Invalid First Name.", HttpStatus.BAD_REQUEST);
    }
    if (!nameRegex.test(registerDto.lname)) {
      throw new HttpException("Invalid Last Name.", HttpStatus.BAD_REQUEST);
    }

    if (!emailRegex.test(registerDto.email)) {
      throw new HttpException("Invalid email address.", HttpStatus.BAD_REQUEST);
    }

    const existingUser: Users = await this.usersRepository.findOne({
      where: { email: ILike(registerDto.email) },
    });

    if (existingUser) {
      throw new HttpException("Email already in use", HttpStatus.CONFLICT);
    }

    // Hash the password
    /* const hashedPassword = await hash(registerDto.password, 10); */

    // Create and save the user
    const user = await this.usersRepository.create({
      ...registerDto,
      /* password: hashedPassword, */

      country: registerDto.country?.name
        ? registerDto.country?.name
        : registerDto.country,
      authstatus: "full",
    });
    const userSave = await this.usersRepository.save(user);

    if (userSave) {
      const { password: hashedPassword, accountstatus, ...user } = userSave;
      const company = await this.companyRepository.findOne({
        where: { userId: user.id },
      });
      if (company) {
        return {
          token: this.jwtService.sign({ ...user, companyId: company.id }),
        };
      }
      return {
        token: this.jwtService.sign({ ...user }),
      };
    }
    throw new HttpException(
      "Something went wrong",
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  /* SOCIAL REGISTER ie google and facebook */
  async socialRegister(registerDto: RegisterDto) {
    const nameRegex = /^[a-zA-Z0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!nameRegex.test(registerDto.fname)) {
      throw new HttpException("Invalid First Name.", HttpStatus.BAD_REQUEST);
    }
    if (!nameRegex.test(registerDto.lname)) {
      throw new HttpException("Invalid Last Name.", HttpStatus.BAD_REQUEST);
    }

    if (!emailRegex.test(registerDto.email)) {
      throw new HttpException("Invalid email address.", HttpStatus.BAD_REQUEST);
    }

    const existingUser: Users = await this.usersRepository.findOne({
      where: { email: ILike(registerDto.email) },
    });

    if (existingUser) {
      const { password: hashedPassword, ...user } = existingUser;
      return {
        token: this.jwtService.sign(user),
      };
    }

    // Hash the password
    /* const hashedPassword = await hash(registerDto.password, 10); */
    // Create and save the user
    const user = await this.usersRepository.create({
      ...registerDto,
      /* password: hashedPassword, */
    });
    const userSave = await this.usersRepository.save(user);

    if (userSave) {
      const { password: hashedPassword, ...user } = userSave;
      return {
        token: this.jwtService.sign(user),
      };
    }
    throw new HttpException(
      "Something went wrong",
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  /* LOGIN USER */
  async loginUser({ email, password }: LoginDto) {
    const findUser: Users = await this.usersRepository.findOne({
      where: [{ email: ILike(email) }],
    });
    if (!findUser) return null;

    const passwordMatch =
      password ===
      findUser.password; /* await compare(password, findUser.password); */

    if (passwordMatch) {
      const { password: hashedPassword, accountstatus, ...user } = findUser;
      const company = await this.companyRepository.findOne({
        where: { userId: user.id },
      });
      if (company) {
        return {
          token: this.jwtService.sign({ ...user, companyId: company.id }),
        };
      }
      return {
        token: this.jwtService.sign({ ...user }),
      };
    }

    return null;
  }

  /* COMPLETE REGISTERATION from facebook and google */
  async completeReg(email: string, completeRegDto: CompleteRegDto) {
    let findUser: Users = await this.usersRepository.findOne({
      where: { email: ILike(email) },
    });

    if (!findUser) {
      throw new NotFoundException("User not found");
    }

    /* const hashedPassword = await hash(completeRegDto.password, 10); */
    findUser = {
      ...findUser,
      /* password: hashedPassword, */
      country: completeRegDto.country?.name
        ? completeRegDto.country?.name
        : completeRegDto.country,
      town: completeRegDto.town,
      accounttype: completeRegDto.accounttype,
      authstatus: "full",
    };
    // Update the user's fields as needed
    /* findUser.password = hashedPassword; */
    // Update other fields if necessary

    const updatedUser = await this.usersRepository.save(findUser);
    const company = await this.companyRepository.findOne({
      where: { userId: updatedUser.id },
    });
    if (company) {
      return {
        token: this.jwtService.sign({ ...updatedUser, companyId: company.id }),
      };
    }
    return {
      token: this.jwtService.sign({ ...updatedUser }),
    };
  }
}
