import { Controller, Get } from '@nestjs/common';
import { BookService } from 'book.service';
import { Book } from 'models/book';

@Controller('authors')
export class AuthorController {
  constructor(private readonly bookService: BookService) {}

  @Get('top-5')
  fetchTopAuthors(): Promise<any[]> {
    return this.bookService.top5();
  }
}
