import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { Book } from 'models/book';

export class CreateBookDto implements Book {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
