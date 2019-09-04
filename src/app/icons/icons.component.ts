import { Component, OnInit } from '@angular/core';
import { BookEntity } from '../shared/classes/book-entity'
import { BookService } from '../shared/services/book.service'

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  public booksInRegister: BookEntity[];
  bookToEdit: BookEntity;
  showDetailsModal = false;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.findBooksInPrivateRegister().subscribe(data => {
        this.booksInRegister = data;
    });
  }

  onDetailsButtonClick(rowToEdit:BookEntity) {
    this.bookToEdit = rowToEdit;
    this.showDetailsModal = true;
    this.bookService.setBookToEdit(rowToEdit);
  }

}
