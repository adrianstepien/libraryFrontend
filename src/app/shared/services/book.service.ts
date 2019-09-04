import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookEntity } from '../classes/book-entity';

@Injectable()
export class BookService {
  private libraryUrl: string;
  bookToEdit: BookEntity;

  constructor(private http: HttpClient) {
    this.libraryUrl = 'http://127.0.0.1:8080/api/book'
  }

  public findBooksInLibrary(searchPhrase: string): Observable<BookEntity[]> {
    return this.http.get<BookEntity[]>(this.libraryUrl + '/findByParam/' + searchPhrase);
  }

  public findBooksInPrivateRegister(): Observable<BookEntity[]> {
    return this.http.get<BookEntity[]>(this.libraryUrl);
  }

  public addBookToRegister(selectedBook: BookEntity): Observable<BookEntity> {
    return this.http.post<BookEntity>(this.libraryUrl, selectedBook);
  }

  public updateBookInRegister(bookToUpdate: BookEntity): Observable<BookEntity> {
    return this.http.put<BookEntity>(this.libraryUrl, bookToUpdate);
  }

  public deleteBookFromRegister(id: number){
    return this.http.delete(this.libraryUrl + "/" + id);
  }

  public setBookToEdit(bookToEdit: BookEntity) {
    this.bookToEdit = bookToEdit;
  }

  public getBookToEdit(): BookEntity {
    return this.bookToEdit;
  }
}