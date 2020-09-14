import { Book } from 'models/book';

export class PaginatedBooksDto {
  _links: Links;
  limit: number;
  results: Book[];
  size: number;
  start: number;
}

export class Links {
  constructor(public next: string, public prev: string, public self: string) {}
}
