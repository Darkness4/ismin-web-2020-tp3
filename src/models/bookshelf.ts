import { Book } from './book';

export interface Bookshelf {
  /**
   * Add a `Book` to the `Bookshelf`.
   *
   * Duplicates are removed.
   * @param book A `Book`
   */
  addBook(book: Book): void;

  addAllBooks(books: Book[]): void;

  /**
   * Fetches a `Book` from the `Bookshelf`.
   *
   * Returns `null` if not found.
   * @param name The title of the `Book`
   */
  getBook(name: string): Book | null;

  /**
   * Returns an `Array` of `Book`s based on the author.
   *
   * @param author The author of the `Book`
   */
  getBooksOf(author: string): Book[];

  /**
   * Returns an `Array` of all the `Book`s of the `Bookshelf`.
   *
   * Sorted by title ASC.
   */
  getAllBooks(): Book[];

  /**
   * Returns the total numbers of books.
   */
  getTotalNumberOfBooks(): number;

  /**
   * Returns all the `Book`s that was published before the `aDate`.
   *
   * @param aDate Publishing date.
   */
  getBooksPublishedBefore(aDate: string | Date): Book[];

  /**
   * Delete a book based on a title.
   *
   * @param name Title of the book.
   */
  delete(name: string): void;

  /**
   * Get all books where the title or the author name contains any keywords.
   *
   * @param keywords Keywords used as criteria
   */
  findByKeywords(keywords: string): Book[];
}
