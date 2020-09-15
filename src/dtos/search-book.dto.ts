import { IsString } from 'class-validator';

export class SearchBookDto {
  @IsString()
  term: string;
}
