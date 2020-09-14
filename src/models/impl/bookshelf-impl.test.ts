import { Bookshelf } from '../bookshelf';
import { Book } from '../book';
import { BookshelfImpl } from './bookshelf-impl';

describe('Bookshelf', () => {
  const theLordOfTheRings: Book = {
    title: 'The Lord of the Rings',
    author: 'J. R. R. Tolkien',
    date: new Date('1954-02-15'),
  };
  const theHobbit: Book = {
    title: 'The Hobbit',
    author: 'J. R. R. Tolkien',
    date: new Date('1937-09-21'),
  };
  const hamlet: Book = {
    title: 'Hamlet',
    author: 'William Shakespeare',
    date: new Date('1600'),
  };
  const candide: Book = {
    title: 'Candide',
    author: 'Voltaire',
    date: new Date('1759'),
  };
  const aLaRechercheDuTempsPerdu = {
    title: 'À la recherche du temps perdu',
    author: 'Marcel Proust',
    date: new Date('1927'),
  };

  let bookshelf: Bookshelf;

  beforeEach(() => {
    bookshelf = new BookshelfImpl();
  });

  it('should store a book', () => {
    bookshelf.addBook(aLaRechercheDuTempsPerdu);

    expect(bookshelf.getBook('À la recherche du temps perdu')).toEqual(
      aLaRechercheDuTempsPerdu,
    );
  });

  it('should return all books ordered by `title` (ASC)', () => {
    bookshelf.addBook(theLordOfTheRings);
    bookshelf.addBook(theHobbit);
    bookshelf.addBook(hamlet);

    expect(bookshelf.getAllBooks()).toEqual([
      hamlet,
      theHobbit,
      theLordOfTheRings,
    ]);
  });

  it('should return all books of a given author', () => {
    bookshelf.addBook(theLordOfTheRings);
    bookshelf.addBook(theHobbit);
    bookshelf.addBook(hamlet);

    expect(bookshelf.getBooksOf('J. R. R. Tolkien')).toEqual([
      theLordOfTheRings,
      theHobbit,
    ]);
  });

  it('should return the total number of books', () => {
    bookshelf.addBook(hamlet);
    bookshelf.addBook(candide);

    expect(bookshelf.getTotalNumberOfBooks()).toEqual(2);
  });

  it('should not duplicate a book already stored', () => {
    bookshelf.addBook(aLaRechercheDuTempsPerdu);
    expect(bookshelf.getTotalNumberOfBooks()).toEqual(1);

    bookshelf.addBook(aLaRechercheDuTempsPerdu);
    expect(bookshelf.getTotalNumberOfBooks()).toEqual(1);
  });

  it('should get Books Published Before Date (as Date)', () => {
    // Arrange
    bookshelf.addBook(theLordOfTheRings);
    bookshelf.addBook(theHobbit);
    bookshelf.addBook(hamlet);
    bookshelf.addBook(candide);
    bookshelf.addBook(aLaRechercheDuTempsPerdu);

    // Act
    let result = bookshelf.getBooksPublishedBefore(new Date('1930'));
    let expected = [candide, hamlet, aLaRechercheDuTempsPerdu];

    // Assert
    expect(result).toEqual(expect.arrayContaining(expected));
  });

  it('should get Books Published Before Date (as string)', () => {
    // Arrange
    bookshelf.addBook(theLordOfTheRings);
    bookshelf.addBook(theHobbit);
    bookshelf.addBook(hamlet);
    bookshelf.addBook(candide);
    bookshelf.addBook(aLaRechercheDuTempsPerdu);

    // Act
    let result = bookshelf.getBooksPublishedBefore('1930');
    let expected = [candide, hamlet, aLaRechercheDuTempsPerdu];

    // Assert
    expect(result).toEqual(expect.arrayContaining(expected));
  });
});
