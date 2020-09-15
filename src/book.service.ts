import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { BookModel } from 'database/book.schema';
import { CreateBookDto } from 'dtos/create-book.dto';
import { Book } from 'models/book';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(BookModel.name) private bookModel: Model<BookModel>,
  ) {}

  async addBook(createBookDto: CreateBookDto): Promise<Book> {
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }

  async getBook(title: string): Promise<Book> {
    return this.bookModel.findOne({ title: title }).exec();
  }

  async getBooksOf(
    author: string,
    start: number,
    limit: number,
  ): Promise<Book[]> {
    return this.bookModel
      .find()
      .where('author')
      .equals(author)
      .skip(start)
      .limit(limit)
      .exec();
  }

  async getAllBooks(start: number, limit: number): Promise<Book[]> {
    return this.bookModel
      .find()
      .skip(start)
      .limit(limit)
      .exec();
  }

  async getTotalNumberOfBooks(): Promise<number> {
    return this.bookModel.estimatedDocumentCount();
  }

  async getBooksPublishedBefore(date: Date): Promise<Book[]> {
    return this.bookModel
      .find()
      .where('date')
      .lt(date)
      .exec();
  }

  async delete(title: string): Promise<Book> {
    return this.bookModel.findOneAndDelete({ title: title }).exec();
  }

  async findByKeywords(keywords: string): Promise<Book[]> {
    let keywordsList = keywords.toLowerCase().split(' ');
    let result = (await this.bookModel.find().exec()).filter(book => {
      if (keywords === null || keywords === '') {
        return true;
      }
      return keywordsList.every(keyword => {
        return (
          (book.title ?? '').toLowerCase().includes(keyword) ||
          (book.author ?? '').toLowerCase().includes(keyword)
        );
      });
    });

    return result;
  }
}
