import { Prop } from '@nestjs/mongoose/dist/decorators/prop.decorator';
import { Schema } from '@nestjs/mongoose/dist/decorators/schema.decorator';
import { SchemaFactory } from '@nestjs/mongoose/dist/factories/schema.factory';
import { Book } from 'models/book';
import { Document } from 'mongoose';

@Schema()
export class BookModel extends Document implements Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  date: Date;
}

export const BookSchema = SchemaFactory.createForClass(BookModel);
