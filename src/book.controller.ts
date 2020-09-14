import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { CreateBookDto } from 'dtos/create-book.dto';
import { Links, PaginatedBooksDto } from 'dtos/paginated-books.dto';
import { SearchBookDto } from 'dtos/search-book.dto';
import { Book } from 'models/book';
import { BookService } from './book.service';
import { Request } from 'express';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  add(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.addBook(createBookDto);
  }

  @Get(':title')
  find(@Param('title') title: string): Promise<Book> {
    return this.bookService.getBook(title);
  }

  @Post('search')
  @HttpCode(200)
  async searchByKeywords(
    @Req() request: Request,
    @Body() searchBookDto: SearchBookDto,
    @Query('limit') limit: string = '5',
    @Query('start') start: string = '0',
  ): Promise<PaginatedBooksDto> {
    let response = new PaginatedBooksDto();
    let limitInt = parseInt(limit);
    let startInt = parseInt(start);

    response.results = (
      await this.bookService.findByKeywords(searchBookDto.term)
    ).slice(startInt, startInt + limitInt);

    response.limit = limitInt;
    response.start = startInt;
    response.size = response.results.length;

    response._links = new Links(
      `/books/search?limit=${limitInt}&start=${startInt + limitInt}`,
      `/books/search?limit=${limitInt}&start=${startInt - limitInt}`,
      request.url,
    );

    return response;
  }

  @Get()
  async findAll(
    @Req() request: Request,
    @Query('author') author: string,
    @Query('limit') limit: string = '5',
    @Query('start') start: string = '0',
  ): Promise<PaginatedBooksDto> {
    let response = new PaginatedBooksDto();
    let limitInt = parseInt(limit);
    let startInt = parseInt(start);
    if (author) {
      response.results = await this.bookService.getBooksOf(
        author,
        startInt,
        limitInt,
      );
    } else {
      response.results = await this.bookService.getAllBooks(startInt, limitInt);
    }

    response.limit = limitInt;
    response.start = startInt;
    response.size = response.results.length;

    response._links = new Links(
      `/books?limit=${limitInt}&start=${startInt + limitInt}`,
      `/books?limit=${limitInt}&start=${startInt - limitInt}`,
      request.url,
    );

    return response;
  }

  @Delete(':title')
  delete(@Param('title') title: string): void {
    this.bookService.delete(title);
  }
}
