import { Book } from '../book';
import { Bookshelf } from '../bookshelf';

export class BookshelfImpl implements Bookshelf {
  private _db: Book[] = [
    {
      title: 'The Lord of the Rings',
      author: 'J. R. R. Tolkien',
      date: new Date('1954-02-15'),
    },
    {
      title: 'The Hobbit',
      author: 'J. R. R. Tolkien',
      date: new Date('1937-09-21'),
    },
    {
      title: 'Candide',
      author: 'Voltaire',
      date: new Date('1759'),
    },
    {
      title: '1',
      author: 'Voltaire',
      date: new Date('1759'),
    },
    {
      title: '2',
      author: 'Voltaire',
      date: new Date('1759'),
    },
    {
      title: '3',
      author: 'Voltaire',
      date: new Date('1759'),
    },
    {
      title: '4',
      author: 'Voltaire',
      date: new Date('1759'),
    },
    {
      title: '5',
      author: 'Voltaire',
      date: new Date('1759'),
    },
    {
      title: '6',
      author: 'Voltaire',
      date: new Date('1759'),
    },
    {
      title: '7',
      author: 'Voltaire',
      date: new Date('1759'),
    },
    {
      title: '8',
      author: 'Voltaire',
      date: new Date('1759'),
    },
    {
      title: '9',
      author: 'Voltaire',
      date: new Date('1759'),
    },
    {
      title: '10',
      author: 'Voltaire',
      date: new Date('1759'),
    },
  ];

  addBook(book: Book): void {
    if (!this._db.includes(book)) {
      this._db.push(book);
    }
  }

  addAllBooks(books: Book[]): void {
    books.forEach(this.addBook);
  }

  getBook(name: string): Book | null {
    let result = this._db.find(book => {
      return book.title === name;
    });
    return result === undefined ? null : result;
  }

  getBooksOf(author: string): Book[] {
    return this._db.filter(book => {
      return book.author === author;
    });
  }

  getAllBooks(): Book[] {
    let result = this._db.sort((a, b) => a.title.localeCompare(b.title));

    return result;
  }

  getTotalNumberOfBooks(): number {
    return this._db.length;
  }

  getBooksPublishedBefore(aDate: string | Date): Book[] {
    return this._db.filter(book => {
      return book.date < aDate;
    });
  }

  delete(name: string): void {
    this._db = this._db.filter(item => item.title !== name);
  }

  findByKeywords(keywords: string): Book[] {
    let keywordsList = keywords.toLowerCase().split(' ');
    let result = this._db.filter(book => {
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
