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
    return this.bookModel.create(createBookDto);
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

  async findByKeywords(term: string): Promise<Book[]> {
    return this.bookModel
      .find({
        $or: [
          { author: new RegExp(term, 'gi') },
          { title: new RegExp(term, 'gi') },
        ],
      })
      .exec();
  }

  async top5(): Promise<any[]> {
    return this.bookModel
      .aggregate([
        {
          $group: {
            _id: '$author',
            author: { $first: '$author' },
            numberOfBooks: { $sum: 1 },
          },
        },
        {
          $sort: { numberOfBooks: -1 },
        },
        {
          $limit: 5,
        },
        {
          $addFields: { topOrder: 1 },
        },
      ])
      .exec();
  }
}
