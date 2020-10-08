import { Component, OnInit } from '@angular/core';
import { BookEntity } from '../shared/classes/book-entity'
import { BookService } from '../shared/services/book.service'
import { MatDialog } from '@angular/material/dialog';
import { GoogleBookComponent } from '../tables/googleBooksDetails/googleBook.component';
import { AlertService } from '../alert';

declare interface BookHeader {
    header: string[];
}

@Component({
  selector: 'app-book-browser',
  templateUrl: './book-browser.component.html',
  styleUrls: ['./book-browser.component.css']
})
export class BookBrowserComponent implements OnInit {
    public bookHeader: BookHeader;
    public books: BookEntity[];
    googleBookToDisplay: BookEntity;

  constructor(private bookService: BookService,
              private dialog: MatDialog, private alertService: AlertService) { }

    ngOnInit() {
        this.bookHeader = {
            header: ['', 'Tytuł', 'Autor', 'Data publikacji', 'Liczba stron', 'Szczegóły']
        };
    }

    findBooksByName(searchPhrase: string) {
        this.bookService.findBooksInLibrary(searchPhrase).subscribe(data => {
            this.books = data;
        });
    }

    redirectToImage(imagePath: string) {
        window.location.href = imagePath;
    }

    addBookToRegister(selectedBook: BookEntity) {
       this.bookService.addBookToRegister(selectedBook).subscribe(
       (data) => this.alertService.success("Dodano książkę " + data.title + " do biblioteczki."),
       (error) => {
                    this.alertService.error("Wystąpił błąd podczas dodawania pozycji.");
                    console.log(error);
        });
    }

    openGoogleBookDetailsDialog(googleBookDetails:BookEntity): void {
        this.dialog.open(GoogleBookComponent, {
            data: {
              id: googleBookDetails.id,
              title: googleBookDetails.title,
              authors: googleBookDetails.authors,
              publishedDate: googleBookDetails.publishedDate,
              pageCount: googleBookDetails.pageCount,
              description: googleBookDetails.description,
              imageLink: googleBookDetails.imageLink,
              fileId: googleBookDetails.fileId
            }
        });
    }
}
