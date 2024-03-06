import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

/* DTO */
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

/* ENTITIES */
import { User } from './entities/User.entity';

/* BCRYPT */
import { hash, compare } from 'bcrypt';
import { completeRegDto } from './dto/completeReg.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /* REGISTER USER */
  async create(registerDto: RegisterDto, loginDto: LoginDto) {
    console.log(registerDto);
    const nameRegex = /^[a-zA-Z0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!nameRegex.test(registerDto.fname)) {
      throw new HttpException('Invalid First Name.', HttpStatus.BAD_REQUEST);
    }
    if (!nameRegex.test(registerDto.lname)) {
      throw new HttpException('Invalid Last Name.', HttpStatus.BAD_REQUEST);
    }

    if (!emailRegex.test(registerDto.email)) {
      throw new HttpException('Invalid email address.', HttpStatus.BAD_REQUEST);
    }

    const existingUser: User = await this.userRepository.findOne({
      where: { email: ILike(registerDto.email) },
    });

    if (existingUser) {
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);
    }

    // Hash the password
    const hashedPassword = await hash(registerDto.password, 10);

    // Create and save the user
    const user = await this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
      authstatus: 'full',
    });
    const userSave = await this.userRepository.save(user);

    if (userSave) {
      const { id, password: hashedPassword, ...user } = userSave;
      return {
        token: this.jwtService.sign(user),
      };
    }
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  /* SOCIAL REGISTER ie google and facebook */
  async socialRegister(registerDto: RegisterDto) {
    const nameRegex = /^[a-zA-Z0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!nameRegex.test(registerDto.fname)) {
      throw new HttpException('Invalid First Name.', HttpStatus.BAD_REQUEST);
    }
    if (!nameRegex.test(registerDto.lname)) {
      throw new HttpException('Invalid Last Name.', HttpStatus.BAD_REQUEST);
    }

    if (!emailRegex.test(registerDto.email)) {
      throw new HttpException('Invalid email address.', HttpStatus.BAD_REQUEST);
    }

    const existingUser: User = await this.userRepository.findOne({
      where: { email: ILike(registerDto.email) },
    });

    if (existingUser) {
      const { id, password: hashedPassword, ...user } = existingUser;
      return {
        token: this.jwtService.sign(user),
      };
    }

    // Hash the password
    const hashedPassword = await hash(registerDto.password, 10);

    // Create and save the user
    const user = await this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
    });
    const userSave = await this.userRepository.save(user);

    if (userSave) {
      const { id, password: hashedPassword, ...user } = userSave;
      return {
        token: this.jwtService.sign(user),
      };
    }
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  /* LOGIN USER */
  async loginUser({ email, password }: LoginDto) {
    const findUser: User = await this.userRepository.findOne({
      where: [{ email: ILike(email) }],
    });
    if (!findUser) return null;

    const passwordMatch = await compare(password, findUser.password);

    if (passwordMatch) {
      const { id, password: hashedPassword, ...user } = findUser;
      return {
        token: this.jwtService.sign(user),
      };
    }

    return null;
  }

  /* COMPLETE REGISTERATION from facebook and google */
  async completeReg(email: string, completeRegDto: completeRegDto) {
    var findUser: User = await this.userRepository.findOne({
      where: { email: ILike(email) },
    });

    if (!findUser) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await hash(completeRegDto.password, 10);
    findUser = {
      ...findUser,
      password: hashedPassword,
      quarter: completeRegDto.quarter,
      town: completeRegDto.town,
      accounttype: completeRegDto.accounttype,
      authstatus: 'full',
    };
    // Update the user's fields as needed
    findUser.password = hashedPassword;
    // Update other fields if necessary

    const updatedUser = await this.userRepository.save(findUser);
    return {
      token: this.jwtService.sign(updatedUser),
    };
  }
}
