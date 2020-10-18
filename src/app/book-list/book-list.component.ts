import { Component, OnInit } from '@angular/core';
import { BookEntity } from '../shared/classes/book-entity'
import { BookService } from '../shared/services/book.service'
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  public booksInRegister: BookEntity[];
  public filteredBooks: BookEntity[];
  readonly totalstar = 10;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.findBooksInPrivateRegister().subscribe(data => {
        this.booksInRegister = data;
        this.filteredBooks = data;
    });
  }

  filterByPhrase(filterPhrase: string) {
    this.filteredBooks = this.booksInRegister.filter(
        booksInRegister => booksInRegister.title.toUpperCase().includes(filterPhrase != null ? filterPhrase.toUpperCase() : "")
    );
  }
}
