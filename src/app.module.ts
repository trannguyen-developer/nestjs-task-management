import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

const isProduction = process.env.STAGE === 'prod';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.STAGE}`],
    }),
    TasksModule,
    TypeOrmModule.forRoot({
      ssl: isProduction,
      extra: { ssl: isProduction ? { rejectUnauthorized: false } : null },
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    }),
    AuthModule,
  ],
})
export class AppModule {}
