import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookEntity } from '../../shared/classes/book-entity'
import { BookService } from '../../shared/services/book.service'
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {
  bookToEdit: BookEntity;
  showDetailsModal = false;
  btnColour = 'red';
  successMessage;
  errorMessage;

  constructor(private bookService: BookService, private router: Router) {
  }

  ngOnInit() {
    if (this.bookService.getBookToEdit() != null) {
      this.bookToEdit = this.bookService.getBookToEdit();
      this.bookService.setBookToEdit(null);
      this.bookService.hasBookFile(this.bookToEdit.id).subscribe(data => {
                                                                              if (data) {
                                                                                this.btnColour = 'green';
                                                                              } else {
                                                                                this.btnColour = 'red';
                                                                              }
                                                                          }, error => {
                                                                            console.log(error);
                                                                          });


    } else {
      this.router.navigate(['icons']);
    }
  }

    selectFile(files: FileList, bookId:number) {
        this.bookService.uploadFileToBook(files.item(0), bookId).subscribe(data => {
                this.btnColour= 'green';
              }, error => {
                console.log(error);
              });
    }

    deleteBook(bookToDelete:BookEntity) {
        this.bookService.deleteBookFromRegister(bookToDelete.id).subscribe();
        this.router.navigate(['icons']);
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

    updateBook(bookToUpdate:BookEntity) {
        this.bookService.updateBookInRegister(bookToUpdate).subscribe(data => {
                });
        this.router.navigate(['icons']);
    }
}
