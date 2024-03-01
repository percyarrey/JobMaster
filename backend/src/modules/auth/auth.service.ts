import {
  HttpException,
  HttpStatus,
  Injectable,
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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /* REGISTER USER */
  async create(registerDto: RegisterDto, loginDto: LoginDto) {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (registerDto.role) {
      throw new UnauthorizedException();
    }

    if (!usernameRegex.test(registerDto.username)) {
      throw new HttpException(
        'Invalid username. Only alphanumeric characters are allowed.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!emailRegex.test(registerDto.email)) {
      throw new HttpException('Invalid email address.', HttpStatus.BAD_REQUEST);
    }
    const existingUsername: User = await this.userRepository.findOne({
      where: { username: ILike(registerDto.username) },
    });

    const existingEmail: User = await this.userRepository.findOne({
      where: { email: ILike(registerDto.email) },
    });

    if (existingUsername) {
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    }

    if (existingEmail) {
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);
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
      const { password: hashedPassword, ...user } = userSave;
      return this.jwtService.sign(user);
    }
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  /* LOGIN USER */
  async loginUser({ username, password }: LoginDto) {
    const findUser: User = await this.userRepository.findOne({
      where: [{ username: ILike(username) }, { email: ILike(username) }],
    });
    if (!findUser) return null;

    const passwordMatch = await compare(password, findUser.password);

    if (passwordMatch) {
      const { password, ...user } = findUser;
      return { ...user, token: this.jwtService.sign(user) };
    }

    return null;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, loginDto: LoginDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
