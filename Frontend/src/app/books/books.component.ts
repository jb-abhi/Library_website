import { Component, OnInit } from '@angular/core';
import { BookserviceService } from '../bookservice.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  providers: [BookserviceService],
})
export class BooksComponent implements OnInit {
  booklist: Book[] = [];
  selectedbook: Book;
  selectedIndex: number = null;
  numbercheck: number = null;

  constructor(private bookService: BookserviceService) {}

  containergetBooklist() {
    this.bookService.getBooklist().subscribe((book) => {
      this.booklist = book;
    });
  }
  ngOnInit(): void {
    this.containergetBooklist();
  }

  OnSelected(book: Book, index: number) {
    this.bookService.setData(book);
    this.selectedIndex = index;
    this.numbercheck = this.selectedIndex + 1;
  }
}
