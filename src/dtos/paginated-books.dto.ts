import { Book } from 'models/book';

export class PaginatedDto<T = any> {
  _links: Links;
  limit: number;
  results: T[];
  size: number;
  start: number;
}

export class Links {
  constructor(public next: string, public prev: string, public self: string) {}
}
