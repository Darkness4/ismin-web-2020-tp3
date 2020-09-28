import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AuthorController } from 'author.controller';
import { BookModel, BookSchema } from 'database/book.schema';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://uht3sohis1mldn19adwf:IPX5vK92lnO71nHeJriF@bqxuj1qtyo7iqvb-mongodb.services.clever-cloud.com:27017/bqxuj1qtyo7iqvb'),
    MongooseModule.forFeature([{ name: BookModel.name, schema: BookSchema }]),
  ],
  controllers: [BookController, AuthorController],
  providers: [BookService],
})
export class BookModule {}
