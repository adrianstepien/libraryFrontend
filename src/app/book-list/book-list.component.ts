import { Component, OnInit } from '@angular/core';
import { BookEntity } from '../shared/classes/book-entity'
import { SortParam } from '../shared/enums/sort-params'
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
  private sortParam = SortParam;
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

  sortBooks(selectedSortParam : string) {
    if (selectedSortParam === SortParam.TITLE_ASC) {
        this.filteredBooks.sort((a,b) => a.title.localeCompare(b.title));
    } else if (selectedSortParam === SortParam.TITLE_DESC) {
        this.filteredBooks.sort((a,b) => b.title.localeCompare(a.title));
    } else if (selectedSortParam === SortParam.RATING_ASC) {
        this.filteredBooks.sort((a,b) => a.ownRating - b.ownRating );
    } else if (selectedSortParam === SortParam.RATING_DESC) {
        this.filteredBooks.sort((a,b) => b.ownRating - a.ownRating );
    }
  }
}
