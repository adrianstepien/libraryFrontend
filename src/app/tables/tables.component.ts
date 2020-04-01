import { Component, OnInit } from '@angular/core';
import { BookEntity } from '../shared/classes/book-entity'
import { BookService } from '../shared/services/book.service'

declare interface BookHeader {
    header: string[];
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
    public bookHeader: BookHeader;
    public books: BookEntity[];
    googleBookToDisplay: BookEntity;
    showDetailsModal = false;

  constructor(private bookService: BookService) { }

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
       this.bookService.addBookToRegister(selectedBook).subscribe(data => {
        });
    }

    redirectToGoogleBook(googleBookDetails:BookEntity) {
        this.googleBookToDisplay = googleBookDetails;
        this.showDetailsModal = true;
        this.bookService.setGoogleBookToDisplay(googleBookDetails);
    }
}
