import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookEntity } from '../../shared/classes/book-entity'
import { BookService } from '../../shared/services/book.service'
import { Location } from '@angular/common';

@Component({
  selector: 'app-googleBook',
  templateUrl: './googleBook.component.html'
})
export class GoogleBookComponent implements OnInit {
  googleBookToDisplay: BookEntity;
  showDetailsModal = false;

  constructor(private bookService: BookService, private router: Router, private location: Location) {
  }

  ngOnInit() {
    if (this.bookService.getGoogleBookToDisplay() != null) {
      this.googleBookToDisplay = this.bookService.getGoogleBookToDisplay();
      this.bookService.setGoogleBookToDisplay(null);
    } else {
      this.router.navigate(['icons']);
    }
  }

  returnToPreviousTab() {
    this.location.back();
  }

  onDetailsButtonClick(googleBookToDisplay:BookEntity) {
    this.googleBookToDisplay = googleBookToDisplay;
    this.showDetailsModal = true;
    this.bookService.setBookToEdit(googleBookToDisplay);
  }

  updateBook(bookToUpdate:BookEntity) {
    this.bookService.updateBookInRegister(bookToUpdate).subscribe(data => {
            });
    this.router.navigate(['table']);
  }
}
