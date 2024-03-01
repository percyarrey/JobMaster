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
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

/* GUARDS */
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';

/* DTO */
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

/* SWAGGER */
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* REGISTER USER */
  @Post('register')
  create(@Body() registerDto: RegisterDto, @Body() @Body() LoginDto: LoginDto) {
    return this.authService.create(registerDto, LoginDto);
  }

  /* LOGIN USER*/
  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  /* GET PROFILE */
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  profile(@Req() req: Request) {
    return req.user;
  }

  /*  @Patch(':id')
  update(@Param('id') id: string, ) {
    return this.authService.update(+id, LoginDto);
  } */

  /* @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  } */
}
