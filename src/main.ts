import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { BookModule } from './book.module';

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create(BookModule);
  app.useGlobalPipes(new ValidationPipe());
  if (port) {
    await app.listen(port);
  } else {
    await app.listen(3000);
  }
}
bootstrap();
