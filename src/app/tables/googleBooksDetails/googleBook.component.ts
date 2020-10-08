import { Component, OnInit, Inject} from '@angular/core';
import { BookEntity } from '../../shared/classes/book-entity'
import { BookService } from '../../shared/services/book.service'
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { AlertService } from '../../alert';

@Component({
  selector: 'app-googleBook',
  templateUrl: './googleBook.component.html'
})
export class GoogleBookComponent implements OnInit {

  constructor(
    private bookService: BookService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<GoogleBookComponent>,
    @Inject(MAT_DIALOG_DATA) public googleBookToDisplay: BookEntity
    ) {}

  ngOnInit() {
  }

  addBookToRegister(bookToUpdate:BookEntity) {
    this.bookService.addBookToRegister(bookToUpdate).subscribe(data => {
                this.alertService.success("Dodano książkę " + bookToUpdate.title + " do biblioteczki.")
            },
            (error) => {
                this.alertService.error("Podczas dodawania książki " + bookToUpdate.title + " wystąpił błąd.");
                console.log(error);
            });
    this.dialogRef.close();
  }

  close(){
      this.dialogRef.close();
    }
}
