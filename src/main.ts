import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { number } from 'joi';
import { AppModule } from './app.module';
import { JwtMiddleware } from './jwt/jwt.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
