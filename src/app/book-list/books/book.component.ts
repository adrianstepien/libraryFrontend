import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookEntity } from '../../shared/classes/book-entity'
import { BookService } from '../../shared/services/book.service'
import { saveAs } from 'file-saver';
import { StarRatingComponent } from 'ng-starrating';
import { AlertService } from '../../alert';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {
  readonly totalstar = 10;
  bookToEdit: BookEntity;
  btnColour = 'red';
  successMessage;
  errorMessage;

  constructor(private bookService: BookService, private router: Router, private route: ActivatedRoute, private alertService: AlertService) { }

  ngOnInit() {
      let id = +this.route.snapshot.paramMap.get('id');
      if (id != null) {
        this.bookService.findBookInPrivateRegisterById(id).subscribe(
         data => {
            this.bookToEdit = data
         });
         this.bookService.hasBookFile(id).subscribe(data => {
                                                                 if (data) {
                                                                   this.btnColour = 'green';
                                                                 } else {
                                                                   this.btnColour = 'red';
                                                                 }
                                                             }, error => {
                                                               console.log(error);
                                                             });
      }
  }

    selectFile(files: FileList, bookId:number) {
        this.bookService.uploadFileToBook(files.item(0), bookId).subscribe(data => {
                this.alertService.success("Plik został dodany.");
                this.btnColour= 'green';
              }, error => {
                this.alertService.error("Podczas dodawania pliku wystąpił błąd.");
                console.log(error);
              });
    }

    deleteBook() {
        this.bookService.deleteBookFromRegister(this.bookToEdit.id).subscribe(
        (data) => this.alertService.success("Książka " + this.bookToEdit.title + " została usunięta."),
        (error) => {
            this.alertService.error("Podczas usuwania książki " + this.bookToEdit.title + " wystąpił błąd.");
            console.log(error);
        });
        this.router.navigate(['book-list']);
    }

    downloadBookFile(bookId:number, title:string) {
        this.bookService.downloadBookFile(bookId).subscribe(resp => {
                                        if (resp.byteLength > 0) {
                                            this.saveFile(resp, "application/x-mobipocket-ebook",title);
                                        } else {
                                            this.errorMessage = "Dla tej pozycji nie ma przypisanego pliku";
                                        }
                                    });
    }

    saveFile(data: any, type: string, fileName: string) {
        var blob = new Blob([data], {type: type.toString()});
        saveAs(blob, fileName + ".mobi");
    }

    updateBook() {
        this.bookService.updateBookInRegister(this.bookToEdit).subscribe(
                             (data) => this.alertService.success("Książka " + this.bookToEdit.title + " została zaktualizowana."),
                             (error) => {
                                 this.alertService.error("Podczas aktualizowania książki " + this.bookToEdit.title + " wystąpił błąd.");
                                 console.log(error);
                             });
        this.router.navigate(['book-list']);
    }

    onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
        this.bookToEdit.ownRating = $event.newValue;
    }
}
