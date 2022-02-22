import { Component, OnInit } from '@angular/core';
import { BookEntity } from '../shared/classes/book-entity'
import { BookEntityPage } from '../shared/classes/book-entity-page'
import { BookService } from '../shared/services/book.service'

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
    private RATE_DESC = "Ocena malejąco";
    private RATE_ASC = "Ocena rosnąco";
    private DATE_DESC = "Data przeczytania malejąco";
    private DATE_ASC = "Data przeczytania rosnąco";
    public siteIndex = "0";
    public sortOrder = "DESC";
    public sortField = "DATE_OF_READING";
    public booksInRegister: BookEntity[];
    public bookEntityPage: {};
    public sortParam: string[] = [
        this.RATE_DESC,
        this.RATE_ASC,
        this.DATE_DESC,
        this.DATE_ASC
    ];

    constructor(private bookService: BookService) { }

    ngOnInit() {
        this.getBooksFromRegister();
    }

    loadSite(pageNumber: string) {
        this.siteIndex = pageNumber;
        this.getBooksFromRegister();
    }

    findBooksByTitle(searchPhrase: string) {
        if (searchPhrase) {
            this.resetPageParams();
            this.bookService.findBooksInPrivateRegisterByTitle(this.siteIndex, this.sortOrder, this.sortField, searchPhrase).subscribe(data => {
                  this.booksInRegister = data.content;
                  this.bookEntityPage = data;
            });
        } else {
            this.getBooksFromRegister();
        }
    }

    chooseSortOrder(searchPhrase: string) {
        if (searchPhrase === this.RATE_ASC) {
            this.sortOrder = "ASC";
            this.sortField = "OWN_RATING"
        } else if (searchPhrase === this.RATE_DESC) {
            this.sortOrder = "ASC";
            this.sortField = "OWN_RATING"
        } else if (searchPhrase === this.DATE_ASC) {
            this.sortOrder = "ASC";
            this.sortField = "DATE_OF_READING"
        } else if (searchPhrase === this.DATE_DESC) {
            this.sortOrder = "DESC";
            this.sortField = "DATE_OF_READING"
        }
        this.getBooksFromRegister();
    }

    toArray(i: number) {
        return new Array(i);
    }

    private getBooksFromRegister() {
        this.bookService.findBooksInPrivateRegister(this.siteIndex, this.sortOrder, this.sortField).subscribe(data => {
              this.booksInRegister = data.content;
              this.bookEntityPage = data;
        });
    }

    private resetPageParams() {
        this.siteIndex = "0";
        this.sortOrder = "DESC";
        this.sortField = "DATE_OF_READING";
    }
}
