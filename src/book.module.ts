import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { BookModel, BookSchema } from 'database/book.schema';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost'),
    MongooseModule.forFeature([{ name: BookModel.name, schema: BookSchema }]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
