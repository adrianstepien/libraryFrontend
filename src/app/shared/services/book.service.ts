import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';
import { BookEntity } from '../classes/book-entity';
import { environment } from '../../../environments/environment';

@Injectable()
export class BookService {
    private libraryUrl: string;
    private googleDriveUrl: string;
    bookToEdit: BookEntity;
    googleBookToDisplay: BookEntity;

    constructor(private http: HttpClient) {
        this.libraryUrl = environment.backend_url + '/api/book';
        this.googleDriveUrl = environment.backend_url;
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

    public downloadBookFile(bookId: string): Observable<ArrayBuffer> {
        return this.http.get(this.googleDriveUrl + '/getFile/' + bookId, {responseType: 'arraybuffer'});
    }

    public updateBookInRegister(bookToUpdate: BookEntity): Observable<BookEntity> {
        return this.http.put<BookEntity>(this.libraryUrl, bookToUpdate);
    }

    public uploadFileToBook(file: File, bookId:string): Observable<boolean | {}> {
        const formData: FormData = new FormData();
        formData.append('bookFile', file, file.name);
        return this.http
        .post(this.googleDriveUrl + '/saveFile/' + bookId, formData)
        .map(() => { return true; });
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

    public setGoogleBookToDisplay(googleBookToDisplay: BookEntity) {
        this.googleBookToDisplay = googleBookToDisplay;
    }

    public getGoogleBookToDisplay(): BookEntity {
        return this.googleBookToDisplay;
    }
}
