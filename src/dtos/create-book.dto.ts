import { IsDateString, IsNotEmpty } from 'class-validator';
import { Book } from 'models/book';

export class CreateBookDto implements Book {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
