import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { BookModule } from './book.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(BookModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
