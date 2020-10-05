import { Component, OnInit, Inject} from '@angular/core';
import { BookEntity } from '../../shared/classes/book-entity'
import { BookService } from '../../shared/services/book.service'
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-googleBook',
  templateUrl: './googleBook.component.html'
})
export class GoogleBookComponent implements OnInit {

  constructor(private bookService: BookService,
    public dialogRef: MatDialogRef<GoogleBookComponent>,
    @Inject(MAT_DIALOG_DATA) public googleBookToDisplay: BookEntity) {
  }

  ngOnInit() {
  }

  updateBook(bookToUpdate:BookEntity) {
    this.bookService.addBookToRegister(bookToUpdate).subscribe(data => {
            });
    this.dialogRef.close();
  }

  close(){
      this.dialogRef.close();
    }
}
