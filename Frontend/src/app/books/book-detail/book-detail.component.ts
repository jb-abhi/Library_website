import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { BookserviceService } from 'src/app/bookservice.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  // @Input('selectedbook')
  // set data(selectedbook: any) { //working
  //   console.log(selectedbook);
  // }
  individualbook = {
    title: '',
    author: '',
    image: '',
    about: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookserviceService
  ) {}

  ngOnInit() {
    this.bookService.getData().subscribe((data) => {
      this.individualbook.title = data.title;
      this.individualbook.author = data.author;
      this.individualbook.image = data.image;
      this.individualbook.about = data.about;
    });
    // this.singlebook = this.bookService.recieveSelectedBook();
    // console.log('This is the single book rendered from detail component');
    // console.log(this.singlebook);
    // this.bookService.recieveSelectedBook().subscribe((data) => {
    //   this.singlebook = data;
    // });
    // this.bookService.sendSelectedBook().subscribe((data) => {
    //   this.singleBook = data;
    // });
  }
  OnUpdateForm() {
    this.router.navigate(['/updatebook'], { relativeTo: this.route });
  }
}
