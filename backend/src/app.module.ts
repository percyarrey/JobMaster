import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

/* ENV MODULE */
import { ConfigModule, ConfigService } from "@nestjs/config";

/* MODULES */
import { AuthModule } from "./modules/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { CompaniesModule } from "./modules/companies/companies.module";
import { JobsModule } from "./modules/jobs/jobs.module";

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        url: config.get("DATABASE_URL"),
        entities: [join(process.cwd(), "dist/**/*.entity.js")],
        synchronize: true,
      }),
    }),

    CompaniesModule,
    JobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
