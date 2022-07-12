import { Component, OnInit } from '@angular/core';
import { BookserviceService } from 'src/app/bookservice.service';

@Component({
  selector: 'app-book-image',
  templateUrl: './book-image.component.html',
  styleUrls: ['./book-image.component.scss'],
})
export class BookImageComponent implements OnInit {
  individualbook = {
    image: '',
  };

  constructor(private bookService: BookserviceService) {}

  ngOnInit() {
    this.bookService.getData().subscribe((data) => {
      this.individualbook.image = data.image;
    });
  }
}
