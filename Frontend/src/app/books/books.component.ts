import { Component, OnInit } from '@angular/core';

import { BookserviceService } from '../bookservice.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  booklist: Book[] = [];

  constructor(private bookService: BookserviceService) {}

  ngOnInit(): void {
    this.bookService.getBooklist().subscribe((book) => {
      this.booklist = book;
      console.log(this.booklist[0].title);
    });
  }
}
