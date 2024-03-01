import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/* ENV MODULE */
import { ConfigModule, ConfigService } from '@nestjs/config';

/* MODULES */
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        type: 'postgres',
        host: ConfigService.get('DB_HOST'),
        port: +ConfigService.get('DB_HOST'),
        username: ConfigService.get('DB_USERNAME'),
        password: ConfigService.get('DB_PASSWORD'),
        database: ConfigService.get('DB_NAME'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        // do NOT use synchronize: true in real projects
        synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
