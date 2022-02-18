import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookEntity } from '../../shared/classes/book-entity'
import { BookService } from '../../shared/services/book.service'
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  bookToEdit: BookEntity;
  btnColour = 'red';
  successMessage;
  errorMessage;

  constructor(private bookService: BookService, private router: Router, private route: ActivatedRoute) { }

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
                this.btnColour= 'green';
              }, error => {
                console.log(error);
              });
    }

    deleteBook(bookToDelete:BookEntity) {
        this.bookService.deleteBookFromRegister(bookToDelete.id).subscribe(data => {
                                                                                       this.router.navigate(['/book-list']);
                                                                                           });


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
            this.router.navigate(['book-list']);
                });
    }
}
