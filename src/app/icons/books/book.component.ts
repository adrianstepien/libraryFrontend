import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookEntity } from '../../shared/classes/book-entity'
import { BookService } from '../../shared/services/book.service'

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {
  bookToEdit: BookEntity;
  showDetailsModal = false;

  constructor(private bookService: BookService, private router: Router) {
  }

  ngOnInit() {
    if (this.bookService.getBookToEdit() != null) {
      this.bookToEdit = this.bookService.getBookToEdit();
      this.bookService.setBookToEdit(null);
    } else {
      this.router.navigate(['icons']);
    }
  }

  deleteBook(bookToDelete:BookEntity) {
    this.bookService.deleteBookFromRegister(bookToDelete.id).subscribe();
    this.router.navigate(['icons']);
  }

  updateBook(bookToUpdate:BookEntity) {
    this.bookService.updateBookInRegister(bookToUpdate).subscribe(data => {
            });
    this.router.navigate(['icons']);
  }
}
