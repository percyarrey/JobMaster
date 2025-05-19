import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/* SWAGGER */
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Home')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
